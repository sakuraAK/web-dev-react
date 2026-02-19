import './App.css'
import TaskCard from './components/TaskCard/TaskCard'

const name = "Andrey";



function App() {
  return (
  <>
    <h1>{name}'s chores</h1>
    <TaskCard 
      title="Task 1" 
      dueDate="Tomorrow" 
      priority="High" 
      assignedTo="Andrey"
    />
    <TaskCard 
      title="Task 2" 
      dueDate="02-19-2026" 
      priority="Medium" 
      assignedTo="Andrey"
    />
  </>
);


}

export default App;
