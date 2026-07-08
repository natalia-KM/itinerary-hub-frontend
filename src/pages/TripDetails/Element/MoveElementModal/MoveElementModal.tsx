import { CustomModal } from 'components/CustomModal'
import { ModalProps, useTripId } from 'utils'
import { useElementContext, useSectionContext } from 'provider'
import { useGetSections } from 'hooks/sections'
import { useState } from 'react'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { OptionsDropdown } from './OptionsDropdown'
import { MoveElementRequest, useMoveElement } from 'hooks/elements/useMoveElement'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const MoveElementModal = ({
    modalOpen,
    setModalOpen
}: ModalProps) => {
    const { tripId } = useTripId()
    const queryClient = useQueryClient()
    const { sectionId } = useSectionContext()
    const { baseElementId, optionId, elementType, accommodationType } = useElementContext()

    const { mutateAsync: moveElement } = useMoveElement({
        baseElementId,
        currentOptionId: optionId,
        currentSectionId: sectionId
    })
    const { data: sections } = useGetSections(tripId)

    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(sectionId)
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(optionId)

    if(!sections) {
        return null
    }

    const changeElementPosition = async () => {
        if (!selectedSectionId || !selectedOptionId) {
            return
        }

        const isSameSection = selectedSectionId === sectionId
        const isSameOption = selectedOptionId === optionId
        if (isSameSection && isSameOption) {
            return
        }

        const request: MoveElementRequest = {
            newSectionId: selectedSectionId,
            newOptionId: selectedOptionId,
            elementType,
            accommodationType
        }

        await moveElement(request)
            .then(() => {
                toast('Element moved successfully', { toastId: 'move-element-toast' })

                queryClient.invalidateQueries({ queryKey: ['elementInfo', selectedOptionId] })
                queryClient.invalidateQueries({ queryKey: ['elementInfo', optionId] })
            })
            .catch(() => {
                toast.error('Couldn\'t move element. Try again later', { toastId: 'move-element-toast' })
            })
            .finally(() => {
                setModalOpen(false)
            })
    }

    return (
        <CustomModal
            isOpen={modalOpen}
            modalTitle={'Move Element'}
            actionButtonsProps={{
                onConfirm: async () => {
                    await changeElementPosition()
                },
                onCancel: () => setModalOpen(false),
                showCancel: true,
                confirmTitle: 'Move'
            }}
            testId={'move-element-modal'}
        >
            <Typography variant='subtitle1' margin={'8px'} pb={'8px'}>
                Choose the section and option you want to move the element to
            </Typography>
            <Autocomplete
                sx={{ margin: '5px 0' }}
                value={sections.find(s => s.sectionId === selectedSectionId) || undefined}
                options={sections}
                getOptionLabel={(option) => option.sectionName}
                isOptionEqualToValue={(option, value) => option.sectionId === value.sectionId}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        data-testid='section-input-field'
                        label="Section"
                        variant="outlined"
                    />
                )}
                renderOption={(props, option) => (
                    <li
                        {...props}
                        key={`section-list-item-${option.sectionId}`}
                        data-testid={`section-list-item-${option.sectionId}`}
                    >
                        {option.sectionName}
                    </li>
                )}
                onChange={(e, selectedOption) => {
                    setSelectedSectionId(selectedOption?.sectionId || null)
                }}
                size="small"
                disableClearable
                fullWidth
            />

            {selectedSectionId && (
                <OptionsDropdown
                    selectedSectionId={selectedSectionId}
                    setSelectedOptionId={setSelectedOptionId}
                />
            )}
        </CustomModal>
    )
}