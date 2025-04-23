import FlightIcon from '@mui/icons-material/Flight'
import TrainIcon from '@mui/icons-material/Train'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi'
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import LandscapeIcon from '@mui/icons-material/Landscape'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import SpaIcon from '@mui/icons-material/Spa'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import PoolIcon from '@mui/icons-material/Pool'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import MovieIcon from '@mui/icons-material/Movie'
import HotelIcon from '@mui/icons-material/Hotel'
import HomeIcon from '@mui/icons-material/Home'
import ApartmentIcon from '@mui/icons-material/Apartment'
import VillaIcon from '@mui/icons-material/Villa'
import HouseIcon from '@mui/icons-material/House'

import { SvgIconProps } from '@mui/material/SvgIcon'

export const transportCategories = [
    'Flight',
    'Train',
    'Bus',
    'Car',
    'Taxi',
    'Uber',
    'Ferry'
]

export const activityCategories = [
    'Sightseeing',
    'Food & Drink',
    'Nature & Outdoors',
    'Adventure & Sports',
    'Spa & Wellness',
    'Culture & History',
    'Water Activities',
    'Shopping',
    'Entertainment'
]

export const accommCategories = [
    'Hotel',
    'AirBnb',
    'Motel',
    'Resort',
    'Hostel',
    'B&B',
]

export type IconConfig = {
    icon: React.ElementType<SvgIconProps>;
    color: string;
    whiteIcon?: boolean
}

export const elementCategoryIcons: Record<string, IconConfig> = {
    Flight: { icon: FlightIcon, color: '#9fa8da' },
    Train: { icon: TrainIcon, color: '#a6d7a8' },
    Bus: { icon: DirectionsBusIcon, color: '#ffcc80' },
    Car: { icon: DirectionsCarIcon, color: '#ce93d8' },
    Taxi: { icon: LocalTaxiIcon, color: '#fff389' },
    Uber: { icon: DirectionsCarIcon, color: '#373737', whiteIcon: true },
    Ferry: { icon: DirectionsBoatIcon, color: '#90cbf9' },
    Sightseeing: { icon: DirectionsWalkIcon, color: '#f8b1c9' },
    'Food & Drink': { icon: FastfoodIcon, color: '#ffb8a1' },
    'Nature & Outdoors': { icon: LandscapeIcon, color: '#75c279' },
    'Adventure & Sports': { icon: SportsSoccerIcon, color: '#e58282' },
    'Spa & Wellness': { icon: SpaIcon, color: '#cd91d7', whiteIcon: true },
    'Culture & History': { icon: HistoryEduIcon, color: '#7d665f', whiteIcon: true },
    'Water Activities': { icon: PoolIcon, color: '#74b0d1' },
    Shopping: { icon: ShoppingBagIcon, color: '#a48b82', whiteIcon: true },
    Entertainment: { icon: MovieIcon, color: '#f48fb1' },
    Hotel: { icon: HotelIcon, color: '#9fa8da' },
    AirBnb: { icon: HomeIcon, color: '#f48fb1' },
    Motel: { icon: ApartmentIcon, color: '#a1887f', whiteIcon: true },
    Resort: { icon: VillaIcon, color: '#80cbc4' },
    Hostel: { icon: HouseIcon, color: '#ffe199' },
    'B&B': { icon: HomeIcon, color: '#ce93d8' }
}
