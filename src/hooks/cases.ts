import { Application, ApplicationStatus, DocumentType, NewAppDto } from "@/models/case";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applications, defaultResults } from "@/hooks/data";

export function useApplicationsList() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async (): Promise<Application[]> => {
      return applications;
    }
  })
}

export function useApplication(id: string) {
  console.log("Fetching application", id);
  return useQuery({
    queryKey: ["application", id],
    queryFn: async (): Promise<Application | undefined> => {
      const app = applications.find(c => c.id === id);
      return app;
    }
  })
}

export function useUpdateApplication(id: string) {
  console.log("Updating application", id);
  const app = applications.find(c => c.id === id) as Application;
  return useMutation({
    // mutationKey: ["application", id],
    mutationFn: async (newApp: Application): Promise<Application> => {
      Object.assign(app, newApp);
      return newApp;
    },
  })
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: async (newApp: NewAppDto): Promise<Application> => {
      const app: Application = {
        id: `00${applications.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        requestor: newApp.requestor,
        propertyName: newApp.propertyName,
        value: newApp.value,
        numOfReviews: 0,
        status: ApplicationStatus.Open,
        results: defaultResults
      }

      applications.push(app);
      return app;
    }

  })
}