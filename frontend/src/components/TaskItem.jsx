import { useState } from 'react';

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title || '');
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      completed: task.completed,
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(task.id, {
      ...task,
      completed: !task.completed,
    });
  };

  return (
    <div className={`card mb-3 shadow-sm ${task.completed ? 'border-success' : ''}`}>
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <button type="submit" className="btn btn-success btn-sm me-2">Guardar</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        ) : (
          <>
            <h5 className={`card-title ${task.completed ? 'text-success text-decoration-line-through' : ''}`}>
              {task.title}
            </h5>
            <p className={`card-text ${task.completed ? 'text-decoration-line-through' : ''}`}>
              {task.description || 'Sin descripción'}
            </p>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                id={`check-${task.id}`}
              />
              <label className="form-check-label" htmlFor={`check-${task.id}`}>
                {task.completed ? 'Completada' : 'Incompleta'}
              </label>
            </div>
            <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>Eliminar</button>
          </>
        )}
      </div>
    </div>
  );
}
