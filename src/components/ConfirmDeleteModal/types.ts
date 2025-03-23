import { ModalActionButtonsProps } from 'components/ModalActionButtons'

export interface ConfirmDeleteModalProps {
    /**
     * Type of an item to delete
     */
    itemType: string
    /**
    * The name of an item to delete
    */
    itemToDelete: string

    /**
     * Whether the modal is open
     */
    isOpen: boolean

    /**
     * Props for the action buttons
     */
    actionButtonsProps: ModalActionButtonsProps
}
