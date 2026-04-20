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

interface PeriodFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PeriodFilter = ({ value, onValueChange }: PeriodFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[200px] bg-white border-none shadow-sm focus:ring-rose-500">
          <SelectValue placeholder="Selecionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last-month">Mês Passado</SelectItem>
          <SelectItem value="this-month">Este Mês</SelectItem>
          <SelectItem value="next-month">Próximo Mês (Projeção)</SelectItem>
          <SelectItem value="next-3-months">Próximos 3 Meses</SelectItem>
          <SelectItem value="this-year">Este Ano</SelectItem>
          <SelectItem value="all-time">Todo o Período</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodFilter;