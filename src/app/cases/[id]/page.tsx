"use client";

import { useCase } from "@/hooks/cases";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { useState } from "react";
import FieldSummary from "./field-summary";
import { FieldAnalysisResult, FieldDocumentResult } from "@/models/case";
import DocumentSummary from "./document-summary";

export default function CaseDetail() {
  const { id: caseId } = useParams();
  const { data } = useCase(caseId as string);

  const [selectedField, setSelectedField] = useState<FieldAnalysisResult | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<FieldDocumentResult | null>(null);
  
  return (
    <div className="flex flex-col w-full h-full p-8">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Case {caseId}</p>
        <Button size="small" label="Save" severity="success"/>
      </div>
      <div className="grid grid-cols-3 mt-4 h-full">
        <div className="col-span-1 flex flex-col gap-4 border-r-1 overflow-y-auto">
          <p className="text-lg font-semibold">Field Summary</p>
          {
            data?.results?.fields.map((f, i) => {
              return (
                <FieldSummary value={f} onMoreInfo={e => setSelectedField(f)}/>
              )
            })
          }
        </div>
        <div className="col-span-1 flex flex-col gap-4 border-r-1 overflow-y-auto">
          <p className="text-lg font-semibold ml-2">{selectedField ? `Documents: ${selectedField.name}` : "Documents"}</p>
          {selectedField ? selectedField.documents.map((d, i) => {
            return (
              <DocumentSummary value={d} index={i} onMoreInfo={(e: Event) => setSelectedDoc(d)} />
            )
          }):
            (<p className="text-sm">Click on a field to view documents</p>)}
        </div>
        <div className="col-span-1 flex flex-col gap-4 ml-2">
          <p className="text-lg font-semibold">Document Viewer</p>
          <p className="text-sm">Click on a document on the left to view the document</p>
        </div>
      </div>
    </div>
  );
}