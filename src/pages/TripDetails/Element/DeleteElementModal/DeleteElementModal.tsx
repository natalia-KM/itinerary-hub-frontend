import { useQueryClient } from '@tanstack/react-query'
import { useDeleteElement } from 'hooks/elements'
import { toast } from 'react-toastify'
import { useElementContext, useSectionContext } from 'provider'
import { ModalProps } from 'utils'
import { CustomModal } from 'components/CustomModal'
import WarningIcon from '@mui/icons-material/Warning'
import classes from 'components/ConfirmDeleteModal/ConfirmDeleteModal.module.scss'
import { Typography } from '@mui/material'

export const DeleteElementModal = ({ 
    modalOpen,
    setModalOpen 
}: ModalProps) => {
    const queryClient = useQueryClient()
    const { mutateAsync: deleteElement } = useDeleteElement()
    
    const { sectionId } = useSectionContext()
    const { optionId, baseElementId, elementType } = useElementContext()

    const onDelete = async () => {
        await deleteElement({ 
            sectionId,
            optionId,
            baseElementId,
            elementType
        })
            .then(async () => {
                await queryClient.invalidateQueries({ queryKey: ['elementInfo', optionId] })
            })
            .catch(() => {
                toast.error('Couldn\'t delete element. Try again later', { toastId: 'delete-element-error-toast' })
            })
            .finally(() => {
                setModalOpen(false)
            })
    }
    
    return (
        <CustomModal
            isOpen={modalOpen}
            modalTitle={'Delete Element'}
            actionButtonsProps={{
                onConfirm: onDelete,
                onCancel: () => setModalOpen(false)
            }}
            testId={'delete-element-modal'}
        >
            <WarningIcon className={classes.Icon} data-testid='confirm-delete-modal-warning-icon'/>
            <Typography className={classes.Text}  data-testid='confirm-delete-modal-text'>
                Are you sure you want to delete this element? <br/>
                This action cannot be undone.
            </Typography>
        </CustomModal>
    )
}