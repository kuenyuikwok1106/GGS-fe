'use client'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useDeferredValue, useMemo, useState } from "react"
import CircularLoader from "../../components/CircularLoader/CircularLoader"
import PageHeader from "../../components/PageHeader/PageHeader"
import useFetchList from "../../swr/useFetchList"
import CustomerRow from "./CustomerRow"
import { TBasicCompanyInfo, TBasicCustomerInfo } from "./page"
import CompanyRow from "./CompanyRow"

type TListingTable = {
    segment: string
}


export default function ListingTable({
    segment
}: Readonly<TListingTable>) {

    const renderer = useMemo(() => {
        const renderInfo = {
            'companies': {
                heading: 'Companies',
                subtitle: 'List companies and manage their details',
                createButtonText: 'Create Company',
                tableHeader: () => (
                    <TableRow>
                        <TableCell >Company</TableCell>
                        <TableCell>Orders Count</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Contact Count</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }} align="right">Delete</TableCell>
                    </TableRow>
                ),
                tableRow: (data: TBasicCompanyInfo) => (<CompanyRow key={data.id} {...data} />),
                emptyTableRow: (
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Typography variant='subtitle1' textAlign="center"> Sorry, we do not have any registered companies yet. </Typography>
                        </TableCell>
                    </TableRow>
                )
            },
            'customers': {
                heading: 'Customers',
                subtitle: 'List customers and manage their details',
                createButtonText: 'Create Customer',
                tableHeader: () => (
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell >Company</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Date joined</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Tags</TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }} align="right">Delete</TableCell>
                    </TableRow>
                ),
                tableRow: (data: TBasicCustomerInfo) => (<CustomerRow key={data.id} {...data} />),
                emptyTableRow: (
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Typography variant='subtitle1' textAlign="center"> Sorry, we do not have any registered customers yet. </Typography>
                        </TableCell>
                    </TableRow>
                )
            },
        }
        return renderInfo[segment] || renderInfo.companies
    }, [segment])

    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const { info, isLoading, isError } = useFetchList(
        deferredQuery ? `${segment}?query=${deferredQuery}` : `${segment}`
    )

    const rows = useMemo(() => {
        return info?.rows || []
    }, [info])

    return (
        <Paper sx={{ padding: 0 }}>

            <PageHeader
                header={renderer.heading}
                subtitle={renderer.subtitle}
                query={query}
                onChangeQuery={setQuery}
            />
            {
                isLoading
                ? <CircularLoader />
                : (
                    <TableContainer component={Paper} sx={{ maxHeight: '70vh', px: 2 }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                {renderer && renderer.tableHeader()}
                            </TableHead>
                            <TableBody>
                                {
                                    rows.length
                                        ? (
                                            rows.map((i) => (
                                                renderer.tableRow(i)
                                            ))
                                        ) : (
                                            renderer.emptyTableRow
                                        )

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </Paper>
    )
}