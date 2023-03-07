import mongoose, { Schema } from 'mongoose';

const Double = new Schema({
    enter: String,
    after: String,
    result: Object,
    hour: String,
    date: String
});

export default mongoose.model("Doubles", Double)