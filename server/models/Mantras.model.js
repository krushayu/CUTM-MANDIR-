import mongoose from 'mongoose';

const mantrasSchema = new mongoose.Schema({
  sanskrit: {
    type: String,
    required: true,
    trim: true
  },
  hindi_meaning: {
    type: String,
    trim: true
  },
  english_meaning: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Venkateswara",
      "Sri Vidya",
      "Vishnu",
      "Lakshmi",
      "Shiva",
      "Durga",
      "Narayana",
      "Balaji",
      "Trimurti",
      "Ganesha",
      "Saraswati",
      "Krishna",
      "Rama",
      "Hanuman",
      "Subramanya",
      "Narasimha",
      "Dhanvantari",
      "Surya",
      "Ganga",
      "Annapurna",
      "Navagraha",
      "Sastha/Ayyappa",
      "General"
    ],
    default: "General"
  }
}, {
  timestamps: true
});

// Text search index
mantrasSchema.index({
  sanskrit: "text",
  hindi_meaning: "text",
  english_meaning: "text",
  category: "text"
});

export default mongoose.model("mantras", mantrasSchema);
