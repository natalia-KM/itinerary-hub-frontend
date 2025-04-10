export interface CreateSectionValues {
    sectionName: string
    order: number
}

export interface CreateSectionRequest {
    request: CreateSectionValues
    tripId: string
}
