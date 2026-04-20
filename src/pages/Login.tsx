"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Home } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Por enquanto, apenas redireciona para o dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-600 rounded-2xl mb-4 shadow-lg shadow-rose-200">
            <Home className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">GastosCasa</h1>
          <p className="text-slate-500 mt-2">Organize as finanças do seu lar de forma simples</p>
        </div>

        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-2xl text-center">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail para acessar sua conta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="exemplo@email.com" 
                  className="rounded-xl border-slate-200 focus:ring-rose-500"
                  required 
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button type="button" className="text-xs text-rose-600 hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  className="rounded-xl border-slate-200 focus:ring-rose-500"
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-8">
              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-11 text-base font-semibold transition-all active:scale-95">
                <LogIn className="mr-2 h-5 w-5" />
                Entrar
              </Button>
              <div className="text-center text-sm text-slate-500">
                Não tem uma conta?{" "}
                <button type="button" className="text-rose-600 font-semibold hover:underline">
                  Criar conta
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;