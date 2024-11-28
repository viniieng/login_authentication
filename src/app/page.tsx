import axios from "axios";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Home() {
  try {
    const cookie = (await headers()).get("cookie");

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

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Usuário está logado</h1>
    </div>
  );
}
