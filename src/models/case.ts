import { IHighlight } from "react-pdf-highlighter";

export type BaseModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ApplicationStatus {
  Open = "OPEN",
  Approved = "APPROVED",
  Rejected = "REJECTED",
  NeedMoreInfo = "NEED_MORE_INFO",
}

export type Application = BaseModel & {
  description: string;
  value: number;
  numOfReviews: number;
  status: ApplicationStatus;
  client: string;
  results: AnalysisResults
}

export type AnalysisResults = {
  fields: FieldAnalysisResult[]
}

export type FieldAnalysisResult = {
  name: string;
  value: string;
  // confidence: number;
  status: ApplicationFieldStatus;
  documents: FieldDocumentResult[]
}

export enum DocumentType {
  LO = "Letter of Offer",
  SPA = "Sale and Purchase Agreement",
  IC = "Identity Card (IC)",
  DOA = "Deed of Assignment",
}

export type DocumentHighlight = IHighlight;

export const CONFIDENCE_THRESHOLD = 0.7;

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
  isRef?: boolean;
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

export enum ApplicationFieldStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}