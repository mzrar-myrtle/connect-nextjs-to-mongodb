import { MongoClient, Db } from "mongodb";

const MONGODB_URL: string = process.env.NEXT_MONGODB_URL ?? "";
const dbName = "Demo";

if (!MONGODB_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URL);
  await client.connect();
  console.log("Connected successfully to MongoDB");

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
