"use client";

import Navigation from "@/components/Navigation";
import React, { useState, useEffect } from "react";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";
import { Loader2Icon } from "lucide-react"; 

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating initial data load
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating 1.5 seconds of loading time for the example
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Loader2Icon className="animate-spin text-blue-600" size={48} />
          <p className="mt-4 text-lg text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl tracking-tight sm:text-4xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Manage Your Tasks in ⏳
        </h1>

        {/* Create Task Button (Modal Trigger) */}
        <div className="flex justify-end mb-6">
          <TaskModal />
        </div>

        {/* Task List */}
        <TaskList />
      </main>
    </div>
  );
};

export default Page;

// Thank you **Regards Suhani Sahu*