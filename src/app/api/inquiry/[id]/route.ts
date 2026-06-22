import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Inquiry } from "@/models/Inquiry";
import { inquiryUpdateSchema } from "../inquiry.validation";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }

) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const validationResult = inquiryUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { status } = validationResult.data;

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Inquiry status updated successfully", inquiry },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH Inquiry Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
