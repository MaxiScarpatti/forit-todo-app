import TaskItem from './TaskItem';
export default function TaskList({ tasks, onDelete, onUpdate }) {
  if (!tasks.length) return <p>No hay tareas aún 💤</p>;

  return (
    <div className="mt-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}