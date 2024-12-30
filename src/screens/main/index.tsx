'use client';
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function MainScreen() {
    return (
        <div className="p-[2.4rem]">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                {/* Logo */}
                <Image alt="logo" src="/logo.png" width={200} height={100} />

                {/* Tiêu đề chính */}
                <h1 className="text-4xl font-bold text-gray-800">
                    Chào mừng đến với MindX Mockup Server
                </h1>

                {/* Mô tả */}
                <h2 className="text-lg text-gray-600 max-w-lg">
                    Sản phẩm dành cho học viên tại MindX với mục tiêu tạo mock API data miễn phí!
                </h2>

                {/* Ghi chú */}
                <p className="text-sm text-gray-500 max-w-md">
                    Sản phẩm có thể vẫn còn đang được cập nhật. Nếu như gặp lỗi, hãy liên hệ với giảng viên để được hỗ trợ.
                </p>
            </div>
            <div className="flex justify-center mt-[2.4rem] gap-[2.4rem]">
                <Link href={'/database'}><Button>Tham gia ngay</Button></Link>
                <Button>Hướng dẫn sử dụng</Button>
            </div>
        </div>
    );
}
