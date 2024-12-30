import ApiKeyModel from "./mongo/models/apikey";

const middlewareApiKey = async (apiKeyId: string) => {
    if (!apiKeyId) throw new Error('apiKey is missing!')
    const findApiKey = await ApiKeyModel.findById(apiKeyId);
    if (!findApiKey) throw new Error('apiKey is invalid!')
}


export {
    middlewareApiKey
}