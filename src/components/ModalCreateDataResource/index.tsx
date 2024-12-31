import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { JsonEditor, candyWrapperTheme } from 'json-edit-react';
import { toast } from 'react-toastify';
import { Modal, ModalProps } from 'antd';
import { Obj } from '@/src/global/type';
import { apiKey } from '@/src/global/init';

interface Props extends ModalProps {
    resourceName: string;
}
const ModalCreateDataResource = forwardRef((props: Props, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newData, setNewData] = useState<Obj>({});
    useImperativeHandle(ref, () => {
        return {
            handleOpen(open: boolean) {
                setOpen(open);
            }
        }
    });
    const handleCreateDataResource = async () => {
        try {
            setLoading(true);
            await axios.post(`/api/resources/${props.resourceName}?apiKey=${apiKey.value}`, { ...newData });
            setLoading(false);
            toast('Thêm dữ liệu thành công!', {
                type: 'success'
            })
        } catch (error: any) {
            setLoading(false);
            toast(`Thất bại! ${error.response?.data?.message as string}`, {
                type: 'error'
            });
        }
    }
    useEffect(() => {
        return () => {
            setNewData({});
        };
    }, [open])
    return (
        <Modal
            {...props}
            open={open}
            onCancel={() => setOpen(false)}
            okText="Save"
            onOk={() => {
                if (!Object.keys(newData).length) {
                    toast('Dữ liệu không được rỗng!', {
                        type: 'warning'
                    });
                } else {
                    handleCreateDataResource();
                }
            }}
            okButtonProps={{
                loading: loading,
                disabled: !Object.keys(newData).length
            }}
        >
            <JsonEditor
                data={newData}
                setData={(data) => {
                    setNewData(data as Obj);
                }}
                theme={candyWrapperTheme}
                enableClipboard={false}
            />
        </Modal>
    )
})

export default ModalCreateDataResource;