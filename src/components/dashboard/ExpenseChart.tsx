"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';

interface ExpenseChartProps {
  month: string;
  year: string;
  comparison?: { month: string; year: string };
}

const ExpenseChart = ({ month, year, comparison }: ExpenseChartProps) => {
  const fetchData = async (m: string, y: string) => {
    let query = supabase.from('DESPESAS FINANCEIRAS').select('CATEGORIA, VALOR, "DATA VENCIMENTO"');
    if (y !== 'all') {
      if (m !== 'all') {
        const date = parseISO(`${y}-${m}-01`);
        query = query.gte('DATA VENCIMENTO', format(startOfMonth(date), 'yyyy-MM-dd'))
                     .lte('DATA VENCIMENTO', format(endOfMonth(date), 'yyyy-MM-dd'));
      } else {
        query = query.gte('DATA VENCIMENTO', `${y}-01-01`).lte('DATA VENCIMENTO', `${y}-12-31`);
      }
    }
    const { data, error } = await query;
    if (error) throw error;
    return data.reduce((acc: any, curr) => {
      const cat = curr.CATEGORIA || 'Outros';
      acc[cat] = (acc[cat] || 0) + Number(curr.VALOR);
      return acc;
    }, {});
  };

  const { data: data1, isLoading: loading1 } = useQuery({
    queryKey: ['chart-data', month, year],
    queryFn: () => fetchData(month, year),
  });

  const { data: data2, isLoading: loading2 } = useQuery({
    queryKey: ['chart-data', comparison?.month, comparison?.year],
    queryFn: () => comparison ? fetchData(comparison.month, comparison.year) : Promise.resolve(null),
    enabled: !!comparison,
  });

  if (loading1 || loading2) {
    return (
      <Card className="col-span-1 border-none shadow-sm h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-rose-600 animate-spin" />
      </Card>
    );
  }

  const categories = Array.from(new Set([...Object.keys(data1 || {}), ...Object.keys(data2 || {})]));
  const chartData = categories.map(cat => ({
    name: cat,
    period1: data1?.[cat] || 0,
    period2: data2?.[cat] || 0,
  }));

  return (
    <Card className="col-span-1 lg:col-span-3 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {comparison ? 'Comparativo por Categoria' : 'Distribuição por Categoria'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar name="Período A" dataKey="period1" fill="#e11d48" radius={[4, 4, 0, 0]} barSize={comparison ? 30 : 50} />
              {comparison && (
                <Bar name="Período B" dataKey="period2" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;