import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";


function HomePage() {
    return (
        <>
            <h1>Hello below are your tasks:</h1>
            <TaskForm/>  
            <TaskList/>
        </>
    );
}

export default HomePage;