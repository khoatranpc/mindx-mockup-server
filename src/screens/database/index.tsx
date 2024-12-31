'use client';
import React, { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import { Store } from '@/src/store';
import { createQuery } from '@/src/utils';
import Resources from '@/src/components/Resources';
import { apiKey } from '@/src/global/init';

const DatabaseScreen = () => {
    const { resourcesApiKey } = useContext(Store);
    const handleQuerySearch = (value: string) => {
        apiKey.value = value;
        if (value) {
            createQuery(`/api/resources?apiKey=${value}`, 'get', undefined, resourcesApiKey.set);
        }
    }
    return (
        <div className='w-[90vw] m-auto p-[2.4rem]'>
            <div className='top-function'>
                <Form
                    layout='vertical'
                >
                    <Form.Item
                        required
                        label='Api key'
                        rules={[{
                            required: true,
                        }]}
                    >
                        <div
                            className='flex gap-[2.4rem]'
                        >

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
                    </Form.Item>
                </Form>
            </div>
            <Resources />
        </div >
    )
}

export default DatabaseScreen;