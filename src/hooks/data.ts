import { Application, ApplicationFieldStatus, ApplicationStatus } from "@/models/case";
import { DocumentType } from "@/models/case";

const BASE_WIDTH = 432;
const BASE_HEIGHT = 574;

export const CURRENCY = "MYR";
export const LOCALE = "my-MY";

const bbRects = {
  IC_Owner: {
    x1: 230,
    y1: 187,
    x2: 272,
    y2: 197,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  IC_IC: {
    x1: 221,
    y1: 147,
    x2: 255,
    y2: 157,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  LO_Owner: {
    x1: 190,
    y1: 455,
    x2: 235,
    y2: 465,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  LO_IC: {
    x1: 295,
    y1: 455,
    x2: 320,
    y2: 465,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  SPA_Owner: {
    x1: 233,
    y1: 177,
    x2: 287,
    y2: 187,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  SPA_IC: {
    x1: 70,
    y1: 188,
    x2: 100,
    y2: 199,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  DOA_Owner: {
    x1: 250,
    y1: 448,
    x2: 300,
    y2: 458,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  },
  DOA_IC: {
    x1: 260,
    y1: 456,
    x2: 307,
    y2: 466,
    width: BASE_WIDTH,
    height: BASE_HEIGHT
  }
}

export const defaultResults = {
  fields: [
    {
      name: "Registered Owner Name",
      value: "RAH ADIBA BIN",
      // confidence: 0.9,
      status: ApplicationFieldStatus.Pending,
      documents: [
        {
          type: DocumentType.IC,
          isRef: true,
          name: "ic-1.pdf",
          value: "RAH ADIBA BIN",
          confidence: 0.9,
          url: "/ic-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 1,
              boundingRect: bbRects.IC_Owner,
              rects: [bbRects.IC_Owner]
            }
          }
        },
        {
          type: DocumentType.LO,
          name: "letter-offer-1.pdf",
          value: "RAH ADIBA BIN",
          confidence: 0.9,
          url: "/letter-offer-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 2,
              boundingRect: bbRects.LO_Owner,
              rects: [
                bbRects.LO_Owner
              ]
            }
          }
        },
        {
          type: DocumentType.SPA,
          name: "spa-1.pdf",
          value: "RAH ADIBA BIN",
          confidence: 0.7,
          url: "/spa-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 5,
              boundingRect: bbRects.SPA_Owner,
              rects: [
                bbRects.SPA_Owner
              ]
            }
          }
        },
        {
          type: DocumentType.DOA,
          name: "doa-1.pdf",
          value: "RAH ADIBA BIN",
          confidence: 0.9,
          url: "/doa-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 41,
              boundingRect: bbRects.DOA_Owner,
              rects: [
                bbRects.DOA_Owner
              ]
            }
          }
        }
      ]
    },
    {
      name: "Registered Owner IC",
      value: "",
      // confidence: 0.7,
      status: ApplicationFieldStatus.Pending,
      documents: [
        {
          type: DocumentType.IC,
          isRef: true,
          name: "ic-1.pdf",
          value: "1122010",
          confidence: 0.9,
          url: "/ic-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 1,
              boundingRect: bbRects.IC_IC,
              rects: [
                bbRects.IC_IC
              ]
            }
          }
        },
        {
          type: DocumentType.LO,
          name: "letter-offer-1.pdf",
          value: "1122010",
          confidence: 0.7,
          url: "/letter-offer-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 2,
              boundingRect: bbRects.LO_IC,
              rects: [
                bbRects.LO_IC
              ]
            }
          }
        },
        {
          type: DocumentType.SPA,
          name: "spa-1.pdf",
          value: "1122010",
          confidence: 0.9,
          url: "/spa-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 5,
              boundingRect: bbRects.SPA_IC,
              rects: [
                bbRects.SPA_IC
              ]
            }
          }
        },
        {
          type: DocumentType.DOA,
          name: "doa-1.pdf",
          value: "011122-01-0500",
          confidence: 0,
          url: "/doa-1.pdf",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          evidence: {
            id: String(Math.random()).slice(2),
            position: {
              pageNumber: 41,
              boundingRect: bbRects.DOA_IC,
              rects: [
                bbRects.DOA_IC
              ]
            }
          }
        }
      ]
    }
  ]
}


export const applications: Application[] = [
  {
    id: "001",
    createdAt: new Date("2025-05-02T00:00:00Z"),
    updatedAt: new Date(),
    // description: "Lorem ipsum dolor sit amet",
    requestor: "Aaron",
    propertyName: "Sky Residences",
    value: 1500000,
    numOfReviews: 4,
    status: ApplicationStatus.Approved,
    // client: "Aaron",
    results: {
      fields: []
    }
  },
  {
    id: "002",
    createdAt: new Date("2025-05-03T00:00:00Z"),
    updatedAt: new Date(),
    // description: "Lorem ipsum dolor sit amet",
    requestor: "Carl",
    propertyName: "Sky Villa",
    value: 2500000,
    numOfReviews: 5,
    status: ApplicationStatus.Rejected,
    // client: "Aaron",
    results: {
      fields: []
    }
  },
  // {
  //   id: "003",
  //   createdAt: new Date("2025-05-01T00:00:00Z"),
  //   updatedAt: new Date(),
  //   // description: "Lorem ipsum dolor sit amet",
  //   requestor: "Jyn",
  //   propertyName: "Sky Vue",
  //   value: 1000000,
  //   numOfReviews: 2,
  //   status: ApplicationStatus.Open,
  //   // client: "Aaron",
  //   results: defaultResults
  // },
]