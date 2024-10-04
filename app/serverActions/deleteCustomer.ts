'use server'

import { redirect } from "next/navigation";

export default async function deleteCustomer(customerId: string, formData: FormData) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/customers/${customerId}`, {
            method: "DELETE",
        });
        const json = await res.json();
        if(!json.data) throw new Error(json.errors.map((e: any) => e.message).join('\n'));
    } catch (error: any) {
        throw new Error(error.message)
    }
    redirect('/customers');
}