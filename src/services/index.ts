import { DocumentType } from "@/models/case";

export function getDocumentType(file: File) {
  let docType: DocumentType = DocumentType.IC;
  const name = file.name.toLowerCase();

  if (name.includes("doa") || name.includes("deed") || name.includes("assignment")) {
    docType = DocumentType.DOA;
  }
  else if (name.includes("offer") || name.includes("letter")) {
    docType = DocumentType.LO;
  }
  else if (name.includes("spa") || name.includes("sale") || name.includes("purchase")) {
    docType = DocumentType.SPA;
  }

  return docType;
}