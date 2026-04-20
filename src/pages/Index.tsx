"use client";

import React, { useState } from 'react';
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import PeriodFilter from "@/components/dashboard/PeriodFilter";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Bell, Search, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { signOut } = useAuth();
  // Alterado para 'all-time' por padrão para facilitar a visualização inicial dos dados importados
  const [period, setPeriod] = useState('all-time');

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-orange-600">
              GastosCasa
            </h1>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1.5 w-96">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Buscar despesas..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-rose-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-rose-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <UserCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Controle de Gastos 👋</h2>
            <p className="text-muted-foreground">Acompanhe para onde está indo o dinheiro da sua casa.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <PeriodFilter value={period} onValueChange={setPeriod} />
            <AddTransactionDialog />
          </div>
        </div>

        <SummaryCards period={period} />

        <div className="grid gap-6 lg:grid-cols-3">
          <TransactionList period={period} />
          <ExpenseChart period={period} />
        </div>
      </main>

      <footer className="mt-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;