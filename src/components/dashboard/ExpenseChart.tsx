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
  Cell
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';

interface ExpenseChartProps {
  month: string;
  year: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  'Housing': 'Moradia',
  'Food': 'Alimentação',
  'Transport': 'Transporte',
  'Leisure': 'Lazer',
  'Others': 'Outros',
};

const COLORS: Record<string, string> = {
  'Housing': '#4F46E5',
  'Food': '#10B981',
  'Transport': '#F59E0B',
  'Leisure': '#EC4899',
  'Others': '#6B7280',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        padding: '8px 12px',
        fontSize: 12,
      }}>
        <p style={{ fontWeight: 600, marginBottom: 2, color: '#1e293b' }}>{label}</p>
        <p style={{ color: '#e11d48' }}>
          {Number(payload[0].value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseChart = ({ month, year }: ExpenseChartProps) => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chart-data', month, year],
    queryFn: async () => {
      let query = supabase.from('DESPESAS FINANCEIRAS').select('CATEGORIA, VALOR, "DATA VENCIMENTO"');

      if (year !== 'all') {
        if (month !== 'all') {
          const date = parseISO(`${year}-${month}-01`);
          const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
          const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
          query = query.gte('DATA VENCIMENTO', startDate).lte('DATA VENCIMENTO', endDate);
        } else {
          query = query.gte('DATA VENCIMENTO', `${year}-01-01`).lte('DATA VENCIMENTO', `${year}-12-31`);
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      const grouped = data.reduce((acc: any, curr) => {
        const cat = curr.CATEGORIA || 'Others';
        acc[cat] = (acc[cat] || 0) + Number(curr.VALOR);
        return acc;
      }, {});

      return Object.keys(grouped)
        .map(key => ({
          name: CATEGORY_LABELS[key] || key,
          originalKey: key,
          value: grouped[key],
          color: COLORS[key] || COLORS['Others'],
        }))
        // Ordem alfabética pelo nome em português
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    },
  });

  // Altura dinâmica: 60px por barra + margens
  const chartHeight = chartData ? Math.max(chartData.length * 60 + 16, 180) : 180;

  return (
    <Card className="col-span-1 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Distribuição por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: chartHeight }} className="flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-rose-600 animate-spin" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(v) =>
                    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
                  }
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32}>
                  {chartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
