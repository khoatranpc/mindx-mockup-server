import { Obj } from "@/src/global/type";
import { connectToDatabase } from "@/src/lib/mongo";
import ResourceModel from "@/src/lib/mongo/models/resource";
import { middlewareApiKey } from "@/src/lib/utils";

export async function PUT(request: Request, { params }: { params: Promise<Obj> }) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey'); // Lấy API Key từ query params
        await middlewareApiKey(apiKey as string);

        const { resource, id } = await params; // Lấy resource name và id từ params
        const updatedData = await request.json(); // Lấy dữ liệu cần cập nhật từ body
        delete updatedData._id;
        // Tìm tài liệu chính dựa trên apiKey
        const userResource = await ResourceModel.findOne({ apiKeyId: apiKey });
        if (!userResource) throw new Error('Not found resource for this API key!');

        // Tìm resource cụ thể trong tài liệu
        const crrResourceIndex = userResource.resources.findIndex(
            (rc: Obj) => rc.name === resource
        );
        if (crrResourceIndex === -1) throw new Error('Not found resource!');

        // Tìm dữ liệu con dựa trên id trong resource
        const crrDataIndex = userResource.resources[crrResourceIndex].data.findIndex(
            (item: Obj) => item._id.toString() === id
        );
        if (crrDataIndex === -1) throw new Error('Not found data to update!');

        // Cập nhật dữ liệu tại vị trí đã tìm thấy
        userResource.resources[crrResourceIndex].data[crrDataIndex] = {
            ...userResource.resources[crrResourceIndex].data[crrDataIndex],
            ...updatedData, // Cập nhật các trường mới
        };

        // Lưu lại thay đổi vào database
        await userResource.save();

        return new Response(
            JSON.stringify({
                message: 'Data updated successfully!',
                data: userResource.resources[crrResourceIndex].data[crrDataIndex],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: `Something went wrong! ${error.message}`,
                data: null,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}


export async function DELETE(request: Request, { params }: { params: Promise<Obj> }) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const apiKey = searchParams.get('apiKey');
        await middlewareApiKey(apiKey as string);

        const { resource, id } = (await params);

        // Tìm resource theo apiKey và resourceName
        const userResource = await ResourceModel.findOne({ apiKeyId: apiKey });
        if (!userResource) throw new Error('Not found resource for this api key!');

        const crrResource = userResource.resources.find((rc: Obj) => rc.name.toString() === resource);
        if (!crrResource) throw new Error('Not found resource!');

        // Xóa dữ liệu trong resource
        const index = crrResource.data.findIndex((item: Obj) => item._id.toString() === id);
        if (index === -1) throw new Error('Not found data to delete!');

        crrResource.data.splice(index, 1); // Xóa dữ liệu khỏi mảng

        // Lưu lại thay đổi
        await userResource.save();

        return new Response(JSON.stringify({
            message: 'Data deleted successfully!',
        }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({
            message: `Something went wrong! ${error.message}`,
            data: null,
        }), { status: 500 });
    }
}
