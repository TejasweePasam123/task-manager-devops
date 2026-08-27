CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, completed)
VALUES
    ('Learn Linux', FALSE),
    ('Learn Docker', FALSE),
    ('Learn Kubernetes', FALSE);