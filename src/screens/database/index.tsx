'use client';
import React, { useContext } from 'react';
import { CaretRightOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, Tooltip } from 'antd';
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
                    return <div
                        className="w-[12rem] flex justify-between items-center cursor-pointer p-4 rounded-lg border border-gray-300 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                        key={item._id as string}
                    >
                        <p className="text-sm font-medium text-gray-700">{item.name}</p>
                        <div className='flex gap-[0.8rem]'>
                             <Tooltip title={'Cập nhật resource'} color='red'>
                                <Button icon={<EditOutlined />} size='small'></Button>
                            </Tooltip>
                            <Tooltip title={'Mở data'} color='red'>
                                <Button icon={<CaretRightOutlined />} size='small'></Button>
                            </Tooltip>
                        </div>
                    </div>

                })}
            </div>
        </div>
    )
}

export default DatabaseScreen;