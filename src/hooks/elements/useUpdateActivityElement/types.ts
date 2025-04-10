import { BaseElementRequest } from '../types'

export interface UpdateActivityValues {
    baseElementRequest: BaseElementRequest
    activityName?: string
    location?: string
    startsAt?: string
    duration?: number
    order?: number
}

export interface UpdateActivityRequest {
    request: UpdateActivityValues
    sectionId: string
    optionId: string
    baseElementId: string
}