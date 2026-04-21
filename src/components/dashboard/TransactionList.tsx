"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Home, Car, Coffee, Utensils, HelpCircle, Loader2, AlertCircle } from "lucide-react";
import { startOfMonth, endOfMonth, parseISO, format, isValid } from 'date-fns';

interface TransactionListProps {
  month: string;
  year: string;
}

const categoryIcons: Record<string, any> = {
  "Food": { icon: Utensils, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Housing": { icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
  "Transport": { icon: Car, color: "text-amber-600", bg: "bg-amber-50" },
  "Leisure": { icon: Coffee, color: "text-rose-600", bg: "bg-rose-50" },
  "Others": { icon: HelpCircle, color: "text-slate-600", bg: "bg-slate-50" },
};

const TransactionList = ({ month, year }: TransactionListProps) => {
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
        <h3 className="text-lg font-semibold">Error loading data</h3>
        <p className="text-muted-foreground">Check your connection or permissions.</p>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between px-4 md:px-6">
        <CardTitle className="text-lg font-semibold">
          Expenses
        </CardTitle>
        <Badge variant="secondary" className="font-medium">
          {transactions?.length || 0} items
        </Badge>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-4 md:pl-0">Description</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right pr-4 md:pr-0">Amount</TableHead>
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
                          <span className="text-[10px] text-muted-foreground sm:hidden">{item.CATEGORIA}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="font-normal text-xs">
                        {item.CATEGORIA}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                      {item["DATA VENCIMENTO"] ? new Date(item["DATA VENCIMENTO"]).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' }) : '-'}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-rose-600 pr-4 md:pr-0 text-sm md:text-base">
                      {Number(item.VALOR).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </TableCell>
                  </TableRow>
                );
              })}
              {transactions?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                    No expenses found.
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