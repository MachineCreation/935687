
//types
import type { FormNode, FormDefinition } from '../types/blueprintGraph';

//helpers
import { getDependentForms } from '../helpers/getDependentForms';

type PrefillModalProps = {
  currentNode: FormNode;
  allNodes: FormNode[];
  allForms: FormDefinition[];
  allEdges: { source: string; target: string }[];
  onSelect: (componentKey: string, fieldKey: string) => void;
  onClose: () => void;
};

const PrefillModal = ({
  currentNode,
  allNodes,
  allForms,
  allEdges,
  onSelect,
  onClose,
}: PrefillModalProps) => {
  const dependentNodes = getDependentForms(currentNode, allNodes, allEdges);

  const getFieldsFromForm = (formId: string) => {
    const form = allForms.find(f => f.id === formId);
    return form?.field_schema.properties || {};
  };

  return (
    <div className="modal">
      <h2>Choose a field to prefill from</h2>
      <button onClick={onClose}>Close</button>

      {dependentNodes.map((node) => {
        const fields = getFieldsFromForm(node.data.component_id);

        return (
          <div key={node.id} style={{ margin: '1rem 0' }}>
            <h4>{node.data.name}</h4>
            <ul>
              {Object.entries(fields).map(([fieldKey, fieldSchema]) => (
                <li key={fieldKey}>
                  <button
                    onClick={() => onSelect(node.data.component_key, fieldKey)}   // once this works, revise logic to get the field value instead of the component_key
                  >
                    {fieldSchema.title || fieldKey}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PrefillModal;
