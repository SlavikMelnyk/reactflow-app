import { blockPortDefaults, getInitialBlocks, idPrefixes } from '@/utils/consts';
import { createContext, useCallback, useMemo, useState } from 'react';
import nextId from 'react-id-generator';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [canvasBgColor, setCanvasBgColor] = useState(null);
    const [nodesBgColor, setNodesBgColor] = useState(null);
    const [pastedOutputNodes, setPastedOutputNodes] = useState([]);
    const [allBlocks, setAllBlocks] = useState(getInitialBlocks());
  
    const getBlockByBlockId = useCallback(blockId => allBlocks.find(b => b.blockId === blockId), [allBlocks]);

    const updateBlock = useCallback(updatedBlock => {
      if(!updateBlock.blockId) {
        setAllBlocks(prev => [...prev, {...updatedBlock, ...blockPortDefaults, blockId: nextId(idPrefixes.node)}]);
      }
      setAllBlocks(prev => prev.map(block => block.blockId === updatedBlock.blockId ? {...updatedBlock} : block));
    }, []);

    const removeBlockByBlockId = useCallback((blockId) => {
      setAllBlocks(prev => prev.filter(b => b.blockId !== blockId));
    }, []);

    const contextValue = useMemo(() => ({
        allBlocks,
        setAllBlocks,
        updateBlock,
        removeBlockByBlockId,
        getBlockByBlockId,
        isDarkTheme,
        setIsDarkTheme,
        canvasBgColor,
        setCanvasBgColor,
        nodesBgColor,
        setNodesBgColor,
        pastedOutputNodes,
        setPastedOutputNodes,
    }), [
      allBlocks,
      setAllBlocks,
      updateBlock,
      removeBlockByBlockId,
      getBlockByBlockId,
      isDarkTheme,
      setIsDarkTheme,
      canvasBgColor,
      setCanvasBgColor,
      nodesBgColor,
      setNodesBgColor,
      pastedOutputNodes,
      setPastedOutputNodes,
    ]);
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };