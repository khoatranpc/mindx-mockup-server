import { connectToDatabase } from "./mongo";
import ApiKeyModel from "./mongo/models/apikey";

const middlewareApiKey = async (apiKeyId: string) => {
    if (!apiKeyId) throw new Error('apiKey is missing!')
    await connectToDatabase();
    const findApiKey = await ApiKeyModel.findById(apiKeyId);
    if (!findApiKey) throw new Error('apiKey is invalid!')
}


export {
    middlewareApiKey
}