import ApiKeyModel from "@/src/lib/mongo/models/apikey";

export async function POST(request: Request) {
    try {
        const createdApiKey = await ApiKeyModel.create({});
        return new Response(JSON.stringify({
            message: "API key Created successfully, save it pls (^_^). This server is provided for MindX's Students, We can store your data for 5 months, after which all your data will be deleted!",
            data: createdApiKey._id,
        }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Some errors!',
            data: null,
        }), { status: 500 });
    }
}
