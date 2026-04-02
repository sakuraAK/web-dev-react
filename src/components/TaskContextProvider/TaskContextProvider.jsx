import TaskContext from "../../context/TaskContext";
import { useState, useEffect } from "react";

function TaskContextProvider({ children }) {

     const [tasks, updateTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
      });
    
      useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);
    
      function addTask(formData) {
    
        if (formData.title.trim() === "") {
          return;
        }
    
        const newTask = {
          id: Date.now(),
          title: formData.title,
          priority: formData.priority,
          dueDate: formData.dueDate,
        }
    
        updateTasks([...tasks, newTask]);
    
      }
    
      function onDeleteTask(id) {
        console.log("Deleting task");
        updateTasks([...tasks.filter(t => t.id !== id)]);
      }

      const value = {
        tasks,
        addTask,
        onDeleteTask,
      }

      return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
      );



}


export default TaskContextProvider;