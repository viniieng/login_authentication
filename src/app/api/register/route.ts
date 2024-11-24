import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaGetInstance } from "@/src/lib/prisma-pg";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface RegisterProps {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterResponse {
  error?: string;
  user?: User;
}

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterProps;

  const { email, password, repeatPassword } = body;

  console.log("email", email);
  console.log("password", password);
  console.log("password2", repeatPassword);

  if (!email || !password || !repeatPassword) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const emailReg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );
  if (!emailReg.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (password.length < 8 || password !== repeatPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const hash = bcrypt.hashSync(password, 12);

  try {
    const prisma = PrismaGetInstance();

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "user already exists" },
          { status: 400 }
        );
      }
    }
  }
}
