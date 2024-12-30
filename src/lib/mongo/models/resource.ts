import mongoose from "mongoose";
import DBCollections from "../common";

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    data: [Object]
}, {
    timestamps: true,
    _id: true
})

const schema = new mongoose.Schema({
    apiKeyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: DBCollections.apiKeys
    },
    resources: [resourceSchema]
}, {
    timestamps: true,
    _id: true
});


const ResourceModel = mongoose.models[DBCollections.resources] || mongoose.model(DBCollections.resources, schema);

export default ResourceModel;