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
import ListingTable from './ListingTable';

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
    return (
        <ListingTable segment={params.slug}/>
    )
}