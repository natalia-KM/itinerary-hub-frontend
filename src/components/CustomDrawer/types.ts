export interface CustomDrawerProps {
    isOpen: boolean
    setClosed: () => void
    testId: string
    title?: string
    desc?: string
    children: React.ReactNode
}