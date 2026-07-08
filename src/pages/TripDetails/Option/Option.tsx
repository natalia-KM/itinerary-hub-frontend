import { useQuery } from '@tanstack/react-query'
import { Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import classes from './Option.module.scss'
import { OptionTab } from './ManageOptionsModal/OptionTab'
import { getOptions } from 'hooks/options'
import { ElementsList } from '../Element/ElementsList'
import { useTripStateContext } from 'provider/TripStateProvider/TripStateContext'

interface OptionProps {
    sectionId: string
}

export const Option = ({ sectionId }: OptionProps) => {
    const { setSelectedOption } = useTripStateContext()
     const { data: optionIds, isPending } = useQuery<string[]>({
        queryKey: ['sectionOptionIds', sectionId],
        queryFn: () => getOptions(sectionId)
            .then((response) => {
                return response.map((option) => option.optionId)
            })
    })

    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        const optionId = optionIds?.at(openTab ?? -1)
        if (optionId) {
            setSelectedOption(sectionId, optionId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openTab, optionIds]) // infinite loop if anything else is added to dependency array

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setOpenTab(newValue)

        const optionId = optionIds?.at(newValue ?? -1)
        if (optionId) {
            setSelectedOption(sectionId, optionId)
        }
    }

    // Only bail out on the initial load; background refetches keep showing the
    // current data instead of unmounting the tabs mid-interaction.
    if (isPending || !optionIds) {
        return null
    }

    return (
        <Box className={classes.TabContainer}>
            <TabContext value={openTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.TabContainer__Options}>
                    <TabList onChange={handleChange} data-testid={`option-tabs-${sectionId}`}>
                        {optionIds?.map((optionId, index) => (
                            <OptionTab key={optionId} optionId={optionId} index={index} sectionId={sectionId}/>
                        ))}
                    </TabList>

                </Box>
                {optionIds?.map((optionId, index) => (
                    <TabPanel key={optionId} value={index} sx={{ paddingLeft: 0, paddingRight: '24px', paddingY: 0 }}>
                        <ElementsList optionId={optionId} />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    )
}