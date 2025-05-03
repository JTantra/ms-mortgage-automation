
export type BaseModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum CaseStatus {
  Open = "OPEN",
  Approved = "APPROVED",
  Rejected = "REJECTED",
  NeedMoreInfo = "NEED_MORE_INFO",
}

export type Case = BaseModel & {
  status: CaseStatus;
  client: string;
  results?: AnalysisResults
}

export type AnalysisResults = {
  fields: FieldAnalysisResult[]
}

export type FieldAnalysisResult = {
  name: string;
  value: string;
  confidence: number;
  status: CaseFieldStatus;
  documents: FieldDocumentResult[]
}

export enum DocumentType {
  LO = "Letter of Offer",
  SPA = "Sale and Purchase Agreement",
  IC = "Identity Card",
}

export type FieldDocumentResult = {
  name: string;
  type: DocumentType;
  value: string;
  confidence: number;
  url: string;
  createdAt: Date;
}

export enum CaseFieldStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}