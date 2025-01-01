'use client';
import { Button } from "antd";
import Link from "next/link";

export default function MainScreen() {
    return (
        <div className="p-[2.4rem]">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">

                <h1 className="text-4xl font-bold text-gray-800">
                    Chào mừng đến với MindX Mockup Server
                </h1>

                <h2 className="text-lg text-gray-600 max-w-lg">
                    Sản phẩm dành cho học viên tại MindX với mục tiêu tạo mock API data miễn phí!
                </h2>

                <p className="text-sm text-gray-500 max-w-md">
                    Sản phẩm có thể vẫn còn đang được cập nhật. Nếu như gặp lỗi, hãy liên hệ với giảng viên để được hỗ trợ.
                </p>
            </div>
            <div className="flex justify-center mt-[2.4rem] gap-[2.4rem]">
                <Link href={'/database'}><Button>Tham gia ngay</Button></Link>
                <Link href={'/instruction'}><Button>Hướng dẫn sử dụng API</Button></Link>
            </div>
        </div>
    );
}
