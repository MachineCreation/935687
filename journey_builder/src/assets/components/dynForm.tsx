
//react
import { useState } from 'react';

//types
import type { FormNode, FormDefinition, FormEdge, FormNode as NodeType } from '../types/blueprintGraph';

//components
import PrefillModal from './prefillModal';

type DynamicFormProps = {
  node: FormNode;
  form: FormDefinition;
  allNodes: NodeType[];
  allForms: FormDefinition[];
  allEdges: FormEdge[];
  onUpdateMapping: (fieldKey: string, mapping: { component_key: string; output_key: string }) => void;
};

const DynamicForm = ({ node, form, allNodes, allForms, allEdges, onUpdateMapping }: DynamicFormProps) => {
  const [showModalForField, setShowModalForField] = useState<string | null>(null);

  const fields = Object.entries(form.field_schema.properties);

  const mapping = node.data.input_mapping;

  return (
    <div className="form-container">
      <h3>{node.data.name}</h3>
      <ul>
        {fields.map(([fieldKey, schema]) => {
          const isMapped = mapping[fieldKey];
          const mappedFrom = isMapped ? `${mapping[fieldKey].component_key}.${mapping[fieldKey].output_key}` : null;

          return (
            <li key={fieldKey} style={{ marginBottom: '1rem' }}>
              <strong>{schema.title || fieldKey}</strong>:&nbsp;
              {isMapped ? (
                <>
                  {mappedFrom}
                  <button
                    style={{ marginLeft: '1rem' }}
                    onClick={() => onUpdateMapping(fieldKey, undefined as any)}
                  >
                    X
                  </button>
                </>
              ) : (
                <button onClick={() => setShowModalForField(fieldKey)}>Set Mapping</button>
              )}
            </li>
          );
        })}
      </ul>

      {showModalForField && (
        <PrefillModal
          currentNode={node}
          allNodes={allNodes}
          allForms={allForms}
          allEdges={allEdges}
          onSelect={(component_key, output_key) => {
            onUpdateMapping(showModalForField, { component_key, output_key });
            setShowModalForField(null);
          }}
          onClose={() => setShowModalForField(null)}
        />
      )}
    </div>
  );
};

export default DynamicForm;
