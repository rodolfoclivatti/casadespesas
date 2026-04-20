"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, Loader2 } from "lucide-react";
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';

interface SummaryCardsProps {
  month: string;
  year: string;
}

const SummaryCards = ({ month, year }: SummaryCardsProps) => {
  const { data: total, isLoading } = useQuery({
    queryKey: ['total-expenses', month, year],
    queryFn: async () => {
      let query = supabase.from('DESPESAS FINANCEIRAS').select('VALOR');
      
      if (year !== 'all') {
        if (month !== 'all') {
          // Mês e Ano específicos
          const date = parseISO(`${year}-${month}-01`);
          const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
          const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
          query = query.gte('DATA VENCIMENTO', startDate).lte('DATA VENCIMENTO', endDate);
        } else {
          // Ano inteiro
          query = query.gte('DATA VENCIMENTO', `${year}-01-01`).lte('DATA VENCIMENTO', `${year}-12-31`);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data.reduce((acc, curr) => acc + Number(curr.VALOR), 0);
    },
  });

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
          {isLoading ? (
            <Loader2 className="h-6 w-6 text-rose-600 animate-spin" />
          ) : (
            <div className="text-3xl font-bold text-rose-600">
              {total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            No período selecionado
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;