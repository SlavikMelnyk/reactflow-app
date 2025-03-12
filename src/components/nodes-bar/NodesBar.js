import { AppContext } from '@/contexts/AppContext';
import { blockPortDefaults, getTypeColor, idPrefixes, portTypes, shareOnDnd } from '@/utils/consts';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import EditBlockModal from '../modals/EditBlock';
import SearchBar from '../common/SearchBar';
import nextId from 'react-id-generator';

const NodesBar = () => {
  const { allBlocks, setAllBlocks, updateBlock, isDarkTheme, removeBlockByBlockId } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');
  const [filteredBlocks, setFilteredBlocks] = useState(allBlocks);
  const [editableBlock, setEditableBlock] = useState(null);

  const structuredBlocks = useMemo(() => filteredBlocks.reduce((acc, block) => ({ ...acc, [block.type]: [ ...acc[block.type] || [], block ] }), {}), [filteredBlocks]);

  useEffect(() => {
    setFilteredBlocks(allBlocks.filter(block => block.data.label.toLowerCase().includes(searchValue.toLowerCase())));
  }, [allBlocks, searchValue]);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData(shareOnDnd.nodeId, node.blockId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSave = (el) => {
    updateBlock(el);
    setEditableBlock(null);
  }

  const handleRemove = (blockId) => {
    removeBlockByBlockId(blockId);
    setEditableBlock(null);
  }

  return (
    <aside className={`w-64 border-r transition-all duration-300 ease-in-out h-full overflow-scroll ${isDarkTheme ? '!bg-black' : '!bg-white'}`}>
      <SearchBar onSearch={setSearchValue} />
      {Object.keys(structuredBlocks).map(type => (
        <div className='my-5' key={type}>
          <div className='flex justify-between items-center w-full'>
            <span className={`text-gray-700 text-lg`}>{`Type: ${type}`}</span>
            {type=== 'custom' && (
              <FaPlus 
                className='cursor-pointer h-5 w-5 text-gray-500 mr-2' 
                onClick={()=>setAllBlocks(prev => [...prev,
                  { blockId: nextId(idPrefixes.node), ...blockPortDefaults, type: 'custom', data: { label: 'New Node', ports: [] } },  
                ])}  
              />
            )}
          </div>
          {structuredBlocks[type].map(b => (
            <div 
              key={b.blockId} 
              className={`flex cursor-grab
                          active:cursor-grabbing w-95 h-10 text-gray-700 text-base p-1.5 border-2 
                          border-neutral-500 my-2 rounded-md`} 
              style={{background:b.data.color ? b.data.color : getTypeColor(b.type)}}
              onDragStart={(event) => onDragStart(event, b)} 
              draggable>
              <p className='flex-1'>{b.data.label}</p>
              <FaEdit onClick={() => setEditableBlock(b)} className='cursor-pointer h-5 w-5 text-gray-500' />
            </div>
          ))}
        </div>
      ))}
      <button
        className='relative top-2 px-8 py-2 text-base bg-gray-600 text-white font-bold rounded-lg ml-2 mb-2 left-24'
        onClick={() => setEditableBlock({})}
      >
        Add new
      </button>
      {editableBlock ? (
        <EditBlockModal
          element={editableBlock}
          onSave={handleSave}
          onCancel={() => setEditableBlock(null)}
          onRemove={handleRemove}
        />
      ) : false}
    </aside>
  );
};

export default NodesBar;