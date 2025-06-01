
//types
import type { FormEdge, FormNode } from "../types/blueprintGraph";

export function getDependentForms(
    current: FormNode,
    allNodes: FormNode[],
    allEdges: FormEdge[]
  ): FormNode[] {
    const dependent = new Set<string>();
    const visited = new Set<string>();
  
    function dfs(nodeId: string) {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
  
      allEdges.forEach(edge => {
        if (edge.target === nodeId) {
          dependent.add(edge.source);
          dfs(edge.source);
        }
      });
    }
  
    dfs(current.id);
  
    return allNodes.filter(node => dependent.has(node.id));
  }