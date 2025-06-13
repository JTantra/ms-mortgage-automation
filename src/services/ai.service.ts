import { FieldAnalysisResult } from '@/models/case';
import { AzureOpenAI } from 'openai';
import { Thread } from 'openai/resources/beta/threads/threads.mjs';
import { VectorStore } from 'openai/resources/index.mjs';

const MAPPING_PROMPT = `From the content extracted from document intelligence, decide if the supplied content is from which of these document types:
- IC (key: IC)
- Sale and Purchase Agreement (key: SPA)
- Deed of Assignment (key: DOA)
- Letter of Offer (key: LO)

Output the result in json format:
{ type: <doc_type> } where the <doc_type> is the key instead of the full name.`;

const RESULT_INSTRUCTION = `You are a mortgage agent in a bank, helping to check different fields across multiple documents that the user has submitted as part of their mortgage application. For each of the fields, please check them across the different documents based on the prompt and output the value, the pages where the value is found. Also output whether the value matches across those documents. Output your findings in an array of json format as below. If there are multiple values found in that document, use "|" to separate those values. Ignore special characters in the output:
{
  name: "<field_name>",
  value: "<value>",
  status: "PENDING",
  documents: [
    {
      name: "<document_name>",;
      isRef?: "<boolean>";
      type: "IC | SPA | DOA | LO";
      value: "<value>";
    }
  ]
}`;

const RESULT_PROMPT = `
- registered owner name in IC (reference), SPA, DOA, LO
- registered owner ic in IC (reference), SPA, DOA, LO
`

// each application needs a vector store ID and a thread ID. Assistant ID can be shared
export class AIService {
  protected client: AzureOpenAI;
  protected readonly assistantId: string;

  constructor() {
    this.client = new AzureOpenAI({
      apiKey: process.env["OPEN_AI_API_KEY"] as string,
      endpoint: process.env["OPEN_AI_ENDPOINT"] as string,
      apiVersion: "2025-03-01-preview",
      deployment: process.env["OPEN_AI_DEPLOYMENT"] || "gpt-4o",
    });

    this.assistantId = process.env["OPEN_AI_ASSISTANT_ID"] || "asst_r5J550UeXUXJEOfLddCNupNC";
  }

  async getMapping(content: string): Promise<{ type: string }> {
    const res = await this.client.chat.completions.create({
      model: "gpt-4o",
      // stream: true,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: MAPPING_PROMPT
        },
        {
          role: "user",
          content
        }
      ]
    })

    let resp = "";
    res.choices.forEach(c => {
      resp += c.message.content;
    })

    // beta.assistants.retrieve("asst_r5J550UeXUXJEOfLddCNupNC");
    console.log(resp);
    return JSON.parse(resp) as { type: string };
  }

  async uploadFile(storeId: string, file: File) {
    const res = await this.client.vectorStores.files.upload(storeId, file);

    return res;
  }

  async createVectorStore(name: string): Promise<VectorStore> {
    console.log("Creating vector store for", name);
    const res = await this.client.vectorStores.create({
      name,
      metadata: {
        description: `Vector store for application ${name}`,
      },
    })
    
    console.log("Vector store created", res.id);
    console.log(await this.client.beta.assistants.retrieve(this.assistantId));
    return res;
  }

  async createThread(storeId: string): Promise<Thread> {
    const thread = await this.client.beta.threads.create({
      tool_resources: {
        file_search: {
          vector_store_ids: [storeId]
        }
      },
      messages: [
        {
          role: "user",
          content: RESULT_PROMPT
        }
      ]
    })

    return thread;
  }

  async getResult(storeId: string): Promise<FieldAnalysisResult[]> {
    const thread = await this.createThread(storeId);

    const run = await this.client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: this.assistantId,
      response_format: {
        type: "json_object",
      }
    });

    const messages = await this.client.beta.threads.messages.list(thread.id, {
      run_id: run.id,
      // limit: 1,
      order: "desc"
    });

    console.log("messages", messages.data[0].content);

    // return JSON.parse(messages.data[0].content) as FieldAnalysisResult[];
    return [];
  }
}