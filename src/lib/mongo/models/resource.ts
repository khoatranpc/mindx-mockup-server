import mongoose from "mongoose";
import DBCollections from "../common";

const schema = new mongoose.Schema({
    apiKeyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: DBCollections.apiKeys
    },
    resources: [
        {
            name: {
                type: String,
                required: true,
                unique: true
            },
            data: [Object]
        }
    ]
}, {
    timestamps: true,
    _id: true
});


const ResourceModel = mongoose.model(DBCollections.resources, schema);

export default ResourceModel;