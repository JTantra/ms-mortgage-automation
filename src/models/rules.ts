import { DocumentType } from "./case";

export type Field = {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date';
  rule: FieldRuleReference;
}

export type Document = {
  id: string;
  name: string;
  type: DocumentType;
  fields: { id: string }[];
}

export enum RuleType {
  Match = 'MATCH',
}

export type FieldRuleReference = {
  type: RuleType.Match;
  referenceDocId: string;
  docs: { id: string }[]
}

const sampleField: Field = {
  id: 'registeered_owner_name',
  name: 'Registered Owner Name',
  type: 'string',
  rule: {
    type: RuleType.Match,
    referenceDocId: 'nric',
    docs: [
      { id: 'nric' },
      { id: 'letter-of-offer' },
      { id: 'spa' },
      { id: 'doa' }
    ]
  }
}

const sampleDoc: Document = {
  id: 'nric',
  name: 'NRIC',
  type: DocumentType.IC,
  fields: [
    { id: 'registeered_owner_name' },
    { id: 'registered_owner_ic' },
  ]
}