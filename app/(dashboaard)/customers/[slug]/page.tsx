import CompanyInfo from "./CompanyInfo";
import Header from "./Header";
import PersonalInfo from './PersonalInfo';

export default async function CustomerDetailsPage({ params }: { params: { slug: string } }) {
    const customerData = (await fetch(`${process.env.BASE_URL}/customers/${params.slug}`, { cache: 'no-store' }));
    const customerInfo = await customerData.json();
    const { companies, companyRoles: customerRoles ,tags, ...customer } = customerInfo;

    const companyData = await fetch(`${process.env.BASE_URL}/companies`, { cache: 'no-store' });
    const { rows: companyInfo } = await companyData.json();

    return (
        <>
            <Header
                name={`${customer.firstName} ${customer.lastName}`}
                canDelete={customer.canDelete}
                id={customer.id}
                verifiedEmail={customer.verifiedEmail}
                validEmailAddress={customer.validEmailAddress}
            />
            <PersonalInfo tags={tags ? tags.split(',') : []} {...customer} />
            <CompanyInfo
                customerId={customer.id}
                companies={companies}
                customerRoles={customerRoles}
                companyInfo={companyInfo}
            />
        </>
    )

}
