"use client";

import { useApplicationsList } from "@/hooks/cases";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { format } from 'date-fns';
import { Application, ApplicationStatus } from "@/models/case";
import Link from "next/link";
import { Tag } from "primereact/tag";

export default function CasesPage() {
  // const cases = useCasesList();

  const { data: apps } = useApplicationsList();

  const formatId = (app: Application) => {
    return <Link href={`/cases/${app.id}`} className="text-blue-500 hover:text-blue-900">{app.id}</Link>;
  }

  const formatCurrency = (app: Application) => {
    return app.value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  const formatDate = (app: Application) => {
    return format(app.createdAt, "yyyy-MM-dd");
  }

  const formatStatus = (app: Application) => {
    let icon = "";
    let severity: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' = "info";
    if (app.status === ApplicationStatus.Open) {
      icon = "pi pi-info-circle";
      severity = "info";
    }
    else if (app.status === ApplicationStatus.Approved) {
      icon = "pi pi-check";
      severity = "success";
    }
    else if (app.status === ApplicationStatus.Rejected) {
      icon = "pi pi-times";
      severity = "danger";
    }
    
    return <Tag value={app.status} severity={severity}></Tag>;
  }

  const tableHeader = (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-2xl font-bold">Applications List</h1>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full p-8 relative overflow-hidden">
      <div className="flex flex-col">
        {/* <h1 className="text-2xl font-bold mb-4">Applications List</h1> */}
        <DataTable value={apps} header={tableHeader}>
          <Column field="id" header="ID" body={formatId}></Column>
          <Column field="description" header="Description"></Column>
          <Column field="value" header="Value" body={formatCurrency}></Column>
          <Column field="createdAt" header="Application Date" body={formatDate}></Column>
          <Column field="numOfReviews" header="# Reviews"></Column>
          <Column field="status" header="Status" body={formatStatus}></Column>
        </DataTable>
      </div>
    </div>
  );
}