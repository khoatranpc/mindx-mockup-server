'use client';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import { Store } from '@/src/store';
import { createQuery } from '@/src/utils';
import Resources from '@/src/components/Resources';
import { apiKey } from '@/src/global/init';

const DatabaseScreen = () => {
    const { resourcesApiKey } = useContext(Store);
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [loadingCreateNewApiKey, setLoadingCreateNewApiKey] = useState(false);
    const handleQuerySearch = (value: string) => {
        apiKey.value = value;
        localStorage.setItem('apiKey', value);
        if (value) {
            createQuery(`/api/resources?apiKey=${value}`, 'get', undefined, resourcesApiKey.set, (data, error) => {
                if (error) {
                    toast(error.message, {
                        type: 'error'
                    });
                }
            });
        }
    }
    const handleCreateNewApiKey = async () => {
        try {
            setLoadingCreateNewApiKey(true);
            const data = await axios.post(`/api/sign-up-key`);
            setApiKeyInput(data.data.data as string);
            setLoadingCreateNewApiKey(false);
            toast(`Tạo Api key thành công! ${data.data.message}`, {
                type: 'success'
            });
        } catch (error: any) {
            setLoadingCreateNewApiKey(false);
            toast(`Thất bại! ${error.response?.data?.message as string}`, {
                type: 'error'
            });
        }
    };
    useEffect(() => {
        setApiKeyInput(localStorage?.getItem('apiKey') ?? '');
    }, []);
    return (
        <div className='w-[90vw] m-auto p-[2.4rem]'>
            <div className='top-function'>
                <Form
                    layout='vertical'
                    initialValues={{
                        apiKey: apiKeyInput
                    }}
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
                            <div className='flex flex-col'>
                                <Input.Search
                                    disabled={resourcesApiKey.value.isLoading}
                                    loading={resourcesApiKey.value.isLoading}
                                    name='apiKey'
                                    value={apiKeyInput}
                                    onChange={(e) => {
                                        setApiKeyInput(e.target.value as string);
                                    }}
                                    onSearch={handleQuerySearch}
                                    placeholder='Nhập api key'
                                    className='w-[30rem!important]'
                                />
                                {resourcesApiKey.value?.message}
                            </div>
                            <Tooltip title="Tạo api key mới nếu bạn chưa có!" color='red' trigger={['hover']}>
                                <Button loading={loadingCreateNewApiKey} icon={<PlusOutlined />} onClick={() => {
                                    handleCreateNewApiKey();
                                }}>Tạo api key</Button>
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