import CompanyInfo from "./CompanyInfo";
import CustomerInfo from "./CustomerInfo";
import Header from "./Header";
import RoleInfo from "./RoleInfo";

export default async function CompanyDetailsPage({ params }: { params: { slug: string } }) {
    const data = (await fetch(`${process.env.BASE_URL}/companies/${params.slug}`, { cache: 'no-store' }));
    const { data: company } = await data.json();
    const { customers, companyRoles, ...companyInfo } = company;
    console.log(customers)
    return (
        <>
            <Header name={companyInfo.name} ordersCount={companyInfo.ordersCount} id={companyInfo.id} />
            <CompanyInfo info={companyInfo} />
            <RoleInfo roles={companyRoles} />
            <CustomerInfo customers={customers} />
        </>
    )

}