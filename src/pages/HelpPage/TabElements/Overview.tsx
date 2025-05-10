import { Box } from '@mui/material'
import { Content, SectionTitle, Subtitle } from './DocumentElements'

export const Overview = () => {
    return (
        <Box>
            <SectionTitle>Overview</SectionTitle>
            <Subtitle>Introduction</Subtitle>
            <Content>
                ItineraryHub is a trip-planning tool that helps you organize and compare different travel options. Whether you're choosing between multiple flights, accommodations, or activities, ItineraryHub allows you to structure your plans in a flexible way.
            </Content>

            <Subtitle>Creating an Itinerary</Subtitle>
            <Content>
                Each Trip consists of Sections, which group together different Options. Each Option contains individual Elements, representing specific travel steps (like flights, hotels, or activities). This structure allows you to compare different possibilities within a single trip.
            </Content>
            <Content>
                For example, if you're considering multiple flights and hotels, you can create separate sections for flights and accommodations, add different options within each section, and easily switch between them.
            </Content>
        </Box>
    )
}