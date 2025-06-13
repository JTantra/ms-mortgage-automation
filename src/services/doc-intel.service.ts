import DocumentIntelligence, { AnalyzeDocumentDefaultResponse, AnalyzeOperationOutput, AnalyzeResultOutput, DocumentIntelligenceClient, getLongRunningPoller, parseResultIdFromResponse, isUnexpected } from "@azure-rest/ai-document-intelligence";

export class DocIntelService {
  private client: DocumentIntelligenceClient;

  constructor() {
    this.client = DocumentIntelligence(
      process.env["DOC_INTEL_ENDPOINT"] as string, {
      key: process.env["DOC_INTEL_API_KEY"] as string,
    });
  };

  public async analyzeDocument(file: File, options?: {pages?: string, searchablePdf?: boolean}): Promise<{result: AnalyzeOperationOutput, searchablePdfBuffer?: Buffer}> {
    const buffer = await file.arrayBuffer();
    const response = await this.client
      .path("/documentModels/{modelId}:analyze", "prebuilt-read")
      .post({
        contentType: "application/json",
        body: {
          base64Source: Buffer.from(buffer).toString('base64')
        },
        queryParameters: {
          pages: options?.pages ? options.pages : undefined,
          searchablePdf: options?.searchablePdf,
          output: options?.searchablePdf ? ["pdf"] : undefined
        }
      });
    
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const poller = await getLongRunningPoller(this.client, response);
    const result = poller.body as AnalyzeOperationOutput;
    const resultId = parseResultIdFromResponse(response);

    console.log("result", result);
    console.log("pages", result.analyzeResult?.pages.length);

    if (options?.searchablePdf) {
      const pdfBuffer = await this.downloadSearchablPdf(resultId);

      return {
        result,
        searchablePdfBuffer: pdfBuffer
      }
    }

    return {
      result
    };
  }

  private async downloadSearchablPdf(resultId: string): Promise<Buffer> {
    const res = await this.client
      .path("/documentModels/{modelId}/analyzeResults/{resultId}/pdf", "prebuilt-read", resultId)
      .get();

    if (isUnexpected(res)) {
      throw res.body.error;
    }
    
    return Buffer.from(res.body);
  }
}