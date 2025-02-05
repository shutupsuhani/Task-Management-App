// app/api/task/delete/[taskId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Task from '@/lib/modals/task.modal';
import { connect } from '@/lib/dbConnect'; 

export async function DELETE(req: NextRequest, { params }: { params: { taskId: string } }) {
  const { taskId } = params;

  try {
    await connect();

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
