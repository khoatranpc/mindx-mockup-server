import { connectToDatabase } from "@/src/lib/mongo";
import { middlewareApiKey } from "@/src/lib/utils";

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey');
        await middlewareApiKey(apiKey as string);
        return new Response(JSON.stringify({
            message: `Successfully`,
            data: searchParams,
        }), { status: 500 });
    } catch (error: any) {
        console.log("🚀 ~ POST ~ error:", error.message);
        return new Response(JSON.stringify({
            message: `Something errors! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}