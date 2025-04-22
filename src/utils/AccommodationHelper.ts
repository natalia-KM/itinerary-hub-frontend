import { ElementDO } from 'hooks/trips'
import { AccommodationElementDetails } from 'hooks/elements'

export function isAccommElement(obj: ElementDO): obj is AccommodationElementDetails {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof obj === 'object' && obj !== null && 'accommodationType' in obj && typeof (obj as any).accommodationType === 'string'
}