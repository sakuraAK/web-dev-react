import TaskContext from "../../context/TaskContext";
import { useState, useEffect } from "react";
import { useTasks } from "../../hooks";

function TaskContextProvider({ children }) {
  //  const [tasks, updateTasks] = useState(() => {
  //     const savedTasks = localStorage.getItem("tasks");
  //     return savedTasks ? JSON.parse(savedTasks) : [];
  //   });


  const { tasks, loading, error, addTask, onDeleteTask, updateTask } = useTasks();
  

  const value = {
    tasks,
    loading,
    error,
    addTask,
    onDeleteTask,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
