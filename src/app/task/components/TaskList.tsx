"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import TaskUpdateModal from "./TaskUpdateModal";

// Task Interface
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/task/get");
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const openUpdateModal = (task: Task) => {
    setSelectedTask(task);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200";
      case "in-progress":
        return "bg-blue-200";
      case "completed":
        return "bg-green-200";
      default:
        return "bg-gray-200";
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
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-md">
              <div>
                <strong>{task.title}</strong> - Due: {new Date(task.dueDate).toLocaleDateString()}
                <div className={`mt-2 px-3 py-1 rounded-md ${getStatusColor(task.status)}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </div>
              </div>
              <div>
                <Button onClick={() => openUpdateModal(task)} className="ml-4">
                  Edit
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Task Update Modal */}
      {selectedTask && <TaskUpdateModal task={selectedTask} />}
    </div>
  );
}
