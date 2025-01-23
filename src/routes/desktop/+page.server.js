import { BASE_API_URl } from "$env/static/private";
import axios from "axios";

export async function load({params, locals}) {
    try {
        const response = await axios.post(`${BASE_API_URl}/bot`,{
            key:locals.user
        })
        if (response.data) {
            return {
                data: response.data,
                user: locals.user
            }
        }
    } catch (error) {
        console.log(error);
    }
}