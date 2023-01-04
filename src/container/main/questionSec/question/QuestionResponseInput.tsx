import React, { FC } from 'react'
import { Form, Button, Input } from 'antd'
import { RepliedDetail } from '../../interactiveSec/InteractiveSec'
import { icons } from '../../../../lib/icons'

type QuestionResponseInputProps = {
    handleResponseSubmit(type: string, response: string, repliedDetail: RepliedDetail): void
    repliedDetail: RepliedDetail
}

const QuestionResponseInput: FC<QuestionResponseInputProps> = ({ repliedDetail, handleResponseSubmit }) => {
    const [form] = Form.useForm()

    const handleFinishFields = (values: { response: string }) => {
        handleResponseSubmit('response', values.response, repliedDetail)
        form.resetFields()
    }
    return (
        <div>
            <Form
                form={form}
                layout="horizontal"
                initialValues={{
                    response: '',
                }}
                colon={false}
                onFinish={handleFinishFields}
                className="message-box-container"
            >
                <Form.Item name="response" className="message-form">
                    <Input id="response" className="message-textarea" placeholder="回覆..." />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" className="send-message-button">
                        {icons.paperPlane()}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default QuestionResponseInput
