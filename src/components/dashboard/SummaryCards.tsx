"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, Loader2 } from "lucide-react";
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';

const SummaryCards = ({ period }: { period: string }) => {
  const { data: total, isLoading } = useQuery({
    queryKey: ['total-expenses', period],
    queryFn: async () => {
      let query = supabase.from('DESPESAS FINANCEIRAS').select('VALOR');
      
      const now = new Date();
      let startDate, endDate;

      if (period === 'this-year') {
        startDate = `${now.getFullYear()}-01-01`;
        endDate = `${now.getFullYear()}-12-31`;
      } else if (period.includes('-')) {
        // Formato yyyy-MM
        const date = parseISO(`${period}-01`);
        startDate = format(startOfMonth(date), 'yyyy-MM-dd');
        endDate = format(endOfMonth(date), 'yyyy-MM-dd');
      }

      if (startDate && endDate && period !== 'all-time') {
        query = query.gte('DATA VENCIMENTO', startDate).lte('DATA VENCIMENTO', endDate);
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