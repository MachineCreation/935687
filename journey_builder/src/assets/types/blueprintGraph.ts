export interface Blueprint {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: FormNode[];
  edges: FormEdge[];
  forms: FormDefinition[];
  branches: any[]; // Unused
  triggers: any[]; // Unused
}

// Form Node

export interface FormNode {
  id: string;
  type: 'form';
  position: {
    x: number;
    y: number;
  };
  data: {
    id: string;
    component_key: string;
    component_type: 'form';
    component_id: string;
    name: string;
    prerequisites: string[];
    permitted_roles: string[];
    input_mapping: Record<string, InputMapping>;
    sla_duration: {
      number: number;
      unit: 'minutes' | 'hours' | 'days';
    };
    approval_required: boolean;
    approval_roles: string[];
  };
}

export interface InputMapping {
  component_key: string;
  output_key: string;
  is_metadata: boolean;
  type: string;
}

// DAG Edges

export interface FormEdge {
  source: string;
  target: string;
}

// Form Definition

export interface FormDefinition {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: FieldSchema;
  ui_schema: UiSchema;
  dynamic_field_config: Record<string, DynamicFieldConfig>;
}

export interface FieldSchema {
  type: 'object';
  properties: Record<string, FieldSchemaProperty>;
  required: string[];
}

export interface FieldSchemaProperty {
  type: string;
  avantos_type: string;
  title?: string;
  format?: string;
  items?: {
    enum: string[];
    type: string;
  };
  enum?: { title: string }[] | string[] | null;
  uniqueItems?: boolean;
}

// UI Schema

export interface UiSchema {
  type: string;
  elements: UiSchemaElement[];
}

export interface UiSchemaElement {
  type: string;
  scope: string;
  label: string;
  options?: {
    format?: string;
  };
}

// Dynamic Field Config

export interface DynamicFieldConfig {
  selector_field: string;
  endpoint_id: string;
  payload_fields: Record<string, DynamicPayloadField>;
}

export interface DynamicPayloadField {
  type: 'form_field';
  value: string;
}
