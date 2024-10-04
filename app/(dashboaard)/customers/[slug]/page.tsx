import Header from "./Header";
import PersonalInfo from './PersonalInfo';

export default async function CustomerDetailsPage({ params }: { params: { slug: string } }) {
    const data = (await fetch(`${process.env.BASE_URL}/customers/${params.slug}`, { cache: 'no-store' }));
    const customer = await data.json();
    const { tags, companiesCustomers, ...remaining } = customer;
    console.log(companiesCustomers[0].companyRolesCompanyCustomers)
    return (
        <>
            <Header
                name={`${customer.firstName} ${customer.lastName}`}
                canDelete={customer.canDelete}
                id={customer.id}
                verifiedEmail={customer.verifiedEmail}
                validEmailAddress={customer.validEmailAddress}
            />
            <PersonalInfo tags={tags ? tags.split(',') : []} {...remaining} />
        </>
    )

}
