import { useState, useRef, useCallback, useContext, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesBar from '@/components/nodes-bar/NodesBar';
import { AppContext } from '@/contexts/AppContext';
import { customNodeTypes, INITIAL_CANVAS_BG_COLOR, getTypeColor, shareOnDnd, customEdgeTypes } from '@/utils/consts';
import { usePrevious } from '@/utils/hooks/usePrevious';
import nextId from 'react-id-generator';
import Output from './output-bar/Output';
import CreateEdgeModal from './modals/CreateEdge';
import ContextMenu from './common/ContextMenu';

const Canvas = () => {
  const { allBlocks, getBlockByBlockId, canvasBgColor, nodesBgColor, pastedOutputNodes, setPastedOutputNodes } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const prevNodes = usePrevious(nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [outputVisible, setOutputVisible] = useState(false);
  const [edgeModal, setEdgeModal] = useState();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    setNodes(prev => prev.map(node => {
      const block = allBlocks.find(newBlock => node.blockId === newBlock.blockId);
      if(!block) return undefined;
    
      const newPorts = (block.data.ports || []).map(port => {
        const oldPort = (node.data.ports || []).find(p => p.portId === port.portId);
        return oldPort ? {id: oldPort.id, ...port} : { ...port, id: nextId(port.portId)};
      });

      return {
        ...node,
        ...block,
        data: {
          ...node.data,
          ...block.data,
          ports: newPorts,
        },
          style: {background: node.data.color || nodesBgColor || getTypeColor(node.type)}
      };
    }).filter(node => node));
  }, [allBlocks, nodesBgColor, setNodes]);

  useEffect(() => {
    if(!pastedOutputNodes) return;
    const newEdges = [];
    pastedOutputNodes.forEach(node => (node.edges || []).forEach(edge => newEdges.find(edg => edg.id === edge.id) ? null : newEdges.push(edge)));
    setNodes(pastedOutputNodes.map(node => ({ ...node, edges: [], style: {background: node.data.color || nodesBgColor || getTypeColor(node.type) }})));
    setEdges(newEdges);
    setPastedOutputNodes('');
  }, [pastedOutputNodes, setNodes, setEdges, nodesBgColor, setPastedOutputNodes]);

  useEffect(() => {
    if(!prevNodes || !prevNodes.length || nodes.length >= prevNodes.length) return;
    const removedNode = prevNodes.find(n => !nodes.find(el => el.blockId === n.blockId));
    if(!removedNode) return;
    if(removedNode.type === 'colorPicker') {
      removedNode.data?.onChange();
    }
  }, [nodes, prevNodes]);

  const onConnect = useCallback((params) => {
    setEdgeModal(params)
  }, []);

  const handleSave = (params, label, type, animated) => {
    const { targetHandle, sourceHandle, source, target } = params;
    setEdges(eds =>
      eds.find(edge =>
        (edge.sourceHandle === sourceHandle && edge.source === source) || (targetHandle && edge.targetHandle === targetHandle && edge.target === target))
        ? eds : addEdge({...params, label:label, animated: animated, type: type}, eds)
    );
    setEdgeModal(null)
};

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback( event => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const node = getBlockByBlockId(event.dataTransfer.getData(shareOnDnd.nodeId));

    if (typeof node === 'undefined' || !node) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 75,
      y: event.clientY - reactFlowBounds.top - 20,
    });

    const newNode = {
      ...node,
      data: {
        ...node.data,
        ports: (node.data.ports || []).map(p => ({ ...p, id: nextId(p.portId)})),
      },
      id: nextId(node.blockId+Math.floor(Math.random()*10)),
      position,
      style: {
        background: node.data.color || nodesBgColor || getTypeColor(node.type),
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [getBlockByBlockId, reactFlowInstance, setNodes, nodesBgColor]);

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      if (node.type?.toLowerCase().includes('color')) {
        setMenu(null);
        return;
      }
      setMenu({
        id: node.id,
        top: event.clientY,
        left: event.clientX-250,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() =>{
    setMenu(null)
  }, [setMenu]);

  return (
    <div className='dndflow overflow-hidden'>
      <ReactFlowProvider>
        <NodesBar />
        <button
          onClick={() => outputVisible ? null : setOutputVisible(true)}
          className={`absolute transition-all duration-300 ease-in-out ${outputVisible ? 'right-80' : 'right-8'} top-4 bg-black font-bold border border-white z-10 py-2 px-8 text-white rounded-lg`}
        >
          Deploy
        </button>
        <button
          onClick={() => setNodes([])}
          className={`absolute transition-all duration-300 ease-in-out left-72 top-4 font-bold border border-white z-10 py-2 px-8 text-white bg-gray-500 rounded-lg`}
        >
          Clear
        </button>
        <Output nodes={nodes} edges={edges} visible={outputVisible} hide={() => setOutputVisible(false)} />
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            style={{ backgroundColor: canvasBgColor || INITIAL_CANVAS_BG_COLOR }}
            nodeTypes={customNodeTypes}
            edgeTypes={customEdgeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onNodeContextMenu={onNodeContextMenu}
            onPaneClick={onPaneClick}
          >
            <Controls />
            <Background variant='dots' />
            <MiniMap />
            {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
          </ReactFlow>
        </div>
        <CreateEdgeModal params={edgeModal} setEdgeModal={setEdgeModal} onSave={handleSave}/> 
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;