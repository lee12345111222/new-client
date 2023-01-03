import React, { FC } from 'react'
import { Modal } from 'antd'

type CustomModalProps = {
    handleCloseModal: () => void
    showModal: boolean
    children: React.ReactNode
}

const CustomModal: FC<CustomModalProps> = ({ handleCloseModal, showModal, children }) => {
    return (
        <>
            <Modal
                centered={true}
                visible={showModal}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                destroyOnClose={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={true}
                title={null}
                footer={null}
                getContainer={() => document.getElementById('app')!}
                mask={true}
                maskClosable={true}
            >
                {children}
            </Modal>
        </>
    )
}

export default CustomModal
