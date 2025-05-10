import { Box } from '@mui/material'
import { Content, SectionTitle, Subtitle } from './DocumentElements'

export const Definitions = () => {
    return (
        <Box>
            <SectionTitle>Definitions</SectionTitle>
            <Subtitle>Trip</Subtitle>
            <Content>
                A main itinerary, containing sections, options, and elements
            </Content>

            <Subtitle>Section</Subtitle>
            <Content>
                A way to organize options into meaningful groups
            </Content>

            <Subtitle>Option</Subtitle>
            <Content>
                Set of elements that represent one possible plan (e.g., morning flight vs. afternoon flight)
            </Content>

            <Subtitle>Element</Subtitle>
            <Content>
                A single travel step, like a flight, hotel, or activity
            </Content>

            <Subtitle>Passenger/Guest</Subtitle>
            <Content>
                A person assigned to an element. Used to track who is participating in each part of the itinerary.
            </Content>
        </Box>
    )
}