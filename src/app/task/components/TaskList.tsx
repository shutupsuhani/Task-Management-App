"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
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
      const res = await fetch("/api/task/get");
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
      const res = await fetch(`/api/task/delete/${taskId}`, {
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
    return <Loader2Icon className="animate-spin" />;
  }

  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-md">
            <div>
              <strong>{task.title}</strong> - Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div>
              <Button onClick={() => openUpdateModal(task as Task)} className="ml-4">
                Edit
              </Button>
              <Button onClick={() => deleteTask(task._id)} className="ml-4 bg-red-500 text-white">
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

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
