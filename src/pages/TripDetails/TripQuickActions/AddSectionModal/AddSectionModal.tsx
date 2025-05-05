import { CustomModal } from 'components/CustomModal'
import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CreateSectionValues, getSections, useCreateSection } from 'hooks/sections'
import { ModalProps, useTripId } from 'utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { queryKeys } from 'config/queryKeys'

export const AddSectionModal = ({
    modalOpen,
    setModalOpen
}: ModalProps) => {
    const { tripId } = useTripId()
    const [sectionName, setSectionName] = useState<string>('')
    const [error, setError] = useState<string | undefined>()
    const { mutateAsync: createSection, isPending } = useCreateSection()
    const queryClient = useQueryClient()

    const { data: sectionIds } = useQuery<string[]>({
        enabled: false,
        queryKey: ['sectionIds', tripId],
        queryFn: () => getSections(tripId).then(r => r.map(s => s.sectionId))
    })

    const addNewSection = async () => {
        if (sectionName.trim() === '') {
            setError('Invalid section name')
            return
        }

        if (!sectionIds || sectionIds.length === 0) {
            toast.error('Something went wrong. Try again later', { toastId: 'add-section-modal-error-toast' })
            return
        }

        const request: CreateSectionValues = {
            sectionName,
            order: sectionIds.length + 1
        }

        await createSection({
            tripId,
            request
        }).then(async () => {
            await queryClient.invalidateQueries({ queryKey: ['sectionIds', tripId ] })
            await queryClient.invalidateQueries({ queryKey: [queryKeys.getSections, tripId ] })
            toast.success('New section created')
        }).catch(() => {
            toast.error('Couldn\'t create a new section. Try again later', { toastId: 'add-section-modal-error-toast' })
        }).finally(() => {
            setModalOpen(false)
        })
    }

    return (
        <CustomModal
            isOpen={modalOpen}
            modalTitle={'Add New Section'}
            actionButtonsProps={{
                onCancel: () => setModalOpen(false),
                onConfirm: addNewSection,
                isLoading: isPending,
                isDisabled: Boolean(error) || sectionName === ''
            }}
            testId={'add-section-modal'}
        >
            <Box sx={{ marginTop: '13px', marginBottom: '7px', width: '100%' }}>
                <TextField
                    sx={{ borderRadius: '0' }}
                    value={sectionName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSectionName(event.target.value)
                    }}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                            await addNewSection()
                        }
                    }}
                    label={'Section Name'}
                    size={'small'}
                    variant={'outlined'}
                    error={Boolean(error)}
                    autoFocus
                    fullWidth
                    slotProps={{
                        htmlInput: { 'data-testid': 'add-section-name-input' }
                    }}
                />
                {error && (
                    <InputErrorMessage
                        error={error}
                        dataTestId={'add-section-input-error'}
                    />
                )}
            </Box>
        </CustomModal>
    )
}