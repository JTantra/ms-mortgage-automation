"use client";

import { useUpdateApplication, useApplication } from "@/hooks/cases";
import { redirect, useParams } from "next/navigation";
import { Button } from "primereact/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import FieldSummary from "./field-summary";
import { Application, ApplicationFieldStatus, FieldAnalysisResult, FieldDocumentResult } from "@/models/case";
import DocumentSummary from "./document-summary";
import DocumentViewer from "./document-viewer";
import { Accordion } from "primereact/accordion";
import { useMutation } from "@tanstack/react-query";

export default function CaseDetail() {
  const { id: caseId } = useParams();
  const { data, refetch } = useApplication(caseId as string);

  const updateApplication = useUpdateApplication(caseId as string);
  // const [app, setApp] = useState<Application | undefined>(data);
  
  console.log("Refreshing");

  const [selectedField, setSelectedField] = useState<FieldAnalysisResult | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<FieldDocumentResult | null>(null);

  const goSummary = () => {
    redirect(`/cases/${caseId}/summary`);
  }

  // const rect = {
  //   x1: 221,
  //   y1: 147,
  //   x2: 255,
  //   y2: 157,
  //   width: 432,
  //   height: 574
  // }

  return (
    <div className="flex flex-col w-full h-full p-8 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Application {caseId}</p>
        <Button size="small" label="Get Summary" severity="success" onClick={goSummary}/>
      </div>
      <div className="grid grid-cols-8 2xl:grid-cols-10 mt-4 h-full relative">
        <div className="col-span-2 2xl:col-span-2 flex flex-col gap-4 border-r-1 overflow-y-auto">
          <p className="text-m font-semibold">Fields Validation</p>
          {
            data?.results?.fields.map((f, i) => {
              return (
                <FieldSummary key={`${f.name}-${i}`} value={f} onMoreInfo={e => {
                  setSelectedField(f);
                  setSelectedDoc(null);
                }} onApprove={async e => {
                  console.log("Approve", i);
                  const n = Object.assign({}, data)
                  n.results.fields[i].status = ApplicationFieldStatus.Approved;
                  updateApplication.mutate(n);
                }}/>
              )
            })
          }
        </div>
        <div className="col-span-2 2xl:col-span-2 flex flex-col gap-4 border-r-1 relative overflow-y-auto">
          <p className="text-m font-semibold ml-2">{selectedField ? `Documents: ${selectedField.name}` : "Documents"}</p>
          <div className="h-full w-full p-2">
            {
              selectedField ? (
                <DocumentSummary  value={selectedField.documents} onMoreInfo={setSelectedDoc}/>
              )
            : <p className="text-sm ml-2">Click on a field to view its documents</p>
            }
          </div>

        </div>
        <div className="col-span-4 2xl:col-span-6 flex flex-col gap-4 ml-2 relative">
          <p className="text-m font-semibold">{selectedDoc ? `View: ${selectedDoc.name}` : "Document Viewer"}</p>
          {
            selectedDoc ? (
              <DocumentViewer url={selectedDoc.url} highlights={[
                // {
                //   id: "001",
                //   // type: "highlight",
                //   position: {
                //     pageNumber: 1,
                //     boundingRect: rect,
                //     rects: [
                //       rect
                //     ],
                //   },
                //   content: {

                //   },
                //   comment: {
                //     text: "Registered Beneficial Owner",
                //     // emoji: "👍",
                //     emoji: ""
                //   }
                // }
                {
                  id: selectedDoc.evidence.id,
                  position: {
                    pageNumber: selectedDoc.evidence.position.pageNumber,
                    boundingRect: selectedDoc.evidence.position.boundingRect,
                    rects: selectedDoc.evidence.position.rects
                  },
                  content: {
                    // text: selectedDoc.value,
                    // emoji: "👍",

                  },
                  comment: {
                    text: selectedField?.name as string,
                    emoji: ""
                  }
                }
              ]} />
            ) : <p className="text-sm">Click on a document on the left to view the document</p>
          }
        </div>
      </div>
    </div>
  );
}