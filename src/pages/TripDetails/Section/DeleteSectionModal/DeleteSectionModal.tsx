import { CustomModal } from 'components/CustomModal'
import WarningIcon from '@mui/icons-material/Warning'
import classes from './DeleteSectionModal.module.scss'
import { Typography } from '@mui/material'
import { SectionDetails, useDeleteSection } from 'hooks/sections'
import { useTripId } from 'utils'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface DeleteSectionModalProps {
    isOpen: boolean
    setClosed: () => void
    sectionDetails: SectionDetails
}

export const DeleteSectionModal = ({
    isOpen,
    setClosed,
    sectionDetails
}: DeleteSectionModalProps) => {
    const { tripId } = useTripId()
    const { mutateAsync: deleteSection } = useDeleteSection()
    const queryClient = useQueryClient()

    const onConfirmDelete = async () => {
        await deleteSection({ tripId, sectionId: sectionDetails.sectionId })
            .then(async () => {
                await queryClient.invalidateQueries({ queryKey: ['sectionIds', tripId] })
                toast('Section deleted successfully', { toastId: 'delete-section-toast' })
            })
            .catch(() => {
                toast.error('Couldn\'t delete the section. Try again later', { toastId: 'delete-section-toast' })
            })
            .finally(() => {
                setClosed()
            })
    }

    return (
        <CustomModal
            isOpen={isOpen}
            modalTitle={'Delete Section'}
            actionButtonsProps={{
                onCancel: setClosed,
                onConfirm: onConfirmDelete
            }}
            testId={'confirm-delete-modal'}
        >
            <WarningIcon className={classes.Icon} data-testid="confirm-delete-modal-warning-icon"/>
            <Typography className={classes.Text} data-testid="confirm-delete-modal-text">
                Are you sure you want to delete {sectionDetails.sectionName} and all its elements? <br/>
                This action cannot be undone.
            </Typography>
        </CustomModal>
    )
}