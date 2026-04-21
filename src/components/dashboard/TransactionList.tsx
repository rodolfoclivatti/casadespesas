"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Car, Coffee, Utensils, HelpCircle, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { startOfMonth, endOfMonth, parseISO, format, isValid } from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';

interface TransactionListProps {
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

const categoryIcons: Record<string, any> = {
  "Food": { icon: Utensils, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Housing": { icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
  "Transport": { icon: Car, color: "text-amber-600", bg: "bg-amber-50" },
  "Leisure": { icon: Coffee, color: "text-rose-600", bg: "bg-rose-50" },
  "Others": { icon: HelpCircle, color: "text-slate-600", bg: "bg-slate-50" },
};

const TransactionList = ({ month, year }: TransactionListProps) => {
  const queryClient = useQueryClient();

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', month, year],
    queryFn: async () => {
      let query = supabase.from('DESPESAS FINANCEIRAS').select('*');
      
      if (year !== 'all') {
        if (month !== 'all') {
          const dateStr = `${year}-${month}-01`;
          const date = parseISO(dateStr);
          if (isValid(date)) {
            const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
            const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
            query = query.gte('DATA VENCIMENTO', startDate).lte('DATA VENCIMENTO', endDate);
          }
        } else {
          query = query.gte('DATA VENCIMENTO', `${year}-01-01`).lte('DATA VENCIMENTO', `${year}-12-31`);
        }
      }

      const { data, error } = await query.order('DATA VENCIMENTO', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('DESPESAS FINANCEIRAS')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['total-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['chart-data'] });
      showSuccess('Despesa excluída com sucesso');
    },
    onError: (error: any) => {
      showError('Erro ao excluir despesa: ' + error.message);
    }
  });

  if (isLoading) {
    return (
      <Card className="border-none shadow-sm flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 text-rose-600 animate-spin" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-none shadow-sm p-12 text-center">
        <AlertCircle className="h-12 w-12 text-rose-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Erro ao carregar dados</h3>
        <p className="text-muted-foreground">Verifique sua conexão ou permissões.</p>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6">
        <CardTitle className="text-lg font-semibold">
          Despesas
        </CardTitle>
        <Badge variant="secondary" className="font-medium">
          {transactions?.length || 0} itens
        </Badge>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-4 md:pl-0">Descrição</TableHead>
                <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((item) => {
                const config = categoryIcons[item.CATEGORIA] || categoryIcons["Others"];
                return (
                  <TableRow key={item.id} className="group">
                    <TableCell className="font-medium pl-4 md:pl-0">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={`p-1.5 md:p-2 rounded-full ${config.bg} shrink-0`}>
                          <config.icon className={`h-3.5 w-3.5 md:h-4 md:w-4 ${config.color}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm md:text-base line-clamp-1">{item.DESCRIÇÃO}</span>
                          <span className="text-[10px] text-muted-foreground sm:hidden">{CATEGORY_LABELS[item.CATEGORIA] || item.CATEGORIA}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="font-normal text-xs">
                        {CATEGORY_LABELS[item.CATEGORIA] || item.CATEGORIA}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                      {item["DATA VENCIMENTO"] ? new Date(item["DATA VENCIMENTO"]).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '-'}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-rose-600 text-sm md:text-base">
                      {Number(item.VALOR).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                    <TableCell className="pr-4 md:pr-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {transactions?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    Nenhuma despesa encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;