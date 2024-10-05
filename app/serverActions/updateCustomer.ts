'use server'

import { revalidatePath } from "next/cache";


export default async function updateCustomer(customerId: string, formData: FormData) {
    try {
        const tags = formData.getAll('tags');
        formData.delete('tags')
        formData.set('tags', tags.join(','))
        const res = await fetch(`${process.env.BASE_URL}/customers/${customerId}`, {
            method: "PATCH",
            body: formData,
        });
        const json = await res.json();
        if(!json.data) throw new Error(json.errors.map((e: any) => e.message).join('\n'));
    } catch (error: any) {
        throw new Error(error.message)
    }
    revalidatePath(`/customers/${customerId}`);
}