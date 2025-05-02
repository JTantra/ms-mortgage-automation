
import { useCasesList } from "@/hooks/cases";


export default function CasesPage() {
  const cases = useCasesList();
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="text-2xl font-bold">Cases</h1>
        <p className="text-gray-500">List of cases here goes here</p>
      </div>
    </div>
  );
}