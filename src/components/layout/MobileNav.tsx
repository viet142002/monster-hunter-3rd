"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

import { MenuHeader } from "@/constants";

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<div className='sticky top-0'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon' className='md:hidden'>
						<HamburgerMenuIcon width={18} height={18} />
					</Button>
				</SheetTrigger>

				<SheetContent side='left'>
					<NavigationMenu>
						<NavigationMenuList>
							{MenuHeader.map(item => (
								<NavigationMenuItem key={item.id}>
									<Link
										href={item.href}
										legacyBehavior
										passHref
									>
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
				</SheetContent>
			</Sheet>
		</div>
	);
}
