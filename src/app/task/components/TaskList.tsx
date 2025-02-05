"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
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
    setLoading(true);  // Start loading before fetch
    try {
      console.log("Refreshing tasks...");
      const res = await fetch("/api/task/get");
      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      console.log("Updated tasks:", data);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setLoading(false);  // End loading after fetch is complete
    }
  };

  useEffect(() => {
    refreshTasks();  // Fetch tasks initially
  }, [setTasks]);

  const openUpdateModal = (task: Task) => {
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {loading ? (
        <Loader2Icon className="animate-spin" />  
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task._id} className="flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-md">
              <div>
                <strong>{task.title}</strong> - Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div>
                <Button onClick={() => openUpdateModal(task)} className="ml-4">
                  Edit
                </Button>
                <Button onClick={() => deleteTask(task._id)} className="ml-4 bg-red-500 text-white">
                  <Trash2Icon/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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
