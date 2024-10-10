import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
}

interface MindMapProps {
  data: {
    nodes: Node[];
    edges: Edge[];
  };
}

interface CustomizationOptions {
  nodeColor: string;
  nodeSize: number;
  linkColor: string;
  fontFamily: string;
  fontSize: number;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [options, setOptions] = useState<CustomizationOptions>({
    nodeColor: '#3b82f6',
    nodeSize: 20,
    linkColor: '#8b5cf6',
    fontFamily: 'Arial',
    fontSize: 12,
  });

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.edges).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const links = svg.append('g')
      .selectAll('line')
      .data(data.edges)
      .enter().append('line')
      .attr('stroke', options.linkColor)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const nodes = svg.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter().append('g');

    nodes.append('circle')
      .attr('r', options.nodeSize)
      .attr('fill', options.nodeColor);

    nodes.append('text')
      .text((d: Node) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', 'white')
      .style('font-family', options.fontFamily)
      .style('font-size', `${options.fontSize}px`);

    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodes.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

  }, [data, options]);

  return (
    <div>
      <svg ref={svgRef} width="100%" height="400" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-primary">Customize Mind Map</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Node Color</label>
            <input
              type="color"
              value={options.nodeColor}
              onChange={(e) => setOptions({ ...options, nodeColor: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Node Size</label>
            <input
              type="range"
              min="10"
              max="40"
              value={options.nodeSize}
              onChange={(e) => setOptions({ ...options, nodeSize: parseInt(e.target.value) })}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Link Color</label>
            <input
              type="color"
              value={options.linkColor}
              onChange={(e) => setOptions({ ...options, linkColor: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Font Family</label>
            <select
              value={options.fontFamily}
              onChange={(e) => setOptions({ ...options, fontFamily: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Arial</option>
              <option>Helvetica</option>
              <option>Times New Roman</option>
              <option>Courier</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Font Size</label>
            <input
              type="range"
              min="8"
              max="24"
              value={options.fontSize}
              onChange={(e) => setOptions({ ...options, fontSize: parseInt(e.target.value) })}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMap;