import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/lib/modals/task.modal";
import { connect } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await connect();
    
    const  userId  = (await auth()).userId;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, dueDate } = await req.json();

    if (!title || !dueDate) {
      return NextResponse.json({ message: "Title and Due Date are required" }, { status: 400 });
    }

    const newTask = new Task({
      title,
      description,
      userId,
      dueDate: new Date(dueDate), 
    });

    await newTask.save();

    return NextResponse.json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
