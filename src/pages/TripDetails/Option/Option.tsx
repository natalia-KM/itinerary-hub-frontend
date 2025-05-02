import { useQuery } from '@tanstack/react-query'
import { Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import classes from './Option.module.scss'
import { OptionTab } from './ManageOptionsModal/OptionTab'
import { getOptions } from 'hooks/options'
import { useSectionContext } from 'provider/SectionProvider/SectionContext'
import { ElementsList } from '../Element/ElementsList'

interface OptionProps {
    sectionId: string
}

export const Option = ({ sectionId }: OptionProps) => {
    const { setOpenOptionId } = useSectionContext()
     const { data: optionIds, isPending, isRefetching } = useQuery<string[]>({
        queryKey: ['sectionOptionIds', sectionId],
        queryFn: () => getOptions(sectionId)
            .then((response) => {
                return response.map((option) => option.optionId)
            })
    })

    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        setOpenOptionId(optionIds?.at(openTab))
    }, [openTab, optionIds, setOpenOptionId])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setOpenTab(newValue)
    }

    if (isPending || isRefetching || !optionIds) {
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
                    <TabPanel key={optionId} value={index} sx={{ padding: '0 24px' }}>
                        <ElementsList optionId={optionId} />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    )
}