import { Obj } from "@/src/global/type";
import { connectToDatabase } from "@/src/lib/mongo";
import ResourceModel from "@/src/lib/mongo/models/resource";
import { middlewareApiKey } from "@/src/lib/utils";
import mongoose from "mongoose";

export async function GET(request: Request, { params }: { params: Promise<Obj> }) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey');
        await middlewareApiKey(apiKey as string);
        const resourceName = (await params).resource as string;
        const userResource = await ResourceModel.findOne({
            apiKeyId: apiKey
        });
        if (!userResource) throw new Error('Not found resource for this api key!');
        const crrResource = userResource.resources.find((resource: Obj) => resource.name === resourceName);
        if (!crrResource) throw new Error('Not found resource!');
        return new Response(JSON.stringify({
            message: `Successfully`,
            data: crrResource,
        }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({
            message: `Something went wrong! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}
export async function POST(request: Request, { params }: { params: Promise<Obj> }) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey');
        await middlewareApiKey(apiKey as string);

        const resourceName = (await params).resource as string;
        const newData = await request.json(); // Lấy dữ liệu từ body

        // Tìm resource theo apiKey và resourceName
        const userResource = await ResourceModel.findOne({ apiKeyId: apiKey });
        if (!userResource) throw new Error('Not found resource for this api key!');

        const crrResource = userResource.resources.find((resource: Obj) => resource.name === resourceName);
        if (!crrResource) throw new Error('Not found resource!');
        const newObjectId = new mongoose.Types.ObjectId();
        // Thêm dữ liệu mới vào resource
        const createdData = {
            ...newData,
            _id: newObjectId
        };
        crrResource.data.push(createdData);

        // Lưu lại thay đổi
        await userResource.save();

        return new Response(JSON.stringify({
            message: 'Data added successfully!',
            data: createdData,
        }), { status: 201 });
    } catch (error: any) {
        return new Response(JSON.stringify({
            message: `Something went wrong! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}