import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input, Modal, ModalProps } from 'antd';
import { Obj } from '@/src/global/type';
import { Store } from '@/src/store';
import { createQuery } from '@/src/utils';
import { apiKey } from '@/src/global/init';



interface Props extends ModalProps {
    typeQuery: 'create' | 'update' | 'delete';
    resource?: Obj;
}

const ModalResource = forwardRef((props: Props, ref) => {
    const [open, setOpen] = useState(false);
    const { createNewResource, updateResource } = useContext(Store);
    useImperativeHandle(ref, () => {
        return {
            handleModal(open: boolean) {
                setOpen(open);
            }
        }
    });
    const handleSubmit = (values: Obj) => {
        switch (props.typeQuery) {
            case 'create':
                createQuery(`/api/resources?apiKey=${apiKey.value}`, 'post', {
                    name: values.resourceName
                }, createNewResource.set, (data, error) => {
                    if (data) {
                        toast('Tạo resource thành công!', {
                            type: 'success'
                        });
                        setOpen(false);
                    } else if (error) {
                        toast(error.message, {
                            type: 'error'
                        });
                    }
                });
                break;
            case 'update':
                createQuery(`/api/resources/${props.resource?.name}?apiKey=${apiKey.value}`, 'put', {
                    name: values.resourceName
                }, updateResource.set, (data, error) => {
                    if (data) {
                        toast('Cập nhật resource thành công!', {
                            type: 'success'
                        });
                        setOpen(false);
                    } else if (error) {
                        toast(error.message, {
                            type: 'error'
                        });
                    }
                });
                break;
            default:
                break;
        }
    }
    return (
        <Modal
            {...props}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            {open && <div>
                <Form
                    disabled={createNewResource.value.isLoading || updateResource.value.isLoading}
                    onFinish={handleSubmit}
                    initialValues={{
                        resourceName: props.resource?.name ?? ''
                    }}
                >
                    <Form.Item
                        name={'resourceName'}
                        required
                        label={<p>Resource name</p>}
                        rules={[{ required: true, message: 'Bạn chưa nhập tên resource!' }]}
                    >
                        <Input
                            name='resourceName'
                        />
                    </Form.Item>
                    <Form.Item
                    >
                        <div className='flex justify-end gap-4'>
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Huỷ
                            </Button>
                            <Button
                                loading={createNewResource.value.isLoading || updateResource.value.isLoading}
                                type='primary'
                                htmlType='submit'
                            >
                                Lưu
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>}
        </Modal>
    )
})

export default ModalResource;