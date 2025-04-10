import { ModalActionButtonsProps } from 'components/ModalActionButtons'

export interface ManageOptionsModalProps {
    /**
     * ID of a section
     */
    sectionId: string

    /**
     * Whether the modal is open
     */
    isOpen: boolean

    /**
     * Props for the action buttons
     */
    actionButtonsProps: ModalActionButtonsProps
}