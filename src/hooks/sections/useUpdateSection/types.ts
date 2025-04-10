export interface UpdateSectionValues {
    sectionName?: string
    order?: number
}

export interface UpdateSectionRequest {
    request: UpdateSectionValues
    tripId: string
    sectionId: string
}