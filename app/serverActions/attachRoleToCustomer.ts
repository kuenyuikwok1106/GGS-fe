'use server';

import { revalidatePath } from "next/cache";

export default async function attachRoleToCustomer(customerId: string, formData: FormData) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/customers/${customerId}`, {
            method: "PATCH",
            body: formData,
        });
        // const json = await res.json();
        // if(!json.data) throw new Error(json.errors.map((e: any) => e.message).join('\n'));
    } catch (error: any) {
        throw new Error(error.message)
    }
    // mutate data
    revalidatePath(`/customers/${customerId}`);
}