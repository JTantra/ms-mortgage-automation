"use client";

import { useParams } from "next/navigation";


export default function CaseDetail() {
  const { id: caseId } = useParams();
  // const cases = useCasesList();
  
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="text-2xl font-bold">Case {caseId}</h1>
        <p className="text-gray-500">Case detail goes here</p>
      </div>
    </div>
  );
}