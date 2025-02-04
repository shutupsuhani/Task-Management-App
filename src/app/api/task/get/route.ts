import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/lib/modals/task.modal";
import { connect } from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await connect();
    
    const  userId  = (await auth()).userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch tasks only for the logged-in user
    const tasks = await Task.find({ userId }).sort({ dueDate: 1 });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
