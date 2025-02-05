"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Loader2Icon, Trash2Icon } from "lucide-react";
import TaskUpdateModal from "./TaskUpdateModal";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export default function TaskList() {
  const { tasks, setTasks } = useTaskStore();
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Function to refresh tasks
  const refreshTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://task-management-app-y9ga.vercel.app/api/task/get");
      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      const tasksWithStatus = data.tasks.map((task: any) => ({
        ...task,
        status: task.status || "pending", // Add a default status if it's missing
      }));
      setTasks(tasksWithStatus);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();  // Fetch tasks initially
  }, [setTasks]);

  const openUpdateModal = (task: Task) => {
    if (!task.status) {
      task.status = "pending"; // Fallback if status is missing
    }

    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`https://task-management-app-y9ga.vercel.app/api/task/delete/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the task from the list on success
        setTasks(tasks.filter((task) => task._id !== taskId)); // Remove the deleted task from the state
        alert("Task deleted successfully");
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2Icon className="animate-spin text-gray-500" size={48} />
      </div>
    );
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-700">No tasks found.</p>;
  }

  return (
    <div className="px-4 py-8 sm:px-6 md:px-8">
      <h2 className="text-xl font-semibold text-primary mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-4 bg-white shadow-md rounded-md"
          >
            <div className="flex-1">
              <strong>{task.title}</strong> - Due-Date:{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button
                onClick={() => openUpdateModal(task as Task)}
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-md"
              >
                <Edit2Icon className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => deleteTask(task._id)}
                className="flex items-center justify-center p-2 bg-red-500 text-white rounded-md"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Update Modal */}
      {selectedTask && (
        <TaskUpdateModal
          task={selectedTask}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
}
