const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Health check endpoint
// Used by Kubernetes readiness and liveness probes
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});


// PostgreSQL connection
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Get all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});


// Create a new task
app.post("/api/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
            [title]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            error: "Failed to create task"
        });
    }
});


// Update a task
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const result = await pool.query(
            `UPDATE tasks
             SET title = COALESCE($1, title),
                 completed = COALESCE($2, completed)
             WHERE id = $3
             RETURNING *`,
            [title, completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            error: "Failed to update task"
        });
    }
});


// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            error: "Failed to delete task"
        });
    }
});


// Start the server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Backend server running on http://localhost:${PORT}`
    );
});