import { Box } from '@mui/material'
import classes from './Section.module.scss'
import { useState } from 'react'
import { Option } from '../Option'
import OutsideAlerter from 'utils/OutsideAlerter'
import { SectionMenu } from './SectionMenu'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { SectionDetails, useUpdateSection } from 'hooks/sections'
import { normalizeTripData, useTripId } from 'utils'
import { EditableText } from 'components/EditableText'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import webClient from 'config/clientConfig'

interface SectionProps {
    sectionId: string
}

export const Section = ({
    sectionId
}: SectionProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const { mutateAsync: updateSectionCall } = useUpdateSection()
    const { tripId } = useTripId()

    const { data: section } = useQuery<SectionDetails>({ queryKey: ['sectionDetails', sectionId], enabled: false,
    queryFn: async () => {
        const { data } = await webClient.get(`/v1/trips/${tripId}`)
        return normalizeTripData(data).sections[sectionId].sectionDetails
    } })

    const queryClient = useQueryClient()

    const [isEditingSectionName, setIsEditingSectionName] = useState(false)
    const [currentSectionName, setSectionName] = useState(section?.sectionName)

    const handleMenuClose = async () => {
        setMenuOpen(false)
        await queryClient.invalidateQueries({ queryKey: ['sectionOptionIds', sectionId] })
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
        if(!modalOpen) setMenuOpen(false)
    }

    return (
        <Box className={classes.Section}>
            <Box className={classes.Section__Header}>
                <EditableText
                    testId='trip-view-section-name'
                    value={currentSectionName}
                    setValue={setSectionName}
                    isEditing={isEditingSectionName}
                    setIsEditing={setIsEditingSectionName}
                    onSave={updateSectionName}
                    size='medium'
                    withIcon
                />
                <Box sx={{ flexGrow: 1 }} />
                 <Box>
                     <OutsideAlerter onClickOutside={onOutsideClick}>
                         <MoreHorizIcon
                             data-testid='section-menu-icon'
                             className={classNames(
                                 classes.Section__Icon,
                                 menuOpen && classes.Section__Icon__Open
                             )}
                             onClick={() => setMenuOpen(!menuOpen)}
                         />
                         {menuOpen && (
                                 <SectionMenu
                                     sectionId={sectionId}
                                     closeMenu={handleMenuClose}
                                     modalOpen={modalOpen}
                                     setModalOpen={setModalOpen}
                                 />
                         )}
                     </OutsideAlerter>
                 </Box>
            </Box>
            <Option sectionId={sectionId}/>
        </Box>
    )
}