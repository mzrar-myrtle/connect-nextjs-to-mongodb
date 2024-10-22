import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("documents");

    // Example database operation
    const insertResult = await collection.insertMany([
      { a: 1 },
      { a: 2 },
      { a: 3 },
    ]);

    console.log(insertResult);

    return NextResponse.json({
      message: "PASS",
      insertResult,
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json({
      message: "Failed to connect to database",
    });
  }
}
