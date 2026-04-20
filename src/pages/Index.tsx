"use client";

import React, { useState } from 'react';
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import PeriodFilter from "@/components/dashboard/PeriodFilter";
import ComparisonSummary from "@/components/dashboard/ComparisonSummary";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Bell, Search, LogOut, UserCircle, columns2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/label";
import { format } from 'date-fns';

const Index = () => {
  const { signOut } = useAuth();
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  
  const [month1, setMonth1] = useState(format(new Date(), 'MM'));
  const [year1, setYear1] = useState(format(new Date(), 'yyyy'));

  const [month2, setMonth2] = useState(format(new Date(), 'MM'));
  const [year2, setYear2] = useState(format(new Date(), 'yyyy'));

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
          
          <div className="flex items-center gap-4">
            <Button 
              variant={isComparisonMode ? "default" : "outline"}
              onClick={() => setIsComparisonMode(!isComparisonMode)}
              className={isComparisonMode ? "bg-rose-600" : ""}
            >
              {isComparisonMode ? "Sair do Comparativo" : "Modo Comparativo"}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
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
            <h2 className="text-3xl font-bold tracking-tight">
              {isComparisonMode ? "Comparativo de Períodos" : "Controle de Gastos 👋"}
            </h2>
            <p className="text-muted-foreground">
              {isComparisonMode ? "Compare as despesas entre dois meses diferentes." : "Acompanhe para onde está indo o dinheiro da sua casa."}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="space-y-2">
              {isComparisonMode && <span className="text-xs font-bold text-rose-600 uppercase">Período A</span>}
              <PeriodFilter 
                month={month1} 
                year={year1} 
                onMonthChange={setMonth1} 
                onYearChange={setYear1} 
              />
            </div>

            {isComparisonMode && (
              <>
                <div className="h-10 w-px bg-slate-200 hidden md:block" />
                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase">Período B</span>
                  <PeriodFilter 
                    month={month2} 
                    year={year2} 
                    onMonthChange={setMonth2} 
                    onYearChange={setYear2} 
                  />
                </div>
              </>
            )}
            
            {!isComparisonMode && <AddTransactionDialog />}
          </div>
        </div>

        {isComparisonMode ? (
          <ComparisonSummary 
            period1={{ month: month1, year: year1 }} 
            period2={{ month: month2, year: year2 }} 
          />
        ) : (
          <SummaryCards month={month1} year={year1} />
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <ExpenseChart 
            month={month1} 
            year={year1} 
            comparison={isComparisonMode ? { month: month2, year: year2 } : undefined} 
          />
          {!isComparisonMode && <TransactionList month={month1} year={year1} />}
        </div>
      </main>

      <footer className="mt-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;