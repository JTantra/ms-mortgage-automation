import { Case, CaseFieldStatus, CaseStatus, DocumentType } from "@/models/case";
import { useQuery } from "@tanstack/react-query";

const BASE_WIDTH = 432;
const BASE_HEIGHT = 574;

const bbRects = {
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

const cases: Case[] = [
  {
    id: "1",
    createdAt: new Date("2025-05-01T00:00:00Z"),
    updatedAt: new Date(),
    status: CaseStatus.Open,
    client: "Aaron",
    results: {
      fields: [
        {
          name: "Registered Owner Name",
          value: "RAH ADIBA BIN",
          // confidence: 0.9,
          status: CaseFieldStatus.Pending,
          documents: [
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
          status: CaseFieldStatus.Pending,
          documents: [
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
              confidence: 0.9,
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
  }
]


export function useCasesList() {
  return useQuery({
    queryKey: ["cases"],
    queryFn: async (): Promise<Case[]> => {
      return cases;
    }
  })
}

export function useCase(id: string) {
  return useQuery({
    queryKey: ["case", id],
    queryFn: async (): Promise<Case | undefined> => {
      return cases.find(c => c.id === id);
    }
  })
}