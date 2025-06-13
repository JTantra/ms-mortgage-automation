import { Application, ApplicationStatus } from "@/models/case";
import { AIService } from "@/services/ai.service";
import { DbService } from "@/services/db.service";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from 'nanoid';


export const POST = async (req: NextRequest) => {
  const body = await req.json() as Partial<Application>;

  const id = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")(6);

  const aiSvc = new AIService();
  const store = await aiSvc.createVectorStore(id);

  const db = new DbService();
  const result = await db.create({
    ...body,
    id,
    storeId: store.id,
    numOfReviews: 0,
    status: ApplicationStatus.Open,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return NextResponse.json(result);
}