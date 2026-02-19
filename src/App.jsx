import './App.css'
import TaskCard from './components/TaskCard/TaskCard'

const name = "Andrey";

const tasks = [
  {
    title: "Task 1",
    dueDate: "Tomrrow",
    priority: "High",
    assignedTo: "Andrey",
    status: "Pending",
  },
   {
    title: "Task 2",
    dueDate: "Tomrrow",
    priority: "High",
    assignedTo: "Andrey",
    status: "Pending",
  },
   {
    title: "Task 3",
    dueDate: "Tomrrow",
    priority: "High",
    assignedTo: "Andrey",
    status: "Pending",
  },
];

function App() {

  return (
  <>
    <h1>Hello {name} below are your tasks:</h1>
    {
      tasks.map((task) => (
        <TaskCard
          {...task}
          key={task.title}
          // title={task.title}
          // dueDate={task.dueDate}
          // priority={task.priority}
          // assignedTo={task.assignedTo}
        />
      )

      )
    }
    
  </>
);


}

export default App;
