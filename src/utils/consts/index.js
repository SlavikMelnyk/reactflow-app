import Checkbox from '@/components/custom-nodes/Checkbox';
import ColorPicker from '@/components/custom-nodes/ColorPicker';
import CustomNode from '@/components/custom-nodes/CustomNode';

export const INITIAL_CANVAS_BG_COLOR = '#000000';
export const INITIAL_NODE_BG_COLOR = '#eeeeee';

export const customNodeTypes = {
    colorPicker: ColorPicker,
    custom: CustomNode,
    checkbox: Checkbox,
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
    colorPicker: '#888888',
}

export const getTypeColor = type => {
    return typesColors[type] || INITIAL_NODE_BG_COLOR;
};

const defaultTypes = ['input', 'output', 'default', 'group'];

export const isCustomNodeType = type => !defaultTypes.includes(type);
