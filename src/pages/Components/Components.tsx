import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import {
    accommCategories,
    activityCategories,
    elementCategoryIcons,
    transportCategories
} from '../TripDetails/AddElementDrawer'
import { ElementBadge } from '../TripDetails/Element/ElementBadge'
import { TopBar } from 'modules/TopBar'

export const Components = () => {

    return (
        <Box>
            <TopBar/>
            <Typography variant={'h4'} margin={'5vh'} textAlign={'center'}>
                Components
            </Typography>
            <Accordion>
                <AccordionSummary>
                    Transport Elements Category Badges
                </AccordionSummary>
                <AccordionDetails>
                    {transportCategories.map((element) => {
                        const config = elementCategoryIcons[element]
                        const ElementCategoryIcon = config?.icon

                        return (
                            <ElementBadge Icon={ElementCategoryIcon} tooltipText={element} color={config.color} whiteIcon={config.whiteIcon} />
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
                            <ElementBadge Icon={ElementCategoryIcon} tooltipText={element} color={config.color} whiteIcon={config.whiteIcon} />
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
                            <ElementBadge Icon={ElementCategoryIcon} tooltipText={element} color={config.color} whiteIcon={config.whiteIcon} />
                        )
                    })}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}