import './App.css'
import './components/TaskCard/TaskCard.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import StatsPage from './pages/StatsPage';
import HomePage from './pages/HomePage';
import { useState, useEffect } from "react";
import Layout from './pages/Layout';
import TaskDetail from './components/TaskDetail/TaskDetail';




function App() {
  //run on rendering
  //useEffect(() => {console.log("use effect running")});

  //run once
  //useEffect(() => { console.log("Run once") }, []);



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

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={<HomePage
              tasks={tasks}
              addTask={addTask}
              onDeleteTask={onDeleteTask}
            />} />
          <Route path="stats" element={<StatsPage tasks={tasks} />} />
          <Route path="tasks/:id" element={<TaskDetail />}/>
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  );


}

export default App;
