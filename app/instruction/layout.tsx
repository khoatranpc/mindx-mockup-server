import React from 'react';
import Image from 'next/image';

interface Props {
    children: React.ReactNode;
}

const InstructionLayout = (props: Props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default InstructionLayout;