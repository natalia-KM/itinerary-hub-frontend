import { AccommodationType, ActivityElementDetails, ElementType } from './types'
import webClient from 'config/clientConfig'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export interface MoveElementRequest {
    newSectionId: string
    newOptionId: string
    elementType: ElementType
    accommodationType?: AccommodationType
}

interface MoveElementProps {
    currentSectionId: string
    currentOptionId: string
    baseElementId: string
}

export const useMoveElement = ({
    baseElementId,
    currentOptionId,
    currentSectionId
}: MoveElementProps) => {

    const moveElement = async (request: MoveElementRequest) => {
        const url = `/v1/sections/${currentSectionId}/options/${currentOptionId}/elements/${baseElementId}`
        await webClient.put<ActivityElementDetails>(url, request)
    }

    return useMutation({
        mutationKey: [queryKeys.moveElement],
        mutationFn: moveElement
    })
}