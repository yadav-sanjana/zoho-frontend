import { UserCircle  } from 'lucide-react'
import MobileSideBar from './mobile-sidebar'

export const NavBar = () => {
  return (
    <div className='flex items-center p-4'>
      <MobileSideBar />
      <div className='flex w-full justify-end'>

        <UserCircle  />
      </div>
    </div>
  )
}

