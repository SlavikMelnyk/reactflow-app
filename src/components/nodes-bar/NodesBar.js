import { AppContext } from '@/contexts/AppContext';
import { getTypeColor, shareOnDnd } from '@/utils/consts';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditBlockModal from '../modals/EditBlock';
import SearchBar from '../common/SearchBar';

const NodesBar = () => {
  const { allBlocks, updateBlock, isDarkTheme } = useContext(AppContext);
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

  return (
    <aside className={`w-64 border-r transition-all duration-300 ease-in-out h-full overflow-scroll ${isDarkTheme ? '!bg-black' : '!bg-white'}`}>
      <SearchBar onSearch={setSearchValue} />
      {Object.keys(structuredBlocks).map(type => (
        <div className='my-5' key={type}>
          <p className={`text-gray-700 text-lg`}>{`Type: ${type}`}</p>
          {structuredBlocks[type].map(b => (
            <div key={b.blockId} className={`flex cursor-grab bg-[${getTypeColor(b.type)}] active:cursor-grabbing w-95 h-10 text-gray-700 text-base p-1.5 border-2 border-neutral-500 my-2 rounded-md`} onDragStart={(event) => onDragStart(event, b)} draggable>
              <p className='flex-1'>{b.data.label}</p>
              <FaEdit onClick={() => setEditableBlock(b)} className='cursor-pointer h-5 w-5 text-gray-500' />
            </div>
          ))}
        </div>
      ))}
      {editableBlock ? (
        <EditBlockModal
          element={editableBlock}
          onSave={handleSave}
          onCancel={() => setEditableBlock(null)}
        />
      ) : false}
    </aside>
  );
};

export default NodesBar;
