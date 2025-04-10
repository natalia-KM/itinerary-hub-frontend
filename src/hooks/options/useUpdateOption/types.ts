export interface UpdateOptionValues {
    optionName?: string
    order?: number
}

export interface UpdateOptionRequest {
    request: UpdateOptionValues
    optionId: string
    sectionId: string
}