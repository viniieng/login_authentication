import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { addHours } from "date-fns";
import { cookies } from "next/headers";
import { PrismaGetInstance } from "@/src/lib/prisma-pg";
import { GenerateSession } from "@/src/lib/generate-session";

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

  if (!email || !password || !repeatPassword) {
    return NextResponse.json(
      { error: "missing required fields" },
      { status: 400 }
    );
  }

  const emailReg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  if (!emailReg.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  if (password.length < 8 || password !== repeatPassword) {
    return NextResponse.json({ error: "invalid password" }, { status: 400 });
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

    const sessionToken = GenerateSession({
      email,
      passwordHash: hash,
    });

    await prisma.sessions.create({
      data: {
        userId: user.id,
        token: sessionToken,
        valid: true,
        expiresAt: addHours(new Date(), 24),
      },
    });

    cookies().set({
      name: "auth-session",
      value: sessionToken,
      httpOnly: true,
      expires: addHours(new Date(), 24),
      path: "/",
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // usuário já existe
        return NextResponse.json(
          { error: "user already exists" },
          { status: 400 }
        );
      }
    }
    console.error("Unexpected error:", error);
  }
}