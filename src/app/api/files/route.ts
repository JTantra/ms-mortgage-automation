import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import { resolve } from 'path';
import { DocIntelService } from "@/services/doc-intel.service";
import { AIService } from "@/services/ai.service";
import multer from 'multer';

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

export const POST = async (req: NextRequest, res: NextResponse) => {
  const upload = multer({ storage: multer.memoryStorage() });

  const form = await req.formData();
  upload.single('file')(req as any, res as any, async (err: any) => {
    if (err) {
      console.error("Error uploading file:", err);
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    const file = (req as any).file as File;

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
      return NextResponse.json({ error: "Not implmeneted yet" }, { status: 400 })
    }
  });
}