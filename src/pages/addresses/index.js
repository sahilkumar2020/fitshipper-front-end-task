
import { useEffect, useState, useMemo } from "react";
import { toast } from 'react-toastify';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { GET, DELETE } from "../../services/client";
import { DefaultFilter, Paginator } from "../../components/common";
import { UpdateAddress } from "../../components/modals";
import { API_ENDPOINTS, COLUMNS } from "../../config/constants";

const Addresses = () => {
    const [data, setData] = useState([]);
    const [reRenderStatus, setStatus] = useState(false);
    const [addressId, selectedAddressId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        GET(API_ENDPOINTS.ADDRESSES)
            .then(result => setData(result))
            .catch(error => toast.error(error.message));
    }, [reRenderStatus]);
    const defaultColumn = useMemo(() => ({ Filter: DefaultFilter }), []);

    /**
     * Delete Address by id
     * @param {*} id 
     */
    const deleteRecord = (id) => {
        DELETE(`${API_ENDPOINTS.ADDRESSES}/${id}`).then(result => {
            toast.success('Successfully Removed!');
            setStatus(status => !status);
        }).catch(error => toast.error(error.message));
    }

    /**
     * Update address by id
     * @param {*} id 
     */
    const update = (id) => {
        selectedAddressId(id);
        setOpen(true);
    }

    const closeModal = (flag) => {
        selectedAddressId(null);
        setStatus(status => !status);
        setOpen(flag);
    }

    /**
     * Table instance creation
     */
    const tableInstance = useTable({
        columns: COLUMNS, data, initialState: {
            pageIndex: 0,
            pageSize: 5
        }, defaultColumn
    }, useFilters, useSortBy, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance;

    return (
        <div className="flex flex-col">

            <div className={"px-2 py-2"}>
                <button className={"float-right py-1 px-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}
                    onClick={() => {
                        selectedAddressId(null);
                        setOpen(true);
                    }}>
                    {"Create New Address"}
                </button>{' '}
            </div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table
                            className="min-w-full divide-y divide-gray-200"
                            {...getTableProps()}
                        >
                            <thead className="bg-gray-50">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th
                                                scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? ' 🔽'
                                                            : ' 🔼'
                                                        : ''}
                                                </span>

                                                <div>{column.filter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))}
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}
                                className="bg-white divide-y divide-gray-200">
                                {
                                    page.map(row => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    const props = cell.column.update ? {
                                                        onClick: () => update(row.original.id)
                                                    } : {};

                                                    return (
                                                        <td
                                                            className="px-6 py-4 whitespace-nowrap"
                                                            {...{ ...props, ...cell.getCellProps() }}
                                                        >
                                                            {cell.render('Cell') || "-"}
                                                        </td>
                                                    )
                                                })}
                                                <td>
                                                    <button className={"py-0 px-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"}
                                                        onClick={() => deleteRecord(row.original.id)}>
                                                        {'Remove'}
                                                    </button>{' '}
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Paginator {...{
                setPageSize, pageIndex, pageOptions, pageSize, previousPage,
                nextPage, canPreviousPage, canNextPage
            }} />

            <UpdateAddress 
                {...{ open, setOpen: closeModal, id: addressId }} 
            />
        </div >
    )

}

export default Addresses;
