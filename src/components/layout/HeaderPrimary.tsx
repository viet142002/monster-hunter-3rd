'use client';

import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { MenuHeader } from '@/constants';

export function HeaderPrimary() {
    return (
        <div className='flex justify-center p-4 fixed top-0 mx-auto bg-inherit w-full'>
            <NavigationMenu>
                <NavigationMenuList>
                    {MenuHeader.map(item => (
                        <NavigationMenuItem key={item.id}>
                            <Link href={item.href} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
