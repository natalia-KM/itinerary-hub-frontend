export interface CustomDrawerProps {
    isOpen: boolean
    setClosed: () => void
    title?: string
    desc?: string
    children: React.ReactNode
}