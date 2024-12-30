import { connectToDatabase } from "@/src/lib/mongo";
import ApiKeyModel from "@/src/lib/mongo/models/apikey";
import ResourceModel from "@/src/lib/mongo/models/resource";

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const createdApiKey = await ApiKeyModel.create({});
        await ResourceModel.create({
            apiKeyId: createdApiKey._id,
            resources: []
        });
        return new Response(JSON.stringify({
            message: "API key Created successfully, save it pls (^_^). This server is provided for MindX's Students, We can store your data for 5 months, after which all your data will be deleted!",
            data: createdApiKey._id,
        }), { status: 201 });
    } catch (error: any) {
        console.log("🚀 ~ POST ~ error:", error.message);
        return new Response(JSON.stringify({
            message: `Something errors! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}
