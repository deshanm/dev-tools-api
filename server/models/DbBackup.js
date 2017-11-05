import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DbBackupSchema = new Schema(
  {
    database_id: { type: String, required: true, trim: true },
    database_type: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    status: { type: Number, min: 0, max: 4 },
    by: { type: String },
    file_name: { type: String },
    file_size: { type: String },
    file_birth: { type: String },
  },
  {
    timestamps: true,
  }
);
const DbBackup = mongoose.model('DbBackup', DbBackupSchema);
export default DbBackup;
