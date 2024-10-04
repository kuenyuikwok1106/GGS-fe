'use server'

import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'

export default async function createCustomer(formData: FormData) {
    let id;
    try {
        const res = await fetch(`${process.env.BASE_URL}/companies`, {
            method: "POST",
            body: formData,
        });
        const json = await res.json();
        console.log(json)
        if(!json.data) throw new Error(json.errors.map((e: any) => e.message).join('\n'));
        const idSegment = json.data.id.split('/');
        id = idSegment[idSegment.length - 1];
    } catch (error: any) {
        throw new Error(error.message)
    }
    // mutate data
    revalidatePath('/companies');
    redirect(`/companies/${id}`)
}