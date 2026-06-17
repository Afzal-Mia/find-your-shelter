import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Inquiry } from "@/models/Inquiry";
import { inquiryCreateSchema } from "./inquiry.validation";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validationResult = inquiryCreateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, phone, email, message, propertyId } = validationResult.data;

    const inquiry = await Inquiry.create({
      propertyId,
      name,
      phone,
      email,
      message,
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", inquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Inquiry Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("propertyId", "title location") 
      .exec();

    const total = await Inquiry.countDocuments(query);

    return NextResponse.json(
      {
        inquiries,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Inquiries Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
