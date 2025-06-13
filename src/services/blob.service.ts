import { BlobServiceClient, BlockBlobUploadResponse, StorageSharedKeyCredential } from '@azure/storage-blob';
import { AzureCliCredential, DefaultAzureCredential } from '@azure/identity';
export class BlobService {
  private client: BlobServiceClient;

  constructor() {
    // Initialize the BlobServiceClient with the connection string
    const connectionString = process.env.STORAGE_CONNECTION_STRING as string;
    const accountName = process.env.STORAGE_ACCOUNT_NAME as string;
    const key = process.env.STORAGE_API_KEY as string;
    const keyCred = new StorageSharedKeyCredential(accountName, key)
    // console.log("storagecred", keyCred);
    const cred = new DefaultAzureCredential();
    // console.log("cred", cred);
    this.client = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net/`,
      cred
    );
  }

  async uploadFile(containerName: string, name: string, file: File): Promise<BlockBlobUploadResponse> {
    const containerClient = this.client.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(name);

    // Convert the file to a Buffer
    const buffer = await file.arrayBuffer();
    const bufferData = Buffer.from(buffer);
    console.log("uploading", name);
    // Upload the file to Azure Blob Storage
    const res = await blockBlobClient.upload(bufferData, bufferData.length);
    console.log(this.client.url);
    return res;
  }
}