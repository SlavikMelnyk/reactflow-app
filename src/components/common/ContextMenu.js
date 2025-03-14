import React, { useCallback, useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
 
export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const node = getNode(id);
 console.log(node);

  const duplicateNode = useCallback(() => {
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };
 
    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);
 
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom ,
        position: 'absolute',
        zIndex: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
      }}
      className=" border-white border z-10 text-white bg-gray-500 rounded-lg"
      {...props}
    >
        <div 
          style={{
            background: node.style?.background,
            color:'black'
          }}
          className='p-2 cursor-default rounded-t-[7px] w-full flex flex-col items-center'>
          <p>{node.data.label}</p>
          <small>(node-id: {id})</small>
        </div>
        <div className='bg-white h-[1px] w-full'/>
        <div className='my-2 flex flex-col gap-1'>
          <button className='hover:bg-gray-400 w-full' onClick={duplicateNode}>Make a copy</button>
          <button className='hover:bg-gray-400 w-full' onClick={deleteNode}>Delete node</button>
        </div>
    </div>
  );
}