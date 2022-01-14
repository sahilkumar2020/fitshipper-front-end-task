// Define a default UI for filtering
const DefaultFilter = ({ column: { filterValue, preFilteredRows, setFilter },
}) => {
    return (
        <input
            className="h-7 mt-2 border-solid border-4"
            value={filterValue || ''}
            onClick={(e) => e.stopPropagation()}
            onChange={e => setFilter(e.target.value || undefined)}
            placeholder={`Search records...`}
        />
    )
}

export default DefaultFilter;