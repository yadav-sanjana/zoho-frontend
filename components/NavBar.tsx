'use client'
import MobileSideBar from './common/Header/mobile-sidebar'
import UserLogin from './user/UserLogin'

export const NavBar = () => {
  return (
    <div className='flex items-center p-4'>
      <MobileSideBar />
      <div className='flex w-full justify-end'>

        <UserLogin/>
      </div>
    </div>
  )
}

