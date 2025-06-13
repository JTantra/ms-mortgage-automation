import { Application } from "@/models/case";
import {
  Container,
  CosmosClient,
  CosmosDbDiagnosticLevel,
  Database,
  PartitionKey,
  SqlParameter,
} from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

export class DbService {
  protected readonly client: CosmosClient;
  protected readonly database: Database;
  protected readonly databaseName: string;
  protected readonly container: Container;

  protected _pk: string = "applications"

  /**
   *
   */
  constructor() {
    this.databaseName = process.env.COSMOS_DB_NAME as string;
    this.client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      // key: process.env.COSMOS_API_KEY,
      aadCredentials: new DefaultAzureCredential()
      // diagnosticLevel: CosmosDbDiagnosticLevel.debug,
    });
    this.database = this.client.database(this.databaseName);
    this.container = this.database.container("cases");
  }

  async findAll(): Promise<Application[]> {
    const query = `SELECT id, requestor, propertyName, value, numOfReviews, createdAt FROM c WHERE c.pk = @pk`;
    const params: SqlParameter[] = [
      {
        name: '@pk',
        value: this._pk
      }
    ];

    const res = await this.container.items.query({
      query,
      parameters: params
    }).fetchAll();

    return res.resources;
  }

  async findOne(id: string): Promise<Application> {
    const res = await this.container.item(id, this._pk).read();

    return res.resource;
  }

  async create(body: Partial<Application>): Promise<Application> {
    const now = new Date();

    const obj = {
      ...body,
      pk: this._pk,
      createdAt: now,
      updatedAt: now,
    };

    const res = await this.container.items.create(obj);

    return res.resource as any;
  }
}