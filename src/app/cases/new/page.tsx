"use client";

import { useCreateApplication } from "@/hooks/cases";
import { CURRENCY, LOCALE } from "@/hooks/data";
import { DocumentType } from "@/models/case";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

type Doc = File & {
  docType?: DocumentType;
}

const DELAY = 2000;

export default function NewApplicationPage() {
  const toastRef = useRef<Toast>(null);
  const router = useRouter();
  const createNewApp = useCreateApplication();
  const [requestor, setRequestor] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [value, setValue] = useState(0);

  const [docs, setDocs] = useState<Doc[]>([]);

  const [loading, setLoading] = useState(false);

  const isNotComplete = requestor === "" || propertyName === "" || value <= 0 || docs.length === 0;

  const handleCreateApp = async () => {
    const newApp = {
      requestor,
      propertyName,
      value,
    };

    setLoading(true);
    setTimeout(async () => {
      await createNewApp.mutateAsync(newApp);
      toastRef.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Application created successfully",
        life: DELAY,
      });
      setLoading(false);
      router.push("/cases");
    }, DELAY);
  };

  const getDocType = (doc: Doc): DocumentType => {
    let docType: DocumentType = DocumentType.IC;
    const name = doc.name.toLowerCase();

    if (name.includes("doa")) {
      docType = DocumentType.DOA;
    }
    else if (name.includes("offer")) {
      docType = DocumentType.LO;
    }
    else if (name.includes("spa")) {
      docType = DocumentType.SPA;
    }

    return docType;
  }

  const updateDocType = (rowData: Doc, docType: DocumentType) => {
    const newDocs = docs.map((doc) => {
      if (doc === rowData) {
        const newDoc = new File([doc], doc.name, {
          type: doc.type,
          lastModified: doc.lastModified,
          // endings: doc.endings,
        }) as Doc;
        newDoc.docType = docType;

        console.log("New doc", newDoc);
        return newDoc;
      }

      return doc;
    });
    setDocs(newDocs);
  };

  const buildDocHeader = () => {
    return (
      <div className="flex flex-row items-center justify-between">
        <p className="text-m font-semibold">Uploaded Documents</p>

        <Button
          className="p-button-sm"
          severity="info"
          loading={loading}
          label="Upload"
          onClick={() => {
            const fileInput = document.getElementById("fileInput") as HTMLInputElement;
            fileInput.click();
          }}
        />
        <input
          type="file"
          id="fileInput"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              const newFiles = Array.from(files);
              newFiles.forEach(f => {
                (f as any).docType = getDocType(f);
              });
              setLoading(true);

              // Simulate a delay for file upload
              setTimeout(() => {
                setLoading(false);
                setDocs((prevDocs) => [...prevDocs, ...newFiles]);
              }, 2000);
            }
          }}
        />
      </div>
    )
  };

  const buildDocType = (rowData: Doc) => {
    const curr = rowData.docType;
    return (
      <div className="flex flex-row items-center">
        <Dropdown
          className="p-dropdown-sm w-full"
          value={curr}
          options={Object.values(DocumentType)}
          onChange={(e) => updateDocType(rowData, e.value as DocumentType)}
        />
      </div>

    )
  }

  const buildRowActions = (rowData: Doc) => {
    return (
      <div className="flex flex-row">
        <Button raised text className="p-button-text" size="small" onClick={() => {
          setDocs((prevDocs) => prevDocs.filter((doc) => doc !== rowData));
        }}>
          <Trash2Icon
            size="1rem"
            className="text-red-500 cursor-pointer"
          />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-y-auto">
      <h1 className="flex text-2xl font-bold">New Application</h1>
      <div className="flex flex-col min-w-[600px] border border-gray-200 bg-white shadow-sm p-4 mt-4">
        <label htmlFor="requestor" className="mt-4">Requestor</label>
        <InputText
          required
          type="text"
          id="requestor"
          value={requestor}
          className="p-inputtext-sm"
          onChange={(e) => setRequestor(e.target.value)}
        />
        <label htmlFor="propertyName" className="mt-4">Property Name</label>
        <InputText
          required
          type="text"
          id="propertyName"
          value={propertyName}
          className="p-inputtext-sm"
          onChange={(e) => setPropertyName(e.target.value)}
        />
        <label htmlFor="value" className="mt-4">Mortgage Value</label>
        <InputNumber
          required
          inputId="value"
          id="value"
          locale={LOCALE}
          currency={CURRENCY}
          mode="currency"
          value={value}
          className="p-inputtext-sm mb-4"
          minFractionDigits={2}
          maxFractionDigits={2}
          onChange={(e) => setValue(Number(e.value))}
        />

        <DataTable header={buildDocHeader} value={docs}>
          <Column field="name" header="File Name" body={(rowData) => rowData.name} />
          {/* <Column field="size" header="Size (bytes)" body={(rowData) => rowData.size} /> */}
          <Column field="type" header="Document Type" body={buildDocType} />
          <Column field="action" header="Actions" body={buildRowActions} />
        </DataTable>

        <Button onClick={handleCreateApp} label="Create Application" disabled={isNotComplete} loading={loading} className="mt-4"></Button>
      </div>
      <Toast ref={toastRef} />
    </div>
  )
}