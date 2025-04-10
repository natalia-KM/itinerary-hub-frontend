export interface ModalActionButtonsProps {
    onCancel?: () => void
    onConfirm: () => void
    confirmErrorColor?: boolean
    cancelTitle?: string
    confirmTitle?: string
    showCancel?: boolean
    isLoading?: boolean
    isDisabled?: boolean
}
