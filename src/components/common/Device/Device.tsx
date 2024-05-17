import { headers } from "next/headers";
import { isMobile } from "@/helpers/server";
import { ReactElement } from "react";

export interface DeviceProps {
	desktop?: boolean;
	mobile?: boolean;
	children: ReactElement;
}

export function Device({
	desktop,
	mobile,
	children,
}: DeviceProps): ReactElement | null {
	const userAgent = headers().get("user-agent") || "";
	const checkMobile = isMobile(userAgent);

	return (checkMobile && mobile) || (!checkMobile && desktop)
		? children
		: null;
}
