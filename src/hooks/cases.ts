import { Case, CaseStatus } from "@/models/case";
import { useQuery } from "@tanstack/react-query";


export function useCasesList() {
  return useQuery({
    queryKey: ["cases"],
    queryFn: async (): Promise<Case[]> => {
      return [
        {
          id: "1",
          createdAt: new Date("2025-05-01T00:00:00Z"),
          updatedAt: new Date(),
          status: CaseStatus.Open,
          client: "Aaron"
        }
      ]
    }
  })
}