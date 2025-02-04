import { NextRequest, NextResponse } from "next/server";
import Task from "@/lib/modals/task.modal";
import { connect } from "@/lib/dbConnect";

export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
  const { taskId } = await params;

  try {
    await connect();

    const { title, description, dueDate, status } = await req.json();

    if (!title || !dueDate) {
      return NextResponse.json({ message: "Title and Due Date are required" }, { status: 400 });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate: new Date(dueDate), status },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
