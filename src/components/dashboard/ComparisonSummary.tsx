"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Loader2, Equals } from "lucide-react";
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';

interface ComparisonSummaryProps {
  period1: { month: string; year: string };
  period2: { month: string; year: string };
}

const ComparisonSummary = ({ period1, period2 }: ComparisonSummaryProps) => {
  const fetchTotal = async (month: string, year: string) => {
    let query = supabase.from('DESPESAS FINANCEIRAS').select('VALOR');
    if (year !== 'all') {
      if (month !== 'all') {
        const date = parseISO(`${year}-${month}-01`);
        query = query.gte('DATA VENCIMENTO', format(startOfMonth(date), 'yyyy-MM-dd'))
                     .lte('DATA VENCIMENTO', format(endOfMonth(date), 'yyyy-MM-dd'));
      } else {
        query = query.gte('DATA VENCIMENTO', `${year}-01-01`).lte('DATA VENCIMENTO', `${year}-12-31`);
      }
    }
    const { data, error } = await query;
    if (error) throw error;
    return data.reduce((acc, curr) => acc + Number(curr.VALOR), 0);
  };

  const { data: total1, isLoading: loading1 } = useQuery({
    queryKey: ['total', period1.month, period1.year],
    queryFn: () => fetchTotal(period1.month, period1.year),
  });

  const { data: total2, isLoading: loading2 } = useQuery({
    queryKey: ['total', period2.month, period2.year],
    queryFn: () => fetchTotal(period2.month, period2.year),
  });

  if (loading1 || loading2) return <Loader2 className="h-8 w-8 animate-spin text-rose-600" />;

  const diff = (total2 || 0) - (total1 || 0);
  const percent = total1 ? (diff / total1) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Período A</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total1?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Período B</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total2?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Diferença (B - A)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold flex items-center gap-2 ${diff > 0 ? 'text-rose-600' : diff < 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
            {diff > 0 ? <ArrowUpRight className="h-5 w-5" /> : diff < 0 ? <ArrowDownRight className="h-5 w-5" /> : <Equals className="h-5 w-5" />}
            {Math.abs(diff).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            <span className="text-xs font-normal">({percent.toFixed(1)}%)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonSummary;