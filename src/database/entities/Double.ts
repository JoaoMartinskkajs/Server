import mongoose, { Schema } from 'mongoose';

const Double = new Schema({
    enter: String,
    after: String,
    result: Object,
    hour: String,
    date: String,
    gale: String
});

export default mongoose.model("Doubles", Double)