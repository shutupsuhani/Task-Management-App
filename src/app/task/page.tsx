"use client";
import Navigation from "@/components/Navigation";
import React from "react";
import TaskModal from "./components/TaskModal";
import TaskList from "./components/TaskList";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl  tracking-tight sm:text-4xl md:text-4xl font-bold text-center text-gray-800 mb-6">
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
