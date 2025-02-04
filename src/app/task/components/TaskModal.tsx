"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/store/useTaskStore";
import { Loader2Icon, Plus } from "lucide-react";

export default function TaskModal() {
  const { addTask } = useTaskStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.dueDate) {
      alert("Title and Due Date are required!");
      return;
    }
    
    setLoading(true);

    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const data = await res.json();
      addTask(data.task);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error("Task creation error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white shadow-md flex items-center justify-center space-x-1 px-4 py-2 rounded">
        <div className="flex space-x-2 justify-center items-center">
              <div className="bg-green-600 rounded-full w-3 h-3"></div>
              <div className="bg-red-600 rounded-full w-3 h-3"></div>
              <div className="bg-yellow-300 rounded-full w-3 h-3"></div>
            </div>
            <Plus className="text-black font-extrabold" size={32} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a Task</DialogTitle>
        <Input name="title" placeholder="Task Title" onChange={handleChange} />
        <Textarea name="description" placeholder="Task Description" onChange={handleChange} />
        <Input type="date" name="dueDate" onChange={handleChange} />
        <Button onClick={handleSubmit}>
           {loading ? <Loader2Icon className="animate-spin"/> : <p>Save Task</p>}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
