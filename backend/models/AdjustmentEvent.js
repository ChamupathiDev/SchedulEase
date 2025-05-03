// backend/models/AdjustmentEvent.js
import mongoose from 'mongoose';

const adjustmentEventSchema = new mongoose.Schema({
  email:        { type: String, required: true },
  score:        { type: Number, required: true },
  suggestion:   { type: String, required: true },
  timestamp:    { type: Date,   default: Date.now },
  adjustments: [
    {
      moduleId:           String,
      oldStartTime:       Date,
      oldEndTime:         Date,
      proposedStartTime:  Date,
      proposedEndTime:    Date
    }
  ]
});

export default mongoose.model('AdjustmentEvent', adjustmentEventSchema);
