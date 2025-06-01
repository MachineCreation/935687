import './App.css'

//types
import type { Blueprint, FormNode } from './assets/types/blueprintGraph'

// functions
import { makeAPIAddress, getBlueprintGraph } from './assets/api/avantosClient'
import { useEffect, useState } from 'react'

// components
import FormList from './assets/components/FormList'

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

  return (
    <>
      {graph ?
        <FormList
          nodes={graph.nodes}
          onSelect={}
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
          </p>}
    </>
  ) 
}

export default App
