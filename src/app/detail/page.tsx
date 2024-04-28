function DetailPage({
    searchParams,
}: {
    searchParams: {
        type: string;
        id: string;
        [key: string]: string | undefined;
    };
}) {
    return (
        <div>
            <h1>Detail Page</h1>
            <p>Type: {searchParams.type}</p>
            <p>ID: {searchParams.id}</p>
        </div>
    );
}

export default DetailPage;
