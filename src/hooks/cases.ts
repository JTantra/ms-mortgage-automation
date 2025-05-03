import { Case, CaseFieldStatus, CaseStatus, DocumentType } from "@/models/case";
import { useQuery } from "@tanstack/react-query";

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
          confidence: 0.9,
          status: CaseFieldStatus.Pending,
          documents: [
            {
              type: DocumentType.LO,
              name: "letter-offer-1.pdf",
              value: "RAH ADIBA BIN",
              confidence: 0.9,
              url: "/letter-offer-1.pdf",
              createdAt: new Date("2025-05-01T00:00:00Z")
            },
            {
              type: DocumentType.SPA,
              name: "spa-1.pdf",
              value: "RAH ADIBA BIN",
              confidence: 0.9,
              url: "/spa-1.pdf",
              createdAt: new Date("2025-05-01T00:00:00Z")
            }
          ]
        },
        {
          name: "Registered Owner IC",
          value: "123456789012",
          confidence: 0.7,
          status: CaseFieldStatus.Pending,
          documents: [
            {
              type: DocumentType.LO,
              name: "letter-offer-1.pdf",
              value: "123456789012",
              confidence: 0.7,
              url: "/letter-offer-1.pdf",
              createdAt: new Date("2025-05-01T00:00:00Z")
            },
            {
              type: DocumentType.SPA,
              name: "spa-1.pdf",
              value: "123456789012",
              confidence: 0.7,
              url: "/spa-1.pdf",
              createdAt: new Date("2025-05-01T00:00:00Z")
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