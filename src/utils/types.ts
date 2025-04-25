export interface TripDetails {
    tripId: string
    tripName: string
    createdAt: Date
    imageRef?: string
    startDate?: Date
    endDate?: Date
}

export interface ModalProps {
    modalOpen: boolean,
    setModalOpen: (value: boolean) => void
}
