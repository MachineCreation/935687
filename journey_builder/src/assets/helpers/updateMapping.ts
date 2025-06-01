

//****************************************************************************
// CONTINUE TO MODIFY FOR MODULARITY
//****************************************************************************



//types
import type { FormNode } from "../types/blueprintGraph";

type handleUpdateMappingProps = {
    fieldKey: string
    mapping: { component_key: string; output_key: string } | undefined
    graphForm: FormNode
}

export const handleUpdateMapping = (
    {
        fieldKey,
        mapping,
        graphForm
    }: handleUpdateMappingProps
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

    setGraphForm(updatedForm); // handle reset of graph form
  };