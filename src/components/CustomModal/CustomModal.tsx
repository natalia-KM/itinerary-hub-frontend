import { Box, Modal, Typography } from '@mui/material'
import classes from './CustomModal.module.scss'

import classnames from 'classnames'
import { ModalActionButtons, ModalActionButtonsProps } from 'components/ModalActionButtons'

interface CustomModalProps {
    isOpen: boolean,
    modalTitle: string
    actionButtonsProps: ModalActionButtonsProps
    size?: 'small' | 'medium' | 'large'
    children: React.ReactNode
}

export const CustomModal = ({
    isOpen,
    children,
    modalTitle,
    actionButtonsProps,
    size = 'medium'
}: CustomModalProps) => {
    return (
        <Modal open={isOpen}>
            <Box className={classnames(
                classes.Modal,
                size === 'small' && classes.Modal_small,
                size === 'large' && classes.Modal_large
            )}>
                <Typography variant='h5' className={classes.Modal__Title}>
                    {modalTitle}
                </Typography>
                {children}
                <ModalActionButtons {...actionButtonsProps} />
            </Box>
        </Modal>
    )
}