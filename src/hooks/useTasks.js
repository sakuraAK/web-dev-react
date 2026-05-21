import { useState, useEffect, useReducer } from "react";



/**
 * useTasks - Custom hook for managing task CRUD operations
 * 
 *  Handles:
 *  - Fetching tasks from API on load
 *  - Adding new tasks
 *  - Deleting tasks
 *  - Loading and error state 
 *  
 * @returns {Object} { tasks, loading, error, addTask, onDeleteTask}
 *   
 */

const initialState = {
    tasks: [],
    loading: true,
    error: null,
}

const ActionType = Object.freeze({
    FETCH_START: 'FETCH_START',
    ADD_TASK_START: 'ADD_TASK_START',
    DELETE_TASK_START: 'DELETE_TASK_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS', 
    FETCH_ERROR: 'FETCH_ERROR',
    ADD_TASK_ERROR: 'ADD_TASK_ERROR',
    DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
    ADD_TASK_SUCCESS: 'ADD_TASK_SUCCESS',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    UPDATE_TASK_START: 'UPDATE_TASK_START',
    UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
    UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',

});

function taskReducer(state, action) {
    switch(action.type) {
        case ActionType.FETCH_START:
        case 'ADD_TASK_START':
        case 'DELETE_TASK_START':
        case ActionType.UPDATE_TASK_START:
            return {...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, tasks: action.payload, loading: false, error: null };
        case 'FETCH_ERROR':
        case 'ADD_TASK_ERROR':
        case 'DELETE_TASK_ERROR':
        case ActionType.UPDATE_TASK_ERROR:
            return { ...state,  error: action.payload, loading: false };
        case 'ADD_TASK_SUCCESS':
            return { ...state, tasks: [...state.tasks, action.payload], loading: false, error: null };
        case 'DELETE_TASK_SUCCESS':
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload), loading: false, error: null };
        case ActionType.UPDATE_TASK_SUCCESS:
            return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t), loading: false, error: null};

        default:
            return state;

    }
}


export function useTasks() {

    const [state, dispatch] = useReducer(taskReducer, initialState);

    //Fetch tasks on load
    useEffect(() => {
        const fetchTasks = async () => {
            dispatch({type: 'FETCH_START'});
            try {
                const repsonse = await fetch("http://localhost:3000/tasks");
                if (!repsonse.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data = await repsonse.json();
                dispatch({type: 'FETCH_SUCCESS', payload: data.tasks });
            }
            catch(err) {
                dispatch({ type: 'FETCH_ERROR', paload: "Failed to load tasks: " + err.message });
            }
        };

        fetchTasks();

    }
    , []);


    //Add new task
    const addTask = (formData) => {

        if(formData.title.trim() === "") {
            return;
        }

        const newTask = {
            title: formData.title,
            priority: formData.priority,
            dueDate: formData.dueDate,
        };

        dispatch({type: 'ADD_TASK_START'});
        fetch("http://localhost:3000/tasks", 
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            }
        ).then((repsonse) => {
            if(!repsonse.ok)
                throw new Error("Unable to create a new task");
            return repsonse.json();
        }).then((data) => {
            dispatch({type: 'ADD_TASK_SUCCESS', payload: data.task });
        }).catch((err) => {
            dispatch({type: 'ADD_TASK_ERROR', payload: "Failed to create new task: " + err.message });
        });

    };

    //Delete task

    const onDeleteTask = (id) => {

        dispatch({type: 'DELETE_TASK_START'});
        fetch(`http://localhost:3000/tasks/${id}`, 
            {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            }
        ).then((repsonse) => {
            if(!repsonse.ok)
                throw new Error("Unable to delete task");
            return repsonse.json();
        }).then((data) => {
            dispatch({type: 'DELETE_TASK_SUCCESS', payload: data.task.id});
        }).catch((err) => {
            dispatch({type: 'DELETE_TASK_ERROR', payload: "Failed to delete task: " + err.message});
        });

    };

    const updateTask = (id, formData) => {
       
        if(formData.title.trim() === "") {
            return;
        }

        const updatedTask = {
            title: formData.title,
            priority: formData.priority,
            dueDate: formData.dueDate,
        }

        dispatch({ type: ActionType.UPDATE_TASK_START } );
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask), 
        }).then((repsonse) => {
            if(!repsonse.ok)
                throw new Error("Unable to update task");
            return repsonse.json();
        }).then((data) => {
            dispatch({type: ActionType.UPDATE_TASK_SUCCESS, payload: data.task});
        }).catch((err) => {
            dispatch({type: ActionType.UPDATE_TASK_ERROR, payload: "Failed to update task: " + err.message});
        });
    };

    return {
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        addTask,
        onDeleteTask,
        updateTask,
    };

}

