export interface ModalActionButtonsProps {
    onCancel: () => void
    onConfirm: () => void
    confirmErrorColor?: boolean
    cancelTitle?: string
    confirmTitle?: string
    isLoading?: boolean
    isDisabled?: boolean
}
