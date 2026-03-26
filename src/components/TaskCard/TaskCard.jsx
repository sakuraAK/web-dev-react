//import './TaskCard.css'
import { Link } from  "react-router-dom"

// function TaskCard(props) {
//     return (<div>
//         <h3 className={props.priority === "High" ? "prio-text" : ""}>{props.title}</h3>
//         <p>Due: {props.dueDate}</p>
//         <p>Priority: {props.priority}</p>
//         <p>Assigned to: {props.assignedTo}</p>
//         <p>Status: {props.status}</p>
//     </div>);
// }


//Alternative syntax to read props:

function TaskCard({id, title, dueDate, priority, onDeleteTask}) {
    return (<div className="task-item">
        <h3>{title}</h3>
        <span className={`task-priority ${priority.toLowerCase()}`}>{priority}</span>
        {dueDate && <p>Due Date: {dueDate}</p>}
        <p><Link to={`/tasks/${id}`}>View Details</Link></p>
        <button onClick={onDeleteTask}>Delete</button>
    </div>);
}




export default TaskCard;