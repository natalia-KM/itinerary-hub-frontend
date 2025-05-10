import { Typography } from '@mui/material'
import classes from './TabElements.module.scss'
import { ReactNode } from 'react'

interface DocElementProps {
    children?: ReactNode
}

export const SectionTitle = ({ children }: DocElementProps) => {
    return (
        <Typography variant={'h3'} className={classes.SectionTitle}>
            {children}
        </Typography>
    )
}

export const Subtitle = ({ children }: DocElementProps) =>  {
    return (
        <Typography variant={'h4'} className={classes.Subtitle} gutterBottom>
            {children}
        </Typography>
    )
}

export const Content = ({ children }: DocElementProps) => {
    return (
        <Typography variant={'body1'} className={classes.Content} gutterBottom>
            {children}
        </Typography>
    )
}

interface DocImageProps {
    path: string
    size?: 'small' | 'medium' | 'large'
    alt?: string
}

export const DocImage = ({ path, alt, size = 'medium' }: DocImageProps) => {
    const maxWidth = {
        small: '300px',
        medium: '450px',
        large: '600px'
    } as const

    const maxHeight = {
        small: '200px',
        medium: '300px',
        large: '450px'
    } as const


    return (
        <img src={path} alt={alt} className={classes.Image} style={{ maxHeight: maxHeight[size], maxWidth: maxWidth[size] }}/>
    )
}