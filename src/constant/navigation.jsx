import { MdHomeFilled } from 'react-icons/md'
import { PiTelevisionFill } from 'react-icons/pi'
import { RiMovieFill } from 'react-icons/ri'
import { IoSearch } from 'react-icons/io5'
 
export const navigation = [
  {
    label: 'TV Show',
    href: 'tv',
    icon: <PiTelevisionFill />
  }, 
  {
    label: 'Movies',
    href: 'movie',
    icon: <RiMovieFill />
  },
]

export const mobileNavigation =[
  {
    label: 'Home',
    href: '/',
    icon: <MdHomeFilled />
  },
  ...navigation,
  {
    label: 'Search',
    href: 'search',
    icon: <IoSearch />
  }
]