import Link from 'next/link'
import {AiOutlineArrowDown} from 'react-icons/ai'

const ThemeLink = ({ className, href, title }:any) => {
    return (
        <Link className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-8 py-3 text-center w-auto flex items-center ${className}`} href={href}>{title}<span className='ml-2 text-xl'></span>
        </Link>
    )
}

export default ThemeLink
