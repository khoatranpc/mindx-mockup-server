import React, { useContext, useRef, useState } from 'react'
import { Button, Empty } from 'antd';
import { Obj } from '@/src/global/type';
import { Store } from '@/src/store';
import Resource from '../Resource';
import { FileAddOutlined, LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ModalResource from '../ModalResource';
import ResourceData from '../ResourceData';
import ModalCreateDataResource from '../ModalCreateDataResource';

const Resources = () => {
    const modalRef = useRef(null);

    const modalCreateDataResource = useRef(null);
    const { resourcesApiKey, resourceDatas } = useContext(Store);
    const [crrNameResource, setNameResource] = useState<string>('');
    const getListResource = ((resourcesApiKey.value?.data as Obj)?.resources as Obj[]) ?? [];
    const handleModal = (open: boolean) => {
        (modalRef.current as unknown as Obj)?.handleModal(open);
    }
    return (
        <div className='listResource mt-[2.4rem]'>
            <div className='mb-[2.4rem] flex justify-between items-center'>
                <p>Danh sách Resource</p>
                <Button
                    type='primary'
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                        handleModal(true);
                    }}
                    disabled={!resourcesApiKey.value.data}
                >
                    Tạo resource
                </Button>
            </div>
            <ModalResource
                typeQuery='create'
                title="Tạo resource"
                ref={modalRef}
            />
            <div className='flex gap-[1rem] listResource'>
                <div>
                    {getListResource.length ? getListResource.map((item: Obj) => {
                        return <Resource active={crrNameResource===item.name} handleClickResource={(name) => {
                            setNameResource(name);
                        }} resource={item} key={item._id as string} />
                    }) : <Empty description={'Không có resources'}/>}
                </div>
                <div className='listData relative flex-1'>
                    {crrNameResource &&
                        <div className='absolute w-full bg-white z-[99999] top-[-1rem] text-right'>
                            <span><b>{resourceDatas.value.data?.data?.length}</b> <small>bản ghi dữ liệu</small></span>
                            <Button onClick={() => {
                                (modalCreateDataResource.current as unknown as Obj).handleOpen(true);
                            }} className='ml-[1rem]' icon={<FileAddOutlined />}>Tạo dữ liệu - <b>{crrNameResource}</b></Button>
                        </div>
                    }
                    <div className='pt-[2.4rem] overflow-auto h-[80vh] relative'>
                        {resourceDatas.value.isLoading ? <LoadingOutlined className='absolute top-1/2 left-1/2' /> : (
                            resourceDatas.value.data?.data?.length && crrNameResource ? (
                                <div>
                                    {resourceDatas.value.data?.data?.map((data: Obj) => {
                                        return <ResourceData resourceName={crrNameResource} data={data} key={data._id as string} />
                                    })}
                                </div>
                            ) : <Empty description={'Không có dữ liệu của resource'}/>
                        )}
                    </div>
                </div>
                <ModalCreateDataResource
                    title={`Thêm dữ liệu resource ${crrNameResource}`}
                    ref={modalCreateDataResource}
                    resourceName={crrNameResource} />
            </div>
        </div>
    )
}

export default Resources