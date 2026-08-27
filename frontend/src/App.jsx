import { useEffect, useState } from "react";
import "./App.css";

//const API_URL = "http://localhost:5000/api/tasks";
const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    // Get tasks from backend
    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    // Run when the page loads
    useEffect(() => {
        fetchTasks();
    }, []);

    // Create a task
    const addTask = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title
                })
            });

            const newTask = await response.json();

            setTasks([...tasks, newTask]);
            setTitle("");
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    // Toggle task completion
    const toggleTask = async (task) => {
        try {
            const response = await fetch(`${API_URL}/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !task.completed
                })
            });

            const updatedTask = await response.json();

            setTasks(
                tasks.map((item) =>
                    item.id === updatedTask.id ? updatedTask : item
                )
            );
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    return (
        <div className="app">
            <div className="container">
                <h1>Task Manager</h1>

                <form onSubmit={addTask} className="task-form">
                    <input
                        type="text"
                        placeholder="Enter a new task"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <button type="submit">
                        Add Task
                    </button>
                </form>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <div className="task-list">
                        {tasks.length === 0 ? (
                            <p>No tasks found.</p>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    className={`task ${
                                        task.completed ? "completed" : ""
                                    }`}
                                    key={task.id}
                                >
                                    <span>
                                        {task.title}
                                    </span>

                                    <div className="actions">
                                        <button
                                            onClick={() => toggleTask(task)}
                                        >
                                            {task.completed
                                                ? "Undo"
                                                : "Complete"}
                                        </button>

                                        <button
                                            onClick={() => deleteTask(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;