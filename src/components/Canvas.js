import { useState, useRef, useCallback, useContext, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesBar from '@/components/nodes-bar/NodesBar';
import { AppContext } from '@/contexts/AppContext';
import { customNodeTypes, INITIAL_CANVAS_BG_COLOR, getTypeColor } from '@/utils/consts';
import { usePrevious } from '@/utils/hooks/usePrevious';
import nextId from 'react-id-generator';
import Output from './output-bar/Output';

const Canvas = () => {
  const { allBlocks, getBlockByBlockId, canvasBgColor, nodesBgColor } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const prevNodes = usePrevious(nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [outputVisible, setOutputVisible] = useState(false);

  useEffect(() => {
    setNodes(prev => prev.map(node => {
      const block = allBlocks.find(newBlock => node.blockId === newBlock.blockId);
      const newPorts = (block.data.ports || []).map(port => {
        const oldPort = (node.data.ports || []).find(p => p.portId === port.portId);
        return oldPort || { ...port, id: nextId(port.portId)};
      });
      return {
        ...node,
        ...block,
        data: {
          ...node.data,
          ...block.data,
          ports: newPorts,
        },
          style: {background: nodesBgColor || getTypeColor(node.type)}
        }
    }));
  }, [allBlocks, nodesBgColor, setNodes]);

  useEffect(() => {
    if(!prevNodes || nodes.length >= prevNodes.length) return;
    const removedNode = prevNodes.find(n => !nodes.find(el => el.blockId === n.blockId));
    if(!removedNode) return;
    if(removedNode.type === 'colorPicker') {
      removedNode?.onChange();
    }
  }, [nodes, prevNodes]);

  const onConnect = useCallback((params) => {
    const { targetHandle, sourceHandle } = params;
    setEdges(eds => eds.find(edge => edge.sourceHandle === sourceHandle || edge.targetHandle === targetHandle) ? eds : addEdge({...params, type: 'smoothstep'}, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback( event => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const node = getBlockByBlockId(event.dataTransfer.getData('reactflow/blockId'));

    if (typeof node === 'undefined' || !node) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 75,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      ...node,
      data: {
        ...node.data,
        ports: (node.data.ports || []).map(p => ({ ...p, id: nextId(p.portId)})),
      },
      id: nextId(node.blockId),
      position,
      style: {
        background: nodesBgColor || getTypeColor(node.type),
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [getBlockByBlockId, reactFlowInstance, setNodes, nodesBgColor]);

  return (
    <div className='dndflow overflow-hidden'>
      <ReactFlowProvider>
        <NodesBar />
        <button
          onClick={() => outputVisible ? null : setOutputVisible(true)}
          className={`absolute transition-all duration-300 ease-in-out ${outputVisible ? 'right-80' : 'right-8'} top-4 bg-black font-bold border border-white z-10 py-2 px-8 text-white rounded-lg`}>Deploy</button>
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
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background variant='dots' />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;