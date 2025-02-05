import { NextRequest, NextResponse } from "next/server";
import Task from "@/lib/modals/task.modal";
import { connect } from "@/lib/dbConnect";  

export async function DELETE(req: NextRequest, { params }: { params: { taskId: string } }) {
  try {
    await connect();

    const { taskId } = params;

    if (!taskId) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }


    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
