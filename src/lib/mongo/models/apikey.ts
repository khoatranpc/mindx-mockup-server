import mongoose from "mongoose";
import DBCollections from "../common";

const schema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


const ApiKeyModel = mongoose.model(DBCollections.apiKeys, schema);

export default ApiKeyModel;