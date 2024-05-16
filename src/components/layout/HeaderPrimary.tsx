"use client";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { MenuHeader } from "@/constants";
import { useAuth } from "@/helpers/hooks";

export function HeaderPrimary() {
	const { user } = useAuth();

	const handleLogout = () => {
		console.log("Logout");
	};
	return (
		<div className='hidden md:flex justify-center p-4 fixed top-0 mx-auto bg-[#0000009e] w-full'>
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
					{user ? (
						<NavigationMenuItem onClick={handleLogout}>
							Đăng xuất
						</NavigationMenuItem>
					) : (
						<NavigationMenuItem>
							<Link href='/login' legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Đăng nhập
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
