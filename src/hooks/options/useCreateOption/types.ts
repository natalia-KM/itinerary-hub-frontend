export interface CreateOptionValues {
    optionName: string
    order: number
}

export interface CreateOptionRequest {
    request: CreateOptionValues
    sectionId: string
    tripId: string
}
