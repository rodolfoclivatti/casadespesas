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

const COLORS: Record<string, string> = {
  'Moradia': '#4F46E5',
  'Alimentação': '#10B981',
  'Transporte': '#F59E0B',
  'Lazer': '#EC4899',
  'Outros': '#6B7280',
};

const ExpenseChart = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chart-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('DESPESAS FINANCEIRAS')
        .select('CATEGORIA, VALOR');
      
      if (error) throw error;

      const grouped = data.reduce((acc: any, curr) => {
        const cat = curr.CATEGORIA || 'Outros';
        acc[cat] = (acc[cat] || 0) + Number(curr.VALOR);
        return acc;
      }, {});

      return Object.keys(grouped).map(key => ({
        name: key,
        value: grouped[key],
        color: COLORS[key] || COLORS['Outros']
      }));
    },
  });

  return (
    <Card className="col-span-1 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-rose-600 animate-spin" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [
                    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
                    'Total'
                  ]}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
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