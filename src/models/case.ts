
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
}

// export type CaseDetail = {

// }