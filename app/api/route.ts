import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.NEXT_MONGODB_URL) {
    return NextResponse.json({
      message: "No URL",
    });
  }

  const client = new MongoClient(process.env.NEXT_MONGODB_URL);
  const dbName = "Demo";

  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  const insertResult = await collection.insertMany([
    { a: 1 },
    { a: 2 },
    { a: 3 },
  ]);

  console.log(insertResult);

  return NextResponse.json({
    message: "PASS",
  });
}
