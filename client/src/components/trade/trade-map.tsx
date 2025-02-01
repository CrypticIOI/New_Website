import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";

interface Node {
  id: string;
  name: string;
  type: "station" | "sector";
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

const sampleData = {
  nodes: [
    { id: "sector1", name: "Grand Exchange", type: "sector" },
    { id: "sector2", name: "Argon Prime", type: "sector" },
    { id: "station1", name: "Trading Station", type: "station" },
    { id: "station2", name: "Production Hub", type: "station" },
  ],
  links: [
    { source: "sector1", target: "station1", value: 100 },
    { source: "station1", target: "sector2", value: 50 },
    { source: "sector2", target: "station2", value: 75 },
  ],
};

export function TradeMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    // Clear existing SVG
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", "translate(0,0)");

    // Create force simulation
    const simulation = d3.forceSimulation<Node>(sampleData.nodes)
      .force("link", d3.forceLink<Node, Link>(sampleData.links)
        .id(d => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg.append("g")
      .selectAll("line")
      .data(sampleData.links)
      .enter()
      .append("line")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value) / 2);

    // Draw nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(sampleData.nodes)
      .enter()
      .append("circle")
      .attr("r", d => d.type === "sector" ? 8 : 5)
      .attr("fill", d => d.type === "sector" ? "hsl(var(--primary))" : "hsl(var(--secondary))")
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add labels
    const label = svg.append("g")
      .selectAll("text")
      .data(sampleData.nodes)
      .enter()
      .append("text")
      .text(d => d.name)
      .attr("font-size", "10px")
      .attr("dx", 12)
      .attr("dy", 4)
      .attr("fill", "currentColor");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);

      label
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    });

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, []);

  return (
    <Card className="p-6">
      <svg
        ref={svgRef}
        style={{ width: "100%", height: "auto", aspectRatio: "4/3" }}
        className="overflow-visible"
      />
    </Card>
  );
}
