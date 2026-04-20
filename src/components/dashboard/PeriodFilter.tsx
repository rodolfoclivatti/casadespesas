"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

const PeriodFilter = () => {
  return (
    <div className="flex items-center gap-2">
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
      <Select defaultValue="this-month">
        <SelectTrigger className="w-[180px] bg-white border-none shadow-sm focus:ring-indigo-500">
          <SelectValue placeholder="Selecionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this-month">Este Mês</SelectItem>
          <SelectItem value="last-month">Mês Passado</SelectItem>
          <SelectItem value="last-3-months">Últimos 3 Meses</SelectItem>
          <SelectItem value="this-year">Este Ano</SelectItem>
          <SelectItem value="all-time">Todo o Período</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodFilter;