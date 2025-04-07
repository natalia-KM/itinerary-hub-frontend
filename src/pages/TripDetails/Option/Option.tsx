import { useQuery } from '@tanstack/react-query'
import { Box, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import classes from './Option.module.scss'
import webClient from 'config/clientConfig'
import { normalizeTripData, useTripId } from 'utils'
import { OptionTab } from './ManageOptionsModal/OptionTab'

interface OptionProps {
    sectionId: string
}

export const Option = ({ sectionId }: OptionProps) => {
    const { tripId } = useTripId()

    const { data: optionIds, isPending, isRefetching } = useQuery<string[]>({
        queryKey: ['sectionOptionIds', sectionId],
        queryFn: async () => {
            const { data } = await webClient.get(`/v1/trips/${tripId}`)
            return normalizeTripData(data).sections[sectionId].optionIds
        }
    })

    const [openTab, setOpenTab] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setOpenTab(newValue)
    }

    if (isPending || isRefetching) {
        return null
    }

    return (
        <Box className={classes.TabContainer}>
            <TabContext value={openTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.TabContainer__Options}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {optionIds?.map((optionId, index) => (
                            <OptionTab key={optionId} optionId={optionId} index={index}/>
                        ))}
                    </TabList>

                </Box>
                {optionIds?.map((optionId, index) => (
                    <TabPanel key={optionId} value={index}>
                        <Typography>{optionId}</Typography>
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    )
}