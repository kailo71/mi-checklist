import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, Clock, X } from 'lucide-react';

const STORAGE_KEY = 'checklist_tasks';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [now, setNow] = useState(new Date());

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endTime, setEndTime] = useState('');

  // Guardar tareas cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Actualizar tiempo cada segundo
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const openNewModal = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setEndTime('');
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setEndTime(task.endTime || '');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingTask) {
      setTasks(tasks.map(t =>
        t.id === editingTask.id
          ? { ...t, title, description, endTime }
          : t
      ));
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        endTime,
        completed: false,
        createdAt: Date.now()
      };
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
  };

  const toggleComplete = (task) => {
    setTasks(tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getTimeRemaining = (endTime) => {
    if (!endTime) return null;

    const [hours, minutes] = endTime.split(':').map(Number);
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    if (target < now) {
      target.setDate(target.getDate() + 1);
    }

    const diff = target - now;
    if (diff <= 0) return { text: 'Tiempo agotado', urgent: true, expired: true };

    const totalMinutes = Math.floor(diff / 60000);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const secs = Math.floor((diff % 60000) / 1000);

    let text;
    if (hrs > 0) text = `${hrs}h ${mins}m restantes`;
    else if (mins > 0) text = `${mins}m ${secs}s restantes`;
    else text = `${secs}s restantes`;

    const urgent = totalMinutes < 60;
    return { text, urgent, expired: false };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-md mx-auto p-4 pb-24" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <header className="mb-6 pt-4">
          <h1 className="text-3xl font-bold mb-1">Mi Checklist</h1>
          <p className="text-slate-400 text-sm">
            {tasks.filter(t => t.completed).length} de {tasks.length} completadas
          </p>
        </header>

        {tasks.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Check className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No hay tareas aún</p>
            <p className="text-sm mt-1">Toca + para agregar una</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => {
              const timeInfo = getTimeRemaining(task.endTime);
              return (
                <div
                  key={task.id}
                  className={`bg-slate-800 rounded-xl p-4 border transition-all ${
                    task.completed ? 'border-slate-700 opacity-60' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleComplete(task)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-slate-500'
                      }`}
                    >
                      {task.completed && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-lg break-words ${
                        task.completed ? 'line-through text-slate-500' : ''
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm mt-1 break-words ${
                          task.completed ? 'line-through text-slate-600' : 'text-slate-400'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      {task.endTime && !task.completed && (
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          <Clock className={`w-3.5 h-3.5 ${
                            timeInfo?.urgent ? 'text-red-500' : 'text-slate-400'
                          }`} />
                          <span className="text-xs text-slate-400">
                            Termina: {task.endTime}
                          </span>
                          {timeInfo && (
                            <span className={`text-xs font-semibold ${
                              timeInfo.urgent ? 'text-red-500 animate-pulse' : 'text-slate-300'
                            }`}>
                              · {timeInfo.text}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button
                        onClick={() => openEditModal(task)}
                        className="p-2 text-slate-400 active:text-blue-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-slate-400 active:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={openNewModal}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 active:bg-blue-700 rounded-full shadow-lg flex items-center justify-center"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <Plus className="w-6 h-6" />
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-slate-800 rounded-2xl w-full max-w-md p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingTask ? 'Editar tarea' : 'Nueva tarea'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nombre principal</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Estudiar Álgebra"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles de la tarea..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Hora de término</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-700 active:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!title.trim()}
                  className="flex-1 py-2.5 rounded-lg bg-blue-500 active:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed font-semibold"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
