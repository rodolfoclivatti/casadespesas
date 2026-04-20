"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, CreditCard, Calendar, AlertCircle } from "lucide-react";

const SummaryCards = () => {
  const stats = [
    {
      title: "Total de Gastos",
      amount: "R$ 2.750,00",
      icon: ArrowDownCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Média Diária",
      amount: "R$ 91,66",
      icon: Calendar,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Transações",
      amount: "12",
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Maior Gasto",
      amount: "R$ 1.200,00",
      icon: AlertCircle,
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
              No período selecionado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;