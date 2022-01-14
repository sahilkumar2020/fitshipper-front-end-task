const Paginator = ({
    setPageSize,
    pageIndex,
    pageOptions,
    pageSize,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
}) => {
    return <div className="mt-4">
        <div className="p-6 float-right">
            <button className={"py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}
                onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'< Previous'}
            </button>{' '}
            <button className={"py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}
                onClick={() => nextPage()} disabled={!canNextPage}>
                {'Next >'}
            </button>{' '}
            <span className={"ml-3"}>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[5, 10, 25].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>

    </div>
}

export default Paginator;