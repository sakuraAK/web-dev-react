import { useState } from 'react';
import './App.css'
import './components/TaskCard/TaskCard.css'


const name = "Andrey";


function App() {

  const [tasks, updateTasks] =  useState([]);
  const [formData, updateFormData] = useState({
    title: "",
    priority: "High",
    dueDate: "",
  });

 

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
          type='text'
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
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.priority}</p>
          <p>{task.dueDate}</p>
        </div>
      ))
    }
    
  </>
);


}

export default App;
