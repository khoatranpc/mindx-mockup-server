'use client';
import React from 'react';
import { Divider, Image } from 'antd';

const InstructionScreen = () => {
    const crrLocation = 'DOMAIN_APP';
    return (
        <div className="max-w-[70vw] mx-auto shadow-lg shadow-cyan-500/50 p-8 rounded-lg bg-white">
            <h1 className="text-3xl font-bold text-cyan-600 mb-4 text-center">
                Hướng Dẫn Sử Dụng API Mockup Server
            </h1>
            <p className="text-gray-700 text-center">
                Sản phẩm phục vụ cho học viên tại MindX, tạo miễn phí API với RESTful API. <br />
                <small className="text-red-500 font-semibold">Lưu ý: Sản phẩm vẫn đang trong quá trình phát triển.</small>
            </p>
            <p className="text-gray-700 text-center mt-2 font-medium">
                <strong className="text-red-500">Cảnh báo:</strong> Cần bảo mật và lưu giữ API key. Hiện chưa có tính năng cấp lại API key.
            </p>
            <Divider />

            <div className="space-y-10">
                {/* Kiểm tra resources */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">1. Kiểm tra resources</h2>
                    <p><strong>GET:</strong> <i>{crrLocation}/api/resources</i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources</i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/resources.png" preview={false} className="mt-4" />
                </section>

                {/* Tạo mới resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">2. Tạo mới một resource</h2>
                    <p><strong>POST:</strong> <i>{crrLocation}/api/resources</i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600">Dữ liệu cần được đính kèm trong body request. Trường <strong>name</strong> là <strong>bắt buộc</strong> và <strong>duy nhất</strong>.</p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources</i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/createAResource.png" preview={false} className="mt-4" />
                </section>

                {/* Cập nhật resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">3. Cập nhật resource</h2>
                    <p><strong>PUT:</strong> <i>{crrLocation}/api/resources/<strong>RESOURCE_NAME</strong></i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600">Dữ liệu cần được đính kèm trong body request. Chỉ cập nhật tên resource. Trường <strong>name</strong> phải <strong>duy nhất</strong>.</p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources/<strong>posts</strong></i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/updateResource.png" preview={false} className="mt-4" />
                </section>

                {/* Xóa resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">4. Xóa resource</h2>
                    <p><strong>DELETE:</strong> <i>{crrLocation}/api/resources/<strong>RESOURCE_NAME</strong></i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600">Khi xóa resource, mọi dữ liệu liên quan sẽ bị mất.</p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources/<strong>vacations</strong></i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/deleteResource.png" preview={false} className="mt-4" />
                </section>

                {/* Lấy dữ liệu của resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">5. Lấy dữ liệu của resource</h2>
                    <p><strong>GET:</strong> <i>{crrLocation}/api/resources/<strong>RESOURCE_NAME</strong></i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources/<strong>users</strong></i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/dataResource.png" preview={false} className="mt-4" />
                </section>

                {/* Thêm dữ liệu vào resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">6. Thêm dữ liệu vào resource</h2>
                    <p><strong>POST:</strong> <i>{crrLocation}/api/resources/<strong>RESOURCE_NAME</strong></i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600">Dữ liệu cần được đính kèm body request.</p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources/<strong>users</strong></i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/createDataInResource.png" preview={false} className="mt-4" />
                </section>

                {/* Cập nhật dữ liệu trong resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">7. Cập nhật dữ liệu cụ thể trong resource</h2>
                    <p><strong>PUT:</strong> <i>{crrLocation}/api/resources/<strong>RESOURCE_NAME</strong>/<strong>data_id</strong></i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600"><strong>data_id</strong> là trường <strong>_id</strong> của dữ liệu trong <strong>RESOURCE_NAME</strong> muốn cập nhật.</p>
                    <p className="text-gray-600">Dữ liệu cần cập nhật phải đính kèm trong body request.</p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources/<strong>users</strong>/<strong>67741f2f318519f25f0d2f14</strong></i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/updateDataResource.png" preview={false} className="mt-4" />
                </section>

                {/* Xóa dữ liệu trong resource */}
                <section className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-cyan-600 mb-2">8. Xóa dữ liệu cụ thể trong resource</h2>
                    <p><strong>DELETE:</strong> <i>{crrLocation}/api/resources/<strong>RESOURCE_NAME</strong>/<strong>data_id</strong></i><strong>?apiKey=<i>YOUR_API_KEY</i></strong></p>
                    <p className="text-gray-600"><strong>data_id</strong> là trường <strong>_id</strong> của dữ liệu trong <strong>RESOURCE_NAME</strong> muốn xóa.</p>
                    <p className="text-gray-600">Ví dụ: <i>{crrLocation}/api/resources/<strong>users</strong>/<strong>67741f2f318519f25f0d2f14</strong></i><strong>?apiKey=<i>6773c9df41d80491374de12b</i></strong></p>
                    <Image width={500} src="/deleteDataResource.png" preview={false} className="mt-4" />
                </section>
            </div>
        </div>
    );
};

export default InstructionScreen;
