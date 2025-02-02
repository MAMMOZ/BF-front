import { redirect } from "@sveltejs/kit";
import { BASE_API_URl } from "$env/static/private";
import axios from "axios";

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const key = data.get("key");

    if (!key || typeof key !== "string") {
      return { error: "Invalid key" };
    }

    try {
      const response = await axios.post(`${BASE_API_URl}/login`, { key });

      const selectedToken = response.data?.token;
      
      
      if (!selectedToken) {
        return { error: "Token not found in response" };
      }
      
      // ตั้ง Cookie
      cookies.set("token", selectedToken.token, {
        path: "/",
        maxAge: 60 * 60 * 1, // 1 ชั่วโมง
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      console.log("selectedToken.token");
      
    } catch (error) {
        console.error("Error in login:", error);
        return { error: "Login failed. Please try again later." };
    }
    redirect(302, "/");
  },
};
