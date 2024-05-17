export function BottomNavMobile() {
	return (
		<nav className='md:hidden fixed -bottom-1 left-0 right-0 h-[50px] bg-black shadow-lg'>
			<ul className='grid grid-cols-3 h-full items-center'>
				<li className='text-center'>Download</li>
				<li className='text-center'>Guide</li>
				<li className='text-center'>Quest</li>
			</ul>
		</nav>
	);
}
