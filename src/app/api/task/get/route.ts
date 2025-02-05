import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Task from "@/lib/modals/task.modal";

export async function GET() {
  try {

    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch tasks only for the logged-in user
    const tasks = await Task.find({ userId }).sort({ dueDate: 1 });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
