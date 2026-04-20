"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle } from "lucide-react";

const SummaryCards = () => {
  return (
    <div className="flex justify-start">
      <Card className="w-full md:w-72 border-none shadow-sm hover:shadow-md transition-shadow bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Gastos
          </CardTitle>
          <div className="p-2 rounded-full bg-rose-50">
            <ArrowDownCircle className="h-4 w-4 text-rose-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-rose-600">R$ 2.750,00</div>
          <p className="text-xs text-muted-foreground mt-1">
            No período selecionado
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;