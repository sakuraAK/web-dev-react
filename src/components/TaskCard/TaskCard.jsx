import './TaskCard.css'

function TaskCard(props) {
    return (<div>
        <h3 className={props.priority === "High" ? "prio-text" : ""}>{props.title}</h3>
        <p>Due: {props.dueDate}</p>
        <p>Priority: {props.priority}</p>
        <p>Assigned to: {props.assignedTo}</p>
        <p>Status: {props.status}</p>
    </div>);
}


//Alternative syntax to read props:

// function TaskCard({title, dueDate, priority}) {
//     return (<div>
//         <h3>{title}</h3>
//         <p>Due: {dueDate}</p>
//         <p>Priority: {priority}</p>
//     </div>);
// }




export default TaskCard;