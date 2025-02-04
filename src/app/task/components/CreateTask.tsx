"use client";
import { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/task/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Task created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
    } else {
      setMessage(data.message || "Error creating task");
    }
  };

  return (
    <div>
      <h2>Create a Task</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
