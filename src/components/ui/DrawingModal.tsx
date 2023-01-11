import React, { FC } from 'react';
import { Modal } from 'antd';

type DrawingModalProps = {
    handleCloseModal: () => void;
    showModal: boolean;
    drawingModalClosable: boolean;
    children: React.ReactNode;
};

const DrawingModal: FC<DrawingModalProps> = ({
    drawingModalClosable,
    handleCloseModal,
    showModal,
    children,
}) => {
    return (
        <>
            <Modal
                centered={true}
                visible={showModal}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                destroyOnClose={true}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={drawingModalClosable}
                maskClosable={drawingModalClosable}
                title={null}
                footer={null}
                width={800}
                getContainer={() => document.getElementById('main-wrap')!}
                className="main-drawing-modal"
            >
                {children}
            </Modal>
        </>
    );
};

export default DrawingModal;
