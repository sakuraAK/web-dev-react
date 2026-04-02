import { useContext } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css'
import TaskContext from '../../context/TaskContext';

function TaskList() {
    const { tasks } = useContext(TaskContext);
    return (
        <>
            {
                tasks.map(task => (
                    <TaskCard key={task.id} {...task} />
                ))
            }
        </>
    );
}


export default TaskList;