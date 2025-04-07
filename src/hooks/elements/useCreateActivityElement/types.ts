import { BaseElementRequest } from '../types'

export interface CreateActivityValues {
    baseElementRequest: BaseElementRequest
    activityName: string
    location: string
    startsAt?: string
    duration?: number
    order: number
}

export interface CreateActivityRequest {
    request: CreateActivityValues
    sectionId: string
    optionId: string
}