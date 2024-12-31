'use client';
import React, { useContext, useRef } from 'react';
import { CaretRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { toast } from 'react-toastify';
import { Obj } from '@/src/global/type';
import ModalResource from '../ModalResource';
import { createQuery } from '@/src/utils';
import { apiKey } from '@/src/global/init';
import { Store } from '@/src/store';

interface Props {
    resource?: Obj;
    handleClickResource?: (resourceName: string) => void;
    active?: boolean;
}

const Resource = (props: Props) => {
    const modalRef = useRef(null);
    const handleOpenModalUpdate = (open: boolean) => {
        (modalRef.current as unknown as Obj)?.handleModal(open);
    }
    const { deleteResource, resourceDatas } = useContext(Store);
    const handleDeleteResource = () => {
        createQuery(`/api/resources/${props.resource?.name}?apiKey=${apiKey.value}`, 'delete', undefined, deleteResource.set, (data, error) => {
            if (data) {
                toast('Xoá resource thành công!', {
                    type: 'success'
                });
                handleOpenModalUpdate(false);
            } else if (error) {
                toast(error.message, {
                    type: 'error'
                });
            }
        });
    }
    const handleQueryResourceDatas = () => {
        props.handleClickResource?.(props.resource?.name);
        createQuery(`/api/resources/${props.resource?.name}?apiKey=${apiKey.value}`, 'get', undefined, resourceDatas.set, (data, error) => {
            if (error) {
                toast(error.message, {
                    type: 'error'
                });
            }
        });
    }

    return (
        <div
            className="w-[17rem] mb-[1rem] flex justify-between items-start p-4 rounded-lg border border-gray-300 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            style={{
                background: props.active ? '#f2ebfa' : ''
            }}
        >
            <p className="text-sm flex flex-col font-medium text-gray-700">
                <span><b>{props.resource?.name}</b></span>
                <span className='text-gray-400 mt-[1rem] cursor-pointer hover:text-blue-500' onClick={() => {
                    window.open(`/api/resources/${props.resource?.name}?apiKey=${apiKey.value}`, '_blank');
                }}>
                    /api/resources/{props.resource?.name}
                </span>
            </p>
            <div className='flex gap-[0.8rem]'>
                <Tooltip title={'Cập nhật resource'} color='red'>
                    <Button icon={<EditOutlined />} size='small' onClick={() => {
                        handleOpenModalUpdate(true);
                    }}></Button>
                </Tooltip>
                <Tooltip title={'Mở data'} color='red'>
                    <Button icon={<CaretRightOutlined />} size='small' onClick={handleQueryResourceDatas}></Button>
                </Tooltip>
            </div>
            <ModalResource
                typeQuery='update'
                title={<div>
                    <Popconfirm
                        title="Xoá resource?"
                        description="Mọi dữ liệu của bạn sẽ bị mất và không thể hoàn tác!"
                        onConfirm={() => {
                            handleDeleteResource();
                        }}
                        okButtonProps={{
                            loading: deleteResource.value.isLoading
                        }}
                    >
                        <Button className='bg-[#b61111!important] border-0' icon={<DeleteOutlined className='text-[white]' />} />
                    </Popconfirm>
                </div>}
                ref={modalRef}
                resource={props.resource}
            />
        </div>
    )
}

export default Resource;