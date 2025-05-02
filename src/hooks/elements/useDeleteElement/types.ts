import { ElementType } from '../types'

export interface DeleteElementRequest {
    optionId: string
    sectionId: string
    baseElementId: string
    elementType: ElementType
}