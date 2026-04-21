"use client";

import React, { useState } from 'react';
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import PeriodFilter from "@/components/dashboard/PeriodFilter";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { LogOut, UserCircle, Wallet } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

const Index = () => {
  const { signOut } = useAuth();
  const [month, setMonth] = useState(format(new Date(), 'MM'));
  const [year, setYear] = useState(format(new Date(), 'yyyy'));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center shrink-0">
              <Wallet className="text-white h-5 w-5" />
            </div>
            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-orange-600 truncate">
              HomeExpenses
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => signOut()}
              className="text-muted-foreground hover:text-rose-600 h-9 w-9"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <UserCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-6 md:pt-8 space-y-6 md:space-y-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Controle de Gastos 👋</h2>
            <p className="text-sm md:text-base text-muted-foreground">Acompanhe suas finanças domésticas com eficiência.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <PeriodFilter 
              month={month} 
              year={year} 
              onMonthChange={setMonth} 
              onYearChange={setYear} 
            />
            <div className="pt-2 sm:pt-0">
              <AddTransactionDialog />
            </div>
          </div>
        </div>

        <SummaryCards month={month} year={year} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <TransactionList month={month} year={year} />
          </div>
          <div className="order-1 lg:order-2">
            <ExpenseChart month={month} year={year} />
          </div>
        </div>
      </main>

      <footer className="mt-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;