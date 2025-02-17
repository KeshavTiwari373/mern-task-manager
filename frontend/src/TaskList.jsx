import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask) return;
    const res = await axios.post("http://localhost:5000/api/tasks", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  const toggleTask = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(task => (task.id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => toggleTask(task.id, task.completed)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
