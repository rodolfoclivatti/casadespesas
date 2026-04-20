"use client";

import React from 'react';
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Bell, Search, UserCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              FinançasCasa
            </h1>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1.5 w-96">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Buscar transações..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-indigo-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <UserCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Olá, Bem-vindo de volta! 👋</h2>
            <p className="text-muted-foreground">Aqui está o resumo das finanças da sua casa hoje.</p>
          </div>
          <AddTransactionDialog />
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <TransactionList />
          <ExpenseChart />
        </div>
      </main>

      <footer className="mt-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;