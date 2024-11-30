import axios from "axios";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

export default async function Home() {
  try {
    const requestHeaders = headers();
    const headerObject = Object.fromEntries(requestHeaders.entries());

    const cookieStore = cookies();
    const cookieHeader = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");

    await axios.get(`${process.env.API_URL}/login`, {
      headers: {
        ...headerObject, 
        Cookie: cookieHeader, 
      },
    });
  } catch (error) {
    console.error("Erro na autenticação:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Usuário está logado</h1>
    </div>
  );
}