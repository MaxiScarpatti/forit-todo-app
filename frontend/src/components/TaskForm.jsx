import { useState } from 'react';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (err) {
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
}
