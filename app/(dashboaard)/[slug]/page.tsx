import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CustomerRow from './CustomerRow';
import PageHeader from '../../components/PageHeader/PageHeader';
import CompanyRow from './CompanyRow';
import CreateCustomerDialog from '../customers/CreateDialog';
import { Typography } from '@mui/material';

export type TBasicCustomerInfo = {
    id: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    companies: any[];
    imageSrc: string;
    canDelete: boolean;
    tags: string;
}

export type TBasicCompanyInfo = {
    id: string;
    name: string;
    ordersCount: number;
    contactCount: number
}

export default async function CustomersPage({ params }: { params: { slug: string } }) {
    const page = {
        customers: {
            link: "/customers",
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
        companies: {
            link: "/companies",
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
        }
    }[params.slug];

    if (!page) return;
    const data = await fetch(`${process.env.BASE_URL}${page.link}`, { cache: 'no-store' });
    const { count, rows: info }: { count: number, rows: TBasicCustomerInfo[] | TBasicCompanyInfo[] } = await data.json();
    
    return (
        <Paper sx={{ padding: 0 }}>
            <PageHeader
                header={page.heading}
                subtitle={page.subtitle}
                createButtonText={page.createButtonText}
            />
            <TableContainer component={Paper} sx={{ maxHeight: '70vh', px: 2 }}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        {page && page.tableHeader()}
                    </TableHead>
                    <TableBody>
                        {
                            page && info?.length
                                ? (
                                    info.map((i) => (
                                        page.tableRow(i)
                                    ))
                                ) : (
                                    page.emptyTableRow
                                )

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}