import { useState } from 'react';

export default function SaveSlots() {
  const [slots, setSlots] = useState<string[]>([]);
  const [newSlot, setNewSlot] = useState<string>('');

  const handleAddSlot = () => {
    setSlots([...slots, newSlot]);
    setNewSlot('');
  };

  const handleSaveSlots = async () => {
    try {
      const response = await fetch('/api/salvar-horario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slots }),
      });

      if (response.ok) {
        console.log('Horários salvos com sucesso!');
      } else {
        console.error('Erro ao salvar horários.');
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={newSlot}
        onChange={(e) => setNewSlot(e.target.value)}
      />
      <button onClick={handleAddSlot}>Adicionar Horário</button>

      <ul>
        {slots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>

      <button onClick={handleSaveSlots}>Salvar Horários</button>
    </div>
  );
}
