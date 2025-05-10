import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const ExampleDoc = () => {
    return (
        <Box>
            <SectionTitle>Example</SectionTitle>
            <Subtitle>Trip Example: Paris Getaway</Subtitle>
            <DocImage path={'/images/help/example-trip.gif'} alt={'Example Trip Overview'} size={'large'} />
            <Content>
                This example demonstrates how you can organize a trip using <b>Sections</b>, <b>Options</b>, and <b>Elements</b>.
            </Content>

            <Subtitle>Trip Structure</Subtitle>
            <Content>
                Your trip contains two sections:
                <ul>
                    <li><b>Flights</b> – used to plan your journey to Paris.</li>
                    <li><b>Day 1</b> – outlines your first day activities.</li>
                </ul>
            </Content>

            <Subtitle>Flights Section</Subtitle>
            <Content>
                The <b>Flights</b> section contains two <b>Options</b>:
                <ul>
                    <li><b>Morning Flight</b>
                        <ul>
                            <li>Flight from London to Paris at 8:00 AM</li>
                            <li>Taxi to hotel</li>
                        </ul>
                    </li>
                    <DocImage path={'/images/help/example-trip-first-option.png'} alt={'First Option'} size={'large'} />
                    <li><b>Afternoon Flight</b>
                        <ul>
                            <li>Flight from London to Paris at 2:00 PM</li>
                            <li>Uber to hotel</li>
                        </ul>
                    </li>
                    <DocImage path={'/images/help/example-trip-snd-option.png'} alt={'Second Option'} size={'large'}/>
                </ul>
                These options help you plan different scenarios (e.g. early vs. late departure) and choose the one that fits best.
            </Content>
            <Subtitle></Subtitle>

            <Subtitle>Day 1 Section</Subtitle>
            <Content>
                The <b>Day 1</b> section contains one <b>Option</b>:
                <ul>
                    <li>Morning museum visit</li>
                    <li>Lunch at Café de Flore</li>
                </ul>
                Since you’re not comparing alternatives here, you only need one option.
                <DocImage path={'/images/help/example-trip-second-section.png'} alt={'Day 1 Section'} size={'large'} />
            </Content>

            <Subtitle>Printing the Itinerary</Subtitle>
            <Content>
                Once you've selected your preferred flight option (e.g., <b>Morning Flight</b>), you can download the itinerary:
                <ol>
                    <li>Hover over the FAB and click <b>Download Itinerary</b>.</li>
                    <li>A new page will open with a printable version of your selected trip.</li>
                    <li>Make sure to choose <b>Color</b> in the print modal for the best appearance.</li>
                    <li>Once you're done, close the tab.</li>
                </ol>
                This lets you share or print a clean version of your finalized plan.
            </Content>

            <Subtitle>Why Use Sections and Options?</Subtitle>
            <Content>
                <ul>
                    <li><b>Sections</b> help break your trip into logical parts – like transportation, accommodations, or daily plans.</li>
                    <li><b>Options</b> allow you to plan and compare multiple variations – such as by cost, timing, or activity type – before picking the best one.</li>
                </ul>
            </Content>

        </Box>
    )
}