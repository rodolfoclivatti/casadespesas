"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { format, subMonths, addMonths, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PeriodFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PeriodFilter = ({ value, onValueChange }: PeriodFilterProps) => {
  // Gera os últimos 6 meses e os próximos 6 meses
  const now = new Date();
  const months = [];
  
  for (let i = -6; i <= 6; i++) {
    const date = i < 0 ? subMonths(now, Math.abs(i)) : addMonths(now, i);
    months.push({
      label: format(date, "MMMM 'de' yyyy", { locale: ptBR }),
      value: format(date, "yyyy-MM"),
    });
  }

  return (
    <div className="flex items-center gap-2">
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[240px] bg-white border-none shadow-sm focus:ring-rose-500 capitalize">
          <SelectValue placeholder="Selecionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Atalhos</SelectLabel>
            <SelectItem value="all-time">Todo o Período</SelectItem>
            <SelectItem value="this-year">Este Ano</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Meses Específicos</SelectLabel>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value} className="capitalize">
                {month.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PeriodFilter;