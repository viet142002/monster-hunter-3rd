function Loading() {
    return (
        <>
            <div>
                <ul className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4 justify-items-center justify-between'>
                    {Array(20)
                        .fill(null)
                        .map((_, index) => (
                            <li
                                key={index}
                                className='rounded-md overflow-hidden w-full'
                            >
                                <div className='w-full mx-auto h-[300px] animate-pulse bg-gray-300'></div>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
}

export default Loading;
