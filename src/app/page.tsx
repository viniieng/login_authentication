import axios from "axios";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Home() {
  try {
    const cookie = headers().get("cookie"); 

    await axios.get(`${process.env.API_URL}/login`, {
      headers: {
        cookie,
      },
      withCredentials: true, 
    });
  } catch (error) {
    console.error("Error during authentication:", error); 
    redirect("/login");
  }

  return <h1>Hello World</h1>;
}