import { AccommodationType, GetElementRequest } from '../types'

export interface GetAcommElementRequest extends GetElementRequest {
    type: AccommodationType
}