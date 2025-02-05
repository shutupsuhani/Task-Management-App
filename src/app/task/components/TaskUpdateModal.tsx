"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface TaskUpdateModalProps {
  task: Task;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTasks: () => void;
}

export default function TaskUpdateModal({ task, open, setOpen , refreshTasks }: TaskUpdateModalProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    dueDate: task.dueDate,
    status: task.status,
  });
   
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate,
        status: task.status,
      });
    }
  }, [open, task]);

  // Handles input & textarea changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles select dropdown changes
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/task/update/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dueDate: new Date(formData.dueDate).toISOString(), 
        }),
      });
  
      const data = await res.json();
      console.log("Response Data:", data);
  
      if (res.ok && data.success) {
        refreshTasks();
        setOpen(false); 
      } else {
        console.error("Failed to update task:", data);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally{
      setLoading(true);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Task</h3>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="w-full p-2 border rounded-md mb-3"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          className="w-full p-2 border rounded-md mb-3"
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md mb-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleSelectChange}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button onClick={handleSave} className="bg-blue-500 flex justify-center items-center text-white">{loading ? <Loader2Icon className="animate-spin"/> : <p>Save</p>} </Button>
          <Button onClick={() => setOpen(false)} className="bg-gray-400 text-white">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
