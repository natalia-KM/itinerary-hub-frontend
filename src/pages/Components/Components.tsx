import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import {
    accommCategories,
    activityCategories,
    elementCategoryIcons,
    transportCategories
} from '../TripDetails/ElementDrawer'
import { ElementBadge } from '../TripDetails/Element/ElementBadge'
import { TopBar } from 'modules/TopBar'
import { PassengerDrawer } from '../TripsView/PassengerDrawer/PassengerDrawer'
import { useState } from 'react'
import { LoadingBackdrop } from 'modules/LoadingBackdrop'

export const Components = () => {
    const [backdropOpen, setBackdropOpen] = useState(false)

    return (
        <Box>
            <TopBar/>
            <PassengerDrawer/>
            <Typography variant={'h4'} margin={'5vh'} textAlign={'center'}>
                Components
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setBackdropOpen(true)}>Show backdrop</Button>
            </Box>
            <LoadingBackdrop isOpen={backdropOpen} testId={'test-backdrop'} onClick={() => setBackdropOpen(false)}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: 'auto',
                mr: 'auto',
                width: '80%'
            }}>
                <Accordion>
                    <AccordionSummary>
                        Transport Elements Category Badges
                    </AccordionSummary>
                    <AccordionDetails>
                        {transportCategories.map((element) => {
                            const config = elementCategoryIcons[element]
                            const ElementCategoryIcon = config?.icon

                            return (
                                <ElementBadge key={element} Icon={ElementCategoryIcon} tooltipText={element}
                                              color={config.color} whiteIcon={config.whiteIcon}/>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary>
                        Activity Elements Category Badges
                    </AccordionSummary>
                    <AccordionDetails>
                        {activityCategories.map((element) => {
                            const config = elementCategoryIcons[element]
                            const ElementCategoryIcon = config?.icon

                            return (
                                <ElementBadge key={element} Icon={ElementCategoryIcon} tooltipText={element}
                                              color={config.color} whiteIcon={config.whiteIcon}/>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary>
                        Accommodation Elements Category Badges
                    </AccordionSummary>
                    <AccordionDetails>
                        {accommCategories.map((element) => {
                            const config = elementCategoryIcons[element]
                            const ElementCategoryIcon = config?.icon

                            return (
                                <ElementBadge key={element} Icon={ElementCategoryIcon} tooltipText={element}
                                              color={config.color} whiteIcon={config.whiteIcon}/>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    )
}