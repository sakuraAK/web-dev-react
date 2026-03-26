import { useParams } from "react-router-dom";

function TaskDetail() {

    const { id } = useParams();

    return (
        <h2>Task ID: {id}</h2>
    );
}

export default TaskDetail;