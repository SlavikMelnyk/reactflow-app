import CustomNode from '@/components/custom-nodes/types/CustomNode';
import ThemeNode from '@/components/custom-nodes/nodes/ThemeNode';
import BgColorNode from '@/components/custom-nodes/nodes/BgColorNode';
import NodesColorNode from '@/components/custom-nodes/nodes/NodesColorNode';
import nextId from 'react-id-generator';
import CustomEdge from '@/components/custom-nodes/types/CustomEdge';
export const INITIAL_CANVAS_BG_COLOR = '#000000';
export const INITIAL_NODE_BG_COLOR = '#eeeeee';

export const customNodeTypes = {
    custom: CustomNode,
    canvasColor: BgColorNode,
    nodesColor: NodesColorNode,
    themeColor: ThemeNode,
}

export const customEdgeTypes = {
    customEdge: CustomEdge,
}

export const portTypes = {
    target: 'target',
    source: 'source',
}

export const typesColors = {
    input: '#ff8888',
    default: '#88ff88',
    output: '#8888ff',
    custom: '#ffffff',
    canvasColor: '#cccccc',
    themeColor: '#999999',
    nodesColor: '#666666',
}

export const getTypeColor = type => {
    return typesColors[type] || INITIAL_NODE_BG_COLOR;
};

export const idPrefixes = {
    node: 'node-',
    port: 'port-',
};

export const allAvailableNodeTypes = ['custom', 'canvasColor', 'themeColor', 'nodesColor', 'input', 'output', 'default'];

const defaultNodeTypes = ['input', 'output', 'default', 'group'];
export const isCustomNodeType = type => !defaultNodeTypes.includes(type);

export const shareOnDnd = {
    nodeId: 'reactflow/blockId',
};

export const blockPortDefaults = { sourcePosition: 'right', targetPosition: 'left' };
export const getInitialBlocks = () => [
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'custom', data: { label: 'Custom Node', ports: [{portId: nextId(idPrefixes.port), type: portTypes.target, label: 'some nice port'}, {portId: nextId(idPrefixes.port), type: portTypes.source}] } },
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'canvasColor', data: { label: 'Canvas bg color' } },
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'nodesColor', data: { label: 'Nodes bg color' } },
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'themeColor', data: { label: 'Theme color' } },
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'output', data: { label: 'Output Node' } },
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'default', data: { label: 'Default Node' } },
    { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'input', data: { label: 'Input Node' } },
  ];
