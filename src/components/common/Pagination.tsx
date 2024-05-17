"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

import { usePagination } from "@/helpers/hooks";

interface IPagination {
	total: number;
	pageSize?: number;
	siblingCount?: number;
	className?: string;
}

export function Pagination({
	total,
	pageSize = 10,
	siblingCount = 1,
	className = "",
}: IPagination) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const { replace } = useRouter();

	const paginationRange = usePagination({
		currentPage,
		totalCount: total,
		siblingCount,
		pageSize,
	});

	if (!paginationRange) {
		return null;
	}

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const onPageChange = (page: number) => {
		if (page === currentPage) {
			return;
		}
		const url = createPageURL(page);
		replace(url);
	};

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		if (currentPage === paginationRange[paginationRange.length - 1]) {
			return;
		}
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		if (currentPage === 1) {
			return;
		}
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];

	const paginationItem =
		"bg-gray-900 w-8 h-8 flex justify-center items-center rounded-full";

	return (
		<ul className={`flex justify-center gap-3 ${className}`}>
			<li
				className={`${paginationItem}`}
				style={{
					cursor: currentPage === 1 ? "default" : "pointer",
					color: currentPage === 1 ? "#000" : "#007bff",
				}}
				onClick={onPrevious}
			>
				<ChevronLeftIcon />
			</li>
			{paginationRange.map((pageNumber, index) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (typeof pageNumber === "string") {
					return (
						<li key={index} className='pagination-item dots'>
							&#8230;
						</li>
					);
				}

				// Render our Page Pills
				return (
					<li
						key={index}
						className={`${paginationItem}`}
						style={{
							cursor: "pointer",
							color:
								currentPage === pageNumber
									? "#007bff"
									: "#ffffff",
						}}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			{/*  Right Navigation arrow */}
			<li
				className={`${paginationItem}`}
				style={{
					cursor: currentPage === lastPage ? "default" : "pointer",
					color: currentPage === lastPage ? "#000" : "#007bff",
				}}
				onClick={onNext}
			>
				<ChevronRightIcon />
			</li>
		</ul>
	);
}
