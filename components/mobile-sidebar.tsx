'use client';

import { AlignJustify } from 'lucide-react'
import { Button } from './ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from './ui/sheet';
import Sidebar from './Sidebar';

const MobileSideBar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size='icon' className='md:hidden'>
                    <AlignJustify />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar