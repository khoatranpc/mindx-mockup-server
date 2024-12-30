import { connectToDatabase } from "@/src/lib/mongo";
import ResourceModel from "@/src/lib/mongo/models/resource";
import { middlewareApiKey } from "@/src/lib/utils";

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey');
        await middlewareApiKey(apiKey as string);
        const resources = await ResourceModel.findOne({
            apiKeyId: apiKey
        })
        return new Response(JSON.stringify({
            message: `Successfully`,
            data: resources,
        }), { status: 200 });
    } catch (error: any) {
        console.log("🚀 ~ POST ~ error:", error.message);
        return new Response(JSON.stringify({
            message: `Something went wrong! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}