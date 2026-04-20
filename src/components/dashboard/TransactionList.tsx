"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Home, Car, Coffee, Utensils, HelpCircle, Loader2, AlertCircle } from "lucide-react";
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';

const categoryIcons: Record<string, any> = {
  "Alimentação": { icon: Utensils, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Moradia": { icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
  "Transporte": { icon: Car, color: "text-amber-600", bg: "bg-amber-50" },
  "Lazer": { icon: Coffee, color: "text-rose-600", bg: "bg-rose-50" },
  "Outros": { icon: HelpCircle, color: "text-slate-600", bg: "bg-slate-50" },
};

const TransactionList = ({ period }: { period: string }) => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', period],
    queryFn: async () => {
      let query = supabase.from('DESPESAS FINANCEIRAS').select('*');
      
      const now = new Date();
      let startDate, endDate;

      if (period === 'this-year') {
        startDate = `${now.getFullYear()}-01-01`;
        endDate = `${now.getFullYear()}-12-31`;
      } else if (period.includes('-')) {
        const date = parseISO(`${period}-01`);
        startDate = format(startOfMonth(date), 'yyyy-MM-dd');
        endDate = format(endOfMonth(date), 'yyyy-MM-dd');
      }

      if (startDate && endDate && period !== 'all-time') {
        query = query.gte('DATA VENCIMENTO', startDate).lte('DATA VENCIMENTO', endDate);
      }

      const { data, error } = await query.order('DATA VENCIMENTO', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-2 border-none shadow-sm flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 text-rose-600 animate-spin" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="col-span-1 lg:col-span-2 border-none shadow-sm p-12 text-center">
        <AlertCircle className="h-12 w-12 text-rose-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Erro ao carregar dados</h3>
        <p className="text-muted-foreground">Verifique sua conexão ou permissões.</p>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Despesas do Período
        </CardTitle>
        <Badge variant="outline">{transactions?.length || 0} itens</Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((item) => {
              const config = categoryIcons[item.CATEGORIA] || categoryIcons["Outros"];
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${config.bg}`}>
                        <config.icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      {item.DESCRIÇÃO}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {item.CATEGORIA}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item["DATA VENCIMENTO"] ? new Date(item["DATA VENCIMENTO"]).toLocaleDateString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-rose-600">
                    {Number(item.VALOR).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                </TableRow>
              );
            })}
            {transactions?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  Nenhuma despesa encontrada para este período.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionList;