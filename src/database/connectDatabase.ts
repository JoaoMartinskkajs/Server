import mongoose from 'mongoose';
const PASSWORD = process.env.PASS;

mongoose.set("strictQuery", false);
export const ConnectionDB = mongoose.connect(`mongodb+srv://VizionBot:${PASSWORD}@cluster0.xyha1xr.mongodb.net/?retryWrites=true&w=majority`)