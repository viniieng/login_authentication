"use client";

import { RegisterResponse } from "@/src/app/api/register/route";
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
import axios, { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useRef, useState } from "react";

export function RegisterForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleRegisterClick = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormError("");
      setFormLoading(true);

      const emailReg = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );

      if (
        emailInputRef.current &&
        repeatPasswordInputRef.current &&
        passwordInputRef.current
      ) {
        const email = emailInputRef.current?.value;
        const password = passwordInputRef.current.value;
        const repeatPassword = repeatPasswordInputRef.current.value;

        let shouldReturnError = false;

        if (!emailReg.test(email)) {
          setFormError("Digite um e-mail válido");
          shouldReturnError = true;
        }

        if (password.length < 8) {
          setFormError("A senha precisa ter pelo menos 8 caracteres.");
          shouldReturnError = true;
        }

        if (password !== repeatPassword) {
          setFormError("As senhas não são iguais.");
          shouldReturnError = true;
        }

        if (shouldReturnError) {
          setFormLoading(false);
          setFormSuccess(false);
          return;
        }

        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await axios.post<RegisterResponse>("/api/register", {
            email,
            password,
            repeatPassword,
          });

          setFormLoading(false);
          setFormSuccess(true);
        } catch (error) {
          if (error instanceof AxiosError) {
            const { error: errorMessage } = error.response
              ?.data as RegisterResponse;

            if (errorMessage === "user already exists") {
              setFormError(
                "E-mail já registrado. Tente ir ao login. "
              );
            } else {
              setFormError(errorMessage || error.message);
            }
          }
          setFormLoading(false);
          setFormSuccess(false);
        }
      }
    },
    []
  );

  return (
    <form className="mt-80" onSubmit={(event) => handleRegisterClick(event)}>
      <Card className="w-full max-w-sm m-auto mt-5">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastro</CardTitle>
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
          <div className="grid gap-2">
            <Label htmlFor="repeat-password">Repita a senha</Label>
            <Input
              ref={repeatPasswordInputRef}
              id="repeat-password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="grid">
          {formError && (
            <div className="text-red-600 mb-4">
              <p className="text-sm font-semibold">Erro no formulário</p>
              <p>{formError}</p>
            </div>
          )}
          {formSuccess && (
            <div className="text-rose-600 mb-4">
              <p className="text-sm font-semibold">
                Cadastro realizado, redirecionando para o app
              </p>
            </div>
          )}
          <Button
            className="w-full flex items-center gap-2"
            disabled={formLoading}
          >
            {formLoading && <LoaderCircle className="w-[18px] animate-spin" />}
            Cadastrar
          </Button>
          <div className="mt-5 underline text-center">
          <Link href="/login">Ir para o login </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
