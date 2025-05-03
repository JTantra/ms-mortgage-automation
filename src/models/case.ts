import { Content, ScaledPosition, Comment, IHighlight } from "react-pdf-highlighter";

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
  // confidence: number;
  status: CaseFieldStatus;
  documents: FieldDocumentResult[]
}

export enum DocumentType {
  LO = "Letter of Offer",
  SPA = "Sale and Purchase Agreement",
  IC = "Identity Card",
  DOA = "Deed of Assignment",
}

export type DocumentHighlight = IHighlight;

export type BoundingRect = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number,
  height: number
}

export type FieldDocumentResult = {
  name: string;
  type: DocumentType;
  value: string;
  confidence: number;
  url: string;
  createdAt: Date;
  evidence: {
    id: string;
    position: {
      pageNumber: number,
      boundingRect: BoundingRect,
      rects: BoundingRect[],
    }
  }
}

export enum CaseFieldStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}