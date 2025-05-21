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

const RESULT_PROMPT = `You are a mortgage agent in a bank, helping to check different fields across multiple documents that the user has submitted as part of their mortgage application. For each of the fields, please check them across the different documents based on the prompt and output the value, the pages where the value is found,. Also output whether the value matches across those documents. Output your findings in json format as below:
{
"<field_name>": {
  "<file_name>": "<value>",
  "is_match": "<boolean>",
  "comments": "<comments>"
  }
}`;

// each application needs a vector store ID and a thread ID. Assistant ID can be shared
export class AIService {
  protected client: AzureOpenAI;

  constructor() {
    this.client = new AzureOpenAI({
      apiKey: process.env["OPEN_AI_API_KEY"] as string,
      endpoint: process.env["OPEN_AI_ENDPOINT"] as string,
      apiVersion: "2024-10-21",
      deployment: process.env["OPEN_AI_DEPLOYMENT"] || "gpt-4.1",
    });
  }

  async getMapping(content: string): Promise<{ type: string }> {
    const res = await this.client.chat.completions.create({
      model: "gpt-4.1-2025-04-14",
      // stream: true,
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

    return JSON.parse(resp) as { type: string };
  }

  async uploadFile(storeId: string, file: File) {
    const res = await this.client.vectorStores.files.upload(storeId, file);

    return res;
  }

  async createVectorStore(name: string): Promise<VectorStore> {
    const res = await this.client.vectorStores.create({
      name,
      metadata: {
        description: `Vector store for application ${name}`,
      },
    })
    
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
          role: "assistant",
          content: RESULT_PROMPT
        }
      ]
    })

    return thread;
  }

  async getResult() {
    const asst = await this.client.beta.assistants.create({
      model: "gpt-4.1-2025-04-14",
      name: "Some application ID",
      instructions: ``,
      tools: [
        {
          type: "file_search",
          file_search: {}
        }
      ]
    });
    
    const thread = await this.client.beta.threads.create({
      tool_resources: {
        file_search: {
          vector_store_ids: ["storeId"]
        }
      }
    });


  }
}