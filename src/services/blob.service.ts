import { BlobServiceClient, BlockBlobUploadResponse } from '@azure/storage-blob';

export class BlobService {
  private client: BlobServiceClient;

  constructor() {
    // Initialize the BlobServiceClient with the connection string
    const connectionString = process.env.STORAGE_CONNECTION_STRING as string;
    this.client = BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadFile(containerName: string, name: string, file: File): Promise<BlockBlobUploadResponse> {
    const containerClient = this.client.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    
    // Convert the file to a Buffer
    const buffer = await file.arrayBuffer();
    const bufferData = Buffer.from(buffer);

    // Upload the file to Azure Blob Storage
    const res = await blockBlobClient.upload(bufferData, bufferData.length);
  
    return res;
  }
}