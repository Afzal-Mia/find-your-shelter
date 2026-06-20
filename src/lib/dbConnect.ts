import mongoose from "mongoose";
import { initializeApp } from "./initializeApp";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

async function dbConnect() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("⏳ Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(async (m) => {
      console.log("✅ MongoDB connected successfully");

      await initializeApp(); // 👈 only addition

      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;