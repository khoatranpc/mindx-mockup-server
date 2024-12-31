import { Obj } from "@/src/global/type";
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
        }, {
            resources: {
                data: 0
            }
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

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey'); // Lấy API Key từ query params
        await middlewareApiKey(apiKey as string); // Xác thực API Key

        const body = await request.json(); // Lấy dữ liệu từ body request
        const { name } = body; // Lấy các trường cần thiết từ body

        if (!name) {
            throw new Error('Missing required field: name');
        }

        // Tìm tài liệu theo API key
        const userResource = await ResourceModel.findOne({ apiKeyId: apiKey });
        if (!userResource) throw new Error('Not found resource for this API key!');

        // Kiểm tra xem `name` có trùng lặp không
        const isNameExist = userResource.resources.some((resource: Obj) => resource.name === name);
        if (isNameExist) {
            throw new Error(`Resource with name "${name}" already exists`);
        }

        // Thêm resource mới vào danh sách resources
        userResource.resources.push({
            name,
            data: [], // Mặc định mảng `data` rỗng cho resource mới
        });

        // Lưu thay đổi vào cơ sở dữ liệu
        await userResource.save();

        return new Response(JSON.stringify({
            message: 'Resource created successfully!',
            data: {
                name,
            },
        }), { status: 201 });
    } catch (error: any) {
        console.log("🚀 ~ POST ~ error:", error.message);
        return new Response(JSON.stringify({
            message: `Something went wrong! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}

