import { Box, Divider, Typography } from '@mui/material'
import { TopBar } from 'modules/TopBar/TopBar'
import React, { useState } from 'react'
import {
    Definitions,
    DownloadItineraryDoc,
    ElementsDoc, ExampleDoc, GettingStarted,
    OptionsDoc,
    Overview,
    PassengersDoc,
    SectionDoc, SettingsDoc,
    TripsDoc
} from './TabElements'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useSearchParams } from 'react-router'
import classes from './HelpPage.module.scss'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'

export const HelpPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedSection = searchParams.get('section') ?? 'overview'

    const [selectedNode, setSelectedNode] = useState(selectedSection)
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent, itemId: string) => {
        handleChange(itemId)
    }

    const handleChange = (itemId: string) => {
        setSearchParams({ section: itemId })
        setSelectedNode(itemId)
    }

    const renderContent = () => {
        switch (selectedNode) {
            case 'overview': return <Overview />
            case 'definitions': return <Definitions />
            case 'getting-started': return <GettingStarted/>
            case 'trips': return <TripsDoc />
            case 'sections': return <SectionDoc />
            case 'options': return <OptionsDoc />
            case 'elements': return <ElementsDoc />
            case 'passengers': return <PassengersDoc />
            case 'export': return <DownloadItineraryDoc />
            case 'examples': return <ExampleDoc />
            case 'account': return <SettingsDoc />
            default: return <Typography>Select a topic from the help menu.</Typography>
        }
    }

    const redirectToTripList = () => {
        navigate('/dashboard')
    }

    return (
        <div className={classes.Page}>
            <TopBar showHomeButton={true} showHelpButton={false}/>
            <Box className={classes.Header}>
                <Box
                    className={classes.Header__TextWithLink}
                    data-testid="trip-details-go-back-link"
                    onClick={redirectToTripList}
                >
                    <ArrowBackIcon fontSize={'small'}/>
                    <Typography>
                        Trip List
                    </Typography>
                </Box>
                <Typography variant={'h2'} className={classes.Header__Title}>
                    Help Page
                </Typography>
            </Box>
            <Box className={classes.TabContainer}>
                <SimpleTreeView
                    className={classes.TreeView}
                    defaultExpandedItems={['getting-started']}
                    defaultSelectedItems={selectedSection}
                    onItemClick={handleClick}
                    sx={{
                        '& .MuiTreeItem-label': {
                            fontSize: '1.1rem',
                        }
                    }}
                >
                    <TreeItem itemId="overview" label="Overview" />
                    <TreeItem itemId="definitions" label="Definitions" />
                    <TreeItem itemId="getting-started" label="Getting Started">
                        <TreeItem itemId="trips" label="Trips" />
                        <TreeItem itemId="sections" label="Sections" />
                        <TreeItem itemId="options" label="Options" />
                        <TreeItem itemId="elements" label="Elements" />
                        <TreeItem itemId="passengers" label="Passengers" />
                        <TreeItem itemId="export" label="Download itinerary" />
                    </TreeItem>
                    <TreeItem itemId="examples" label="Example" />
                    <TreeItem itemId="account" label="Account" />
                </SimpleTreeView>

                <Divider orientation={'vertical'}/>

                <Box className={classes.Panel}>
                    {renderContent()}
                </Box>
            </Box>
        </div>
    )
}