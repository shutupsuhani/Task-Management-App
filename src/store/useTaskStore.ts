import { create } from "zustand";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void; // Using Partial for the updated fields
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task._id === taskId ? { ...task, ...updatedTask } : task
    )
  })),
}));
