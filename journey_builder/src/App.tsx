import './App.css'

//types
import type { Blueprint, FormNode } from './assets/types/blueprintGraph'

// functions
import { makeAPIAddress, getBlueprintGraph } from './assets/api/avantosClient'
import { useEffect, useState } from 'react'

// components
import FormList from './assets/components/FormList'
import DynamicForm from './assets/components/dynForm'

function App() {
  const [graph, setGraph] = useState<null | Blueprint>(null)
  const [tries, setTries] = useState<number>(0)
  const [graphForm, setGraphForm] = useState<null| FormNode>(null)

  useEffect(() => {
    if (tries >= 5 || graph !== null) return;

    const getGraph = async () => {
      try {
        const response = await getBlueprintGraph(
          makeAPIAddress('1', 'bp_01jk766tckfwx84xjcxazggzyc')
        );
        if (typeof response === 'number') {
          
          throw new Error('Blueprint fetch failed');
        } else {
          setGraph(response);
        }
      } catch (err:any) {
        alert(`API responded with ${err}\n${4-tries} attempts remain`)
        setTimeout(() => {
          setTries((prev) => prev + 1);
        }, 750);
      }
    };

    getGraph();
  }, [graph, tries]);

  const handleUpdateMapping = (
    fieldKey: string,
    mapping: { component_key: string; output_key: string } | undefined
  ) => {
    if (!graphForm) return;

    // Deep clone the graphForm to avoid mutating state directly
    const updatedForm = {
      ...graphForm,
      data: {
        ...graphForm.data,
        input_mapping: {
          ...graphForm.data.input_mapping,
          ...(mapping
            ? { [fieldKey]: { ...mapping, is_metadata: false, type: 'string' } }
            : {}) // remove if undefined
        }
      }
    };

    // Remove field if mapping is undefined (i.e., deleted)
    if (!mapping) {
      delete updatedForm.data.input_mapping[fieldKey];
    }

    setGraphForm(updatedForm);
  };

  return (
    <>
      {
        graph ?
          <FormList
            nodes={graph.nodes}
            onSelect={setGraphForm}
          />
          :
          (tries >= 5) ?
            <p>
              All attempts to reach the API have failed.
              <br></br>
              Please check your connection.
            </p>
            :
            <p>
              Loading graph...
            </p>
      }
      {
        graphForm ?
        <DynamicForm 
            node={graphForm}
            form={graph!.forms.find(f => f.id === graphForm.data.component_id)!} 
            allNodes={graph!.nodes} 
            allForms={graph!.forms} 
            allEdges={graph!.edges} 
            onUpdateMapping={handleUpdateMapping}        
            />
        :
        <p>No Form Selected</p>
      }
    </>
  ) 
}

export default App
