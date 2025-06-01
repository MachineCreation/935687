
import type { FormNode } from "../types/blueprintGraph";

type FormListProps = {
  nodes: FormNode[];
  onSelect: (node: FormNode) => void;
};

const FormList = ({nodes, onSelect}: FormListProps) => {
  return (
    <div>
      <h2>Forms</h2>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            <button onClick={() => onSelect(node)}>{node.data.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
