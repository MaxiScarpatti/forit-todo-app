import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error al cargar tareas:', err));
  }, []);

  const handleTaskCreated = () => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error al actualizar tareas:', err));
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, ...updatedData } : task
        )
      );
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 bg-dark text-white">
      <div className="card p-4 shadow rounded w-100" style={{ maxWidth: '600px', marginTop: '2rem' }}>
        <h2 className="text-center mb-4">Gestor de Tareas</h2>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <hr className="border-light" />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
}
