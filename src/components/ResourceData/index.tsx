import React, { useState } from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { JsonEditor, candyWrapperTheme } from 'json-edit-react';
import { Obj } from '@/src/global/type';
import { apiKey } from '@/src/global/init';

interface Props {
    data: Obj;
    resourceName: string;
}

const ResourceData = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const mapData = {
        ...props.data
    }
    delete mapData._id;
    const [data, setData] = useState<Obj>(mapData);
    const handleSave = async () => {
        try {
            setLoading(true);
            await axios.put(`/api/resources/${props.resourceName}/${props.data._id as string}?apiKey=${apiKey.value}`, data);
            setLoading(false);
            toast('Cập nhật dữ liệu thành công!', {
                type: 'success'
            })
        } catch (error: any) {
            setLoading(false);
            toast(`Thất bại! ${error.response?.data?.message as string}`, {
                type: 'error'
            });
        }
    }
    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/resources/${props.resourceName}/${props.data._id as string}?apiKey=${apiKey.value}`);
            setLoading(false);
            toast('Xoá dữ liệu thành công!', {
                type: 'success'
            })
        } catch (error: any) {
            setLoading(false);
            toast(`Thất bại! ${error.response?.data?.message as string}`, {
                type: 'error'
            });
        }
    }
    return (
        <div className='relative mb-[1rem]'>
            <div className='absolute z-50 top-[0.8rem] right-[0.8rem] flex gap-[1rem]'>
                <Popconfirm
                    title={'Xoá dữ liệu này!'}
                    onConfirm={handleDelete}
                    okButtonProps={{
                        loading
                    }}
                >
                    <Button icon={<DeleteOutlined className='text-red-500' />} />
                </Popconfirm>
                <Tooltip title="Lưu" color='red'>
                    <Button loading={loading} type='primary' icon={<SaveOutlined />} onClick={handleSave} />
                </Tooltip>
            </div>
            <JsonEditor
                setData={(data) => {
                    setData(data as Obj);
                }}
                data={data}
                theme={candyWrapperTheme}
                enableClipboard={false}
            />
        </div>
    )
}

export default ResourceData;