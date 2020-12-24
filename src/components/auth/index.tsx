import React, { useState, forwardRef, Ref } from 'react';
import { Form, Radio, Input } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useForm, FormInstance } from 'antd/lib/form/Form';

const AuthModalComponent = forwardRef((prop, ref: Ref<FormInstance>) => {

    const { TextArea } = Input;
    const [authResult, setAuthResult] = useState<1 | 2>(1);
    const [from] = useForm();

    const radioChange = (event: RadioChangeEvent) => {
        setAuthResult(event.target.value);
    };

    return (
        <Form form={from} ref={ref}>
            <Form.Item name="authResult" initialValue={1}>
                <Radio.Group onChange={radioChange}>
                    <Radio value={1}>通过</Radio>
                    <Radio value={2}>驳回</Radio>
                </Radio.Group>
            </Form.Item>
            {(authResult === 2) && <Form.Item name="refuseReason" rules={[
                {
                    required: true, message: '驳回原因不能为空'
                },
                {
                    min: 5, message: '最少输入五个字符的驳回原因'
                }
            ]}>
                <TextArea rows={4} maxLength={500} placeholder="请输入驳回原因"></TextArea>
            </Form.Item>}
        </Form>
    )

})

export default AuthModalComponent;