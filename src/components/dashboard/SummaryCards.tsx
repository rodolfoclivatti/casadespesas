"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react";

const SummaryCards = () => {
  const stats = [
    {
      title: "Saldo Total",
      amount: "R$ 4.250,00",
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Receitas",
      amount: "R$ 7.000,00",
      icon: ArrowUpCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Despesas",
      amount: "R$ 2.750,00",
      icon: ArrowDownCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Economia",
      amount: "39%",
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.amount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2.5% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;