import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo de usuário (barbeiro)
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  times: [
    {
      time: {
        type: String,
        required: true,
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

export default mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);
