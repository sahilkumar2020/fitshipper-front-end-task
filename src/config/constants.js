export const BASE_URL = "https://fsl-candidate-api-vvfym.ondigitalocean.app/v1";
export const API_ENDPOINTS = {
    ADDRESSES: "/address",
}


export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: true
    },
    {
        Header: 'Address 1',
        accessor: 'address1',
        filter: true
    },
    {
        Header: 'Address 2',
        accessor: 'address2',
        disableSortBy: true
    },
    {
        Header: 'City',
        accessor: 'city',
        filter: true
    },
    {
        Header: 'State',
        accessor: 'state',
        filter: 'fuzzyText',
        filter: true
    },
    {
        Header: 'ZIP',
        accessor: 'zip',
        disableSortBy: true
    }
]
