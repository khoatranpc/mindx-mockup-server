import mongoose from "mongoose";
import DBCollections from "../common";

const schema = new mongoose.Schema({

}, {
    timestamps: true
});


const ApiKeyModel = mongoose.model(DBCollections.apiKey, schema);

export default ApiKeyModel;