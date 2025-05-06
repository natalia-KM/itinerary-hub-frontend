import { useSortable } from '@dnd-kit/sortable'
import { ElementType } from 'hooks/elements'
import { TransportElement } from './ElementItems/TransportElement'
import { ActivityElement } from './ElementItems/ActivityElement'
import { AccommElement } from './ElementItems/AccommElement'
import { ElementDetailsDO } from './ElementsList'
import { ElementContextProvider } from 'provider'
import { CSS } from '@dnd-kit/utilities'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

interface SortableElementWrapperProps {
    details: ElementDetailsDO
    optionId: string
    accommPairedElementId?: string
}
export const SortableElementWrapper = ({
    details,
    optionId,
    accommPairedElementId
}: SortableElementWrapperProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: details.elementId })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        gap: '10px'
    }

    const ElementWrapper = () => {
        switch (details.elementType) {
            case ElementType.TRANSPORT:
                return <TransportElement key={details.elementId} />
            case ElementType.ACTIVITY:
                return <ActivityElement key={details.elementId} />
            case ElementType.ACCOMMODATION:
                return <AccommElement key={details.elementId} type={details.accommodationType} />
            default:
                return null
        }
    }

    return (
        <div ref={setNodeRef} style={style}>
            <div style={{ cursor: 'grab', display: 'flex', alignItems: 'center' }} {...attributes} {...listeners}>
                <DragIndicatorIcon />
            </div>
            <ElementContextProvider
                elementId={details.elementId}
                baseElementId={details.baseElementId}
                elementType={details.elementType}
                optionId={optionId}
                otherAccommElementId={accommPairedElementId}
            >
                <ElementWrapper />
            </ElementContextProvider>
        </div>
    )
}
