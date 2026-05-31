import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Attempt database connection check
    await dbConnect();
    
    // mongoose.connection.readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbState = mongoose.connection.readyState;
    const isHealthy = dbState === 1;

    return NextResponse.json(
      {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          status: isHealthy ? 'connected' : 'disconnected',
          readyState: dbState,
        },
      },
      { status: isHealthy ? 200 : 500 }
    );
  } catch (error: any) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          status: 'disconnected',
          error: error.message || 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
