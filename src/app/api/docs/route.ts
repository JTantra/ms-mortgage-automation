import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import { resolve } from 'path';
import { DocIntelService } from "@/services/doc-intel.service";
import { AIService } from "@/services/ai.service";
import multer from 'multer';
import { BlobService } from "@/services/blob.service";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const GET = async (req: NextRequest) => {
  const path = resolve('./public/doa-1.pdf');
  const data = fs.readFileSync(path);
  console.log("data", data.byteLength);

  const file = new File([data], "doa-1.pdf", { type: "application/pdf" });

  const docIntel = new DocIntelService();
  const result = await docIntel.analyzeDocument(file, { pages: "1" });

  console.log("result", result);

  const ai = new AIService();

  const mapping = await ai.getMapping(result.result.analyzeResult?.content as string);

  return NextResponse.json(mapping);
}

const applyMiddleware = (req: NextRequest, res: NextResponse, middleware: any) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const form = await req.formData();

  const file = form.get("file") as File;
  
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const output = form.get("output") as string;

  if (output === "mapping") {
    const docIntel = new DocIntelService();
    const result = await docIntel.analyzeDocument(file, { pages: "1" });

    const ai = new AIService();

    const mapping = await ai.getMapping(result.result.analyzeResult?.content as string);

    return NextResponse.json(mapping);
  }
  else {
    const blobSvc = new BlobService();
    const type = form.get("type") as string;
    const applicationId = form.get("applicationId") as string;
    const blob = await blobSvc.uploadFile("docs", `${applicationId}/raw/${type}.${file.name.split('.')[1]}`, file);

    // upload to doc intel and get the searchable pdf
    const docIntel = new DocIntelService();
    const docIntelResult = await docIntel.analyzeDocument(file, { searchablePdf: true });

    const searchableBlob = await blobSvc.uploadFile("docs", `${applicationId}/searchable/${type}.${file.name.split('.')[1]}`, new File([docIntelResult.searchablePdfBuffer as Buffer], "x.pdf"));

    
    return NextResponse.json({ success: "OK!", result: blob.versionId });
  }
}