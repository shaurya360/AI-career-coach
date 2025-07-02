import React from 'react'
import { ReactFlow } from '@xyflow/react';
 import {
  
  MiniMap,
  Controls,
  Background,
  
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';

const nodeTypes={
  turbo:TurboNode
}

const RoadmapCanvas = ({initialEdges,initialNodes}:any) => {
   
// In RoadmapCanvas.jsx



  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} >
        <Controls />
        <MiniMap />
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

export default RoadmapCanvas