"use client";

import { useApplication } from "@/hooks/cases";
import { ApplicationFieldStatus, CONFIDENCE_THRESHOLD } from "@/models/case";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Tree } from "primereact/tree";

export default function SummaryPage() {
  const { id: caseId } = useParams();
  
  const { data } = useApplication(caseId as string);

  const filteredFields = data?.results?.fields;

  const treeData = filteredFields?.map((f, i) => {
    const ref = f.documents.find(d => d.isRef);
    const issues = f.documents.filter(d => !d.isRef && (
      // d.confidence <= CONFIDENCE_THRESHOLD || 
      d.value !== ref?.value
    ));
    
    return {
      key: `${i}`,
      field: f.name,
      label: `${f.name} : ${ref?.value}`,
      isRoot: true,
      data: f,
      children: f.status !== ApplicationFieldStatus.Approved ? issues.map((doc, j) => {
        return {
          key: `${i}-${j}`,
          label: `${doc?.type} : ${doc?.value}`,
          data: doc
        }
      }) : []
    }
  });

  const nodeTemplate = (node: any) => {
    if (node.isRoot) {
      return (
        <div className="flex flex-row items-center">
          <span className="font-semibold">{node.label}</span>
          {
            node.children.length === 0 ? (
              <CheckCircleIcon className="text-green-500 ml-2" size="1.5rem" />
            ) : (
              <XCircleIcon className="text-red-500 ml-2" size="1.5rem" /> 
            )
          }
        </div>
      )
    }
    else {
      return <span>{node.label}</span>
    }
  }

  return (
    <div className="flex flex-col w-full h-full p-8 relative overflow-hidden">
      <p className="text-2xl font-semibold mb-4">{`Application ${caseId?.toString()} Summary`}</p>
      <Tree value={treeData} nodeTemplate={nodeTemplate}/>
    </div>
  )
}