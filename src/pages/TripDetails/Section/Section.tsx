import { Box, Skeleton } from '@mui/material'
import classes from './Section.module.scss'
import { useEffect, useState } from 'react'
import { Option } from '../Option'
import OutsideAlerter from 'utils/OutsideAlerter'
import { SectionMenu } from './SectionMenu'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { getSection, SectionDetails, useUpdateSection } from 'hooks/sections'
import { useTripId } from 'utils'
import { EditableText } from 'components/EditableText'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SectionContextProvider } from 'provider/SectionProvider/SectionContextProvider'

interface SectionProps {
    sectionId: string
}

export const Section = ({
    sectionId
}: SectionProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [optionsModalOpen, setOptionsModalOpen] = useState(false)
    const [deleteSectionModalOpen, setDeleteSectionModalOpen] = useState(false)
    const [elementDrawerOpen, setElementDrawerOpen] = useState(false)

    const { mutateAsync: updateSectionCall } = useUpdateSection()
    const { tripId } = useTripId()

    const { data: section, isPending } = useQuery<SectionDetails>({
        queryKey: ['sectionDetails', sectionId],
        queryFn: () => getSection({ tripId, sectionId })
    })

    const queryClient = useQueryClient()

    const [isEditingSectionName, setIsEditingSectionName] = useState(false)
    const [currentSectionName, setSectionName] = useState(section?.sectionName)

    useEffect(() => {
        setSectionName(section?.sectionName)
    }, [section?.sectionName])

    // Only skeleton on the initial load; background refetches keep showing the
    // current data instead of unmounting the whole section mid-interaction.
    if (isPending) {
        return (
            <Skeleton/>
        )
    }

    if (!section) {
        // TODO: implement error & loading state
        console.error('Couldn\'t retrieve section details.')
        return null
    }

    const handleMenuOptionsClose = async (invalidate: boolean) => {
        if (invalidate) {
            await queryClient.invalidateQueries({ queryKey: ['sectionOptionIds', sectionId] })
        }
        setMenuOpen(false)
    }

    const updateSectionName = async () => {
        setIsEditingSectionName(false)

        const newName = currentSectionName?.trim()
        if (!newName || newName === section?.sectionName) {
            setSectionName(section?.sectionName)
            return
        }

        await updateSectionCall({ tripId: tripId, sectionId: sectionId, request: { sectionName: newName } })
            .then(() => {
                setSectionName(newName)
                queryClient.setQueryData(['sectionDetails', sectionId], (old: SectionDetails) => ({
                    ...old,
                    sectionName: newName
                }))
            })
            .catch(() => {
                setSectionName(section?.sectionName)
                toast('Couldn\'t update the section name. Try again later.', { toastId: 'failed-section-name-update-toast' })
            })
    }

    const onOutsideClick = () => {
        if (!optionsModalOpen && !elementDrawerOpen && !deleteSectionModalOpen) setMenuOpen(false)
    }

    return (
        <SectionContextProvider sectionId={sectionId}>
            <Box className={classes.Section}>
                <Box className={classes.Section__Header}>
                    <EditableText
                        testId={`trip-view-section-${sectionId}`}
                        value={currentSectionName}
                        setValue={setSectionName}
                        isEditing={isEditingSectionName}
                        setIsEditing={setIsEditingSectionName}
                        onSave={updateSectionName}
                        size="medium"
                        withIcon
                    />
                    <Box sx={{ flexGrow: 1 }}/>
                    <Box>
                        <OutsideAlerter onClickOutside={onOutsideClick}>
                            <MoreHorizIcon
                                data-testid={`section-menu-icon-${sectionId}`}
                                className={classNames(
                                    classes.Section__Icon,
                                    menuOpen && classes.Section__Icon__Open
                                )}
                                onClick={() => setMenuOpen(!menuOpen)}
                            />
                            {menuOpen && (
                                <SectionMenu
                                    sectionDetails={section}
                                    manageOptionsModal={{
                                        modalOpen: optionsModalOpen,
                                        setModalOpen: setOptionsModalOpen
                                    }}
                                    elementDrawer={{
                                        modalOpen: elementDrawerOpen,
                                        setModalOpen: setElementDrawerOpen
                                    }}
                                    deleteSectionModal={{
                                        modalOpen: deleteSectionModalOpen,
                                        setModalOpen: setDeleteSectionModalOpen
                                    }}
                                    closeMenu={handleMenuOptionsClose}
                                />
                            )}
                        </OutsideAlerter>
                    </Box>
                </Box>
                <Option sectionId={sectionId}/>
            </Box>
        </SectionContextProvider>
    )
}