import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css'

function TaskList({ tasks, onDeleteTask }) {
    return (
        <>
            {
                tasks.map(task => (
                    <TaskCard key={task.id} {...task} onDeleteTask={() => onDeleteTask(task.id)} />
                ))
            }
        </>
    );
}


export default TaskList;