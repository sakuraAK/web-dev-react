import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";


function HomePage({tasks, addTask, onDeleteTask}) {

    return (
        <>
            <h1>Hello below are your tasks:</h1>
            <TaskForm addTask={addTask}/>  
            <TaskList tasks={tasks} onDeleteTask={onDeleteTask}/>
        </>
       
    );
}

export default HomePage;