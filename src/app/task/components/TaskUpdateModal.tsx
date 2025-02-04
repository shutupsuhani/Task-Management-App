"use client";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { useState } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

const TaskUpdateModal = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/task/update/${task._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to update task");
      closeModal(); // Close modal on success
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-labelledby="task-update-modal-title" aria-describedby="task-update-modal-description">
        {/* If you want to hide the title visually but keep it accessible */}
        <VisuallyHidden>
          <DialogTitle id="task-update-modal-title">Update Task</DialogTitle>
        </VisuallyHidden>

        <p id="task-update-modal-description">Edit the task details below.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <DialogClose asChild>
            <Button type="submit">Save Changes</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskUpdateModal;
