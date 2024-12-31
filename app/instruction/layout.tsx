import React from 'react';
import Image from 'next/image';

interface Props {
    children: React.ReactNode;
}

const InstructionLayout = (props: Props) => {
    return (
        <div className="p-[2.4rem]">
            <div className='flex justify-center'>
                <Image alt="logo" src="/logo.png" width={200} height={100} />
            </div>
            {props.children}
        </div>
    )
}

export default InstructionLayout;