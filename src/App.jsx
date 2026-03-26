import { useState, useEffect } from 'react';
import './App.css'
import './components/TaskCard/TaskCard.css'
import TaskCard from './components/TaskCard/TaskCard';


const name = "Andrey";


function App() {


  //run on rendering
  //useEffect(() => {console.log("use effect running")});

  //run once
  //useEffect(() => {console.log("Run once")}, []);



  const [tasks, updateTasks] =  useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [formData, updateFormData] = useState({
    title: "",
    priority: "High",
    dueDate: "",
  });

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks]);

  function addTask() {
  
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

    updateFormData({
      title: "",
      priority: "High",
      dueDate: "",
    });
  }

  function onDeleteTask(id) {
        console.log("Deleting task");
        updateTasks([...tasks.filter(t => t.id !== id)]);
  }

  return (
  <>
    <h1>Hello {name} below are your tasks:</h1>
    <form onSubmit={(e) => {
          e.preventDefault();
          addTask();
       }}>
      <div>
        <label>Task name:</label>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={(e) => updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })}
        />
          { formData.title.trim() === "" && <p className="validation">Title required</p>}
      </div>
      <div>
        <label>Priority:</label>
        <select
          name='priority'
          value={formData.priority}
          onChange={(e) => updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
       
      </div>
      <div>
        <label>Due date:</label>
        <input
          type='date'
          name='dueDate'
          value={formData.dueDate}
          onChange={(e) => updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
          })}
        />
      </div>
      <button>Add</button>
    </form>
    
    {
      tasks.map(task => (
        <TaskCard key={task.id} {...task} onDeleteTask={() => onDeleteTask(task.id)}/>
      ))
    }
    
  </>
);


}

export default App;
