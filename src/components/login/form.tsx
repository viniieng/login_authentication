"use client";

import { LoginResponse } from "@/src/app/api/login/route";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useRef, useState } from "react";

export function LoginForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const handleRLoginClick = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormError("");
      setFormLoading(true);

      if (
        emailInputRef.current &&
        passwordInputRef.current
      ) {
        const email = emailInputRef.current?.value;
        const password = passwordInputRef.current.value;

        try {
          const response = await axios.post<LoginResponse>("/api/login", {
            email,
            password,
          });

          setFormLoading(false);
        } catch (error) {
          setFormError("login invalid");
          setFormLoading(false);
        }
      }
    },
    []
  );

  return (
    <form onSubmit={(event) => handleRLoginClick(event)}>
      <Card className="w-full max-w-sm m-auto mt-5">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Insira seus dados para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              ref={passwordInputRef}
              id="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="grid">
          {formError && (
            <div className="text-red-600 mb-4">
              <p className="text-sm font-semibold">Erro no Login</p>
              <p>Verifique suas credenciais.</p>
            </div>
          )}
          <Button
            className="w-full flex items-center gap-2"
            disabled={formLoading}
          >
            {formLoading && <LoaderCircle className="w-[18px] animate-spin" />}
            Entrar
          </Button>
          <div className="mt-5 underline text-center">
          <Link href="/register">Ir para o cadastro </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
