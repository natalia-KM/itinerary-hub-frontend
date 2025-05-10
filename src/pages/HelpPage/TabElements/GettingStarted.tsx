import { Box, Link } from '@mui/material'
import { Content, SectionTitle } from './DocumentElements'
import { useLocation, useNavigate } from 'react-router'

export const GettingStarted = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (itemId: string) => {
        navigate(`${location.pathname}?section=${itemId}`)
        window.location.reload()
    }

    return (
        <Box>
            <SectionTitle>Getting Started</SectionTitle>
            <Content>
                To get started, pick one of the following sections to explore:
                <ul>
                    <li><Link onClick={() => handleClick('trips')}>Trips</Link> - View and edit your trip details.</li>
                    <li><Link onClick={() => handleClick('sections')}>Sections</Link> - Organize your trip into sections.</li>
                    <li><Link onClick={() => handleClick('options')}>Options</Link> - Choose different options within each section.</li>
                    <li><Link onClick={() => handleClick('elements')}>Elements</Link> - Add and manage travel steps for your trip.</li>
                    <li><Link onClick={() => handleClick('passengers')}>Passengers / Guests</Link> - Manage passengers or guests that are associated with elements of your trip.</li>
                    <li><Link onClick={() => handleClick('export')}>Download Itinerary</Link> - Download a printable version of your itinerary, customized with your selected options and elements.</li>
                </ul>
            </Content>
        </Box>
    )
}