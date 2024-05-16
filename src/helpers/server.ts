import jwt from "jsonwebtoken";
import moment from "moment";

export function FixFindData(data: any) {
	return JSON.parse(JSON.stringify(data));
}

export function generateToken(data: any) {
	const secret = process.env.NEXT_PUBLIC_SECRET_TOKEN || "secret";
	const token = jwt.sign({ data }, secret, {
		expiresIn: "1h",
	});
	return token;
}

export function verifyToken(token: string) {
	const secret = process.env.NEXT_PUBLIC_SECRET_TOKEN || "secret";
	const data = jwt.verify(token, secret);
	return data;
}

export function formatError(error: unknown) {
	if (error instanceof Error) {
		return { message: error.message };
	}
	if (typeof error === "string") {
		return { message: error };
	}
	return "Unknown error";
}

export function formatDateFrom(time: string) {
	moment.updateLocale("vi", {
		relativeTime: {
			future: "trong %s",
			past: "%s trước",
			s: "vài giây",
			ss: "%d giây",
			m: "một phút",
			mm: "%d phút",
			h: "một giờ",
			hh: "%d giờ",
			d: "một ngày",
			dd: "%d ngày",
			M: "một tháng",
			MM: "%d tháng",
			y: "một năm",
			yy: "%d năm",
		},
	});
	return moment(time).fromNow();
}
