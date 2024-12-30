'use client';
import React, { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import { Store } from '@/src/store';
import { createQuery } from '@/src/utils';
import { Obj } from '@/src/global/type';

const DatabaseScreen = () => {
    const { resourcesApiKey } = useContext(Store);
    console.log("🚀 ~ DatabaseScreen ~ resourcesApiKey:", resourcesApiKey)
    const getListResource = ((resourcesApiKey.value?.data as Obj)?.resources as Obj[]) ?? [];
    const handleQuerySearch = (value: string) => {
        createQuery(`/api/resources?apiKey=${value}`, 'get', undefined, resourcesApiKey.set);
    }
    return (
        <div className='w-[90vw] m-auto p-[2.4rem]'>
            <div className='top-function flex items-center gap-[2.4rem]'>
                <Input.Search
                    disabled={resourcesApiKey.value.isLoading}
                    loading={resourcesApiKey.value.isLoading}
                    name='apiKey'
                    onSearch={handleQuerySearch}
                    placeholder='Nhập api key'
                    className='w-[30rem!important]'
                />
                <Tooltip title="Tạo api key mới nếu bạn chưa có!" color='red' trigger={['hover']}>
                    <Button icon={<PlusOutlined />}>Tạo api key</Button>
                </Tooltip>
            </div>
            <div className='listResource mt-[2.4rem]'>
                <p>Danh sách Resource</p>
                {getListResource.map((item: Obj) => {
                    return <Button key={item._id as string}>{item.name}</Button>
                })}
            </div>
        </div>
    )
}

export default DatabaseScreen;