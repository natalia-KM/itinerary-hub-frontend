import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const DownloadItineraryDoc = () => {
    return (
        <Box>
            <SectionTitle>Download Itinerary</SectionTitle>

            <Subtitle>Selecting Options</Subtitle>
            <Content>
                1. Navigate to the Trip Details page.<br />
                2. At the top of each section, you'll see tabs representing different <b>Options</b> (e.g., Morning Flight, Afternoon Flight).<br />
                3. Click to select the <b>Option</b> you want to include in the itinerary.<br />
                4. Only elements from the currently selected options will appear in the downloaded itinerary.<br />
            </Content>

            <Subtitle>Generating a Printable Itinerary</Subtitle>
            <DocImage path={'/images/help/fab.png'} alt={'Floating action button'} size={'small'} />
            <Content>
                1. Hover over the floating action button (FAB) on the Trip Details page.<br />
                2. Click the "Download Itinerary" option.<br />
                3. A new tab will open, showing a printable version of your itinerary.<br />
            </Content>

            <Subtitle>Downloading as PDF</Subtitle>
            <Content>
                1. When the page loads, your browser’s print dialog will appear automatically.<br />
                2. From here, you can choose to print or save as PDF.<br />
                3. <i>Tip: For best results, choose a color print option instead of black & white if available.</i><br />
                4. Once you’re done, simply close the tab.
            </Content>
        </Box>
    )
}
