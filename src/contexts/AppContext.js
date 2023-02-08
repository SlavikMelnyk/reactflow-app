import { INITIAL_CANVAS_BG_COLOR, INITIAL_NODE_BG_COLOR, portTypes } from '@/utils/consts';
import { createContext, useCallback, useMemo, useState } from 'react';
import nextId from 'react-id-generator';

const AppContext = createContext();

const getInitialBlocks = ({setCanvasBgColor, setNodesBgColor, setIsDarkTheme}) => [
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'custom', data: { label: 'Custom Node', ports: [{id: nextId('port-'), type: portTypes.target, label: 'some nice port'}, {id: nextId('port-'), type: portTypes.source}] } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'colorPicker', data: { label: 'Canvas bg color', onChange: setCanvasBgColor, defaultValue: INITIAL_CANVAS_BG_COLOR } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'colorPicker', data: { label: 'Nodes bg color', onChange: setNodesBgColor, defaultValue: INITIAL_NODE_BG_COLOR } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'checkbox', data: { label: 'Theme', onChange: setIsDarkTheme, defaultValue: false } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'output', data: { label: 'Output Node 1' } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'output', data: { label: 'Output Node 2' } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'default', data: { label: 'Default Node 1' } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'default', data: { label: 'Default Node 2' } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'input', data: { label: 'Input Node 1' } },
  { blockId: nextId('node-'), sourcePosition: 'right', targetPosition: 'left', type: 'input', data: { label: 'Input Node 2' } },
];

const AppContextProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [canvasBgColor, setCanvasBgColor] = useState(null);
    const [nodesBgColor, setNodesBgColor] = useState(null);
    const [allBlocks, setAllBlocks] = useState(getInitialBlocks({setCanvasBgColor, setNodesBgColor, setIsDarkTheme}));
  
    const getBlockByBlockId = useCallback(blockId => allBlocks.find(b => b.blockId === blockId), [allBlocks]);

    const updateBlock = useCallback((updatedBlock) => {
      setAllBlocks(prev => prev.map(block => block.blockId === updatedBlock.blockId ? {...updatedBlock} : block));
    }, []);

    const contextValue = useMemo(() => ({
        allBlocks,
        setAllBlocks,
        updateBlock,
        getBlockByBlockId,
        isDarkTheme,
        setIsDarkTheme,
        canvasBgColor,
        nodesBgColor,
    }), [
      allBlocks,
      setAllBlocks,
      updateBlock,
      getBlockByBlockId,
      isDarkTheme,
      setIsDarkTheme,
      canvasBgColor,
      nodesBgColor,
    ]);
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };