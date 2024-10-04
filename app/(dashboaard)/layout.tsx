import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import GlobalBreadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

export default function DashboardPagesLayout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <PageContainer>
        <GlobalBreadcrumbs />
        {props.children}
      </PageContainer>
    </DashboardLayout>
  );
}
