"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Home, Car, Coffee } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Supermercado BH",
    category: "Alimentação",
    amount: -350.50,
    date: "2024-03-20",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: 2,
    description: "Aluguel Março",
    category: "Moradia",
    amount: -1200.00,
    date: "2024-03-10",
    icon: Home,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 4,
    description: "Posto Shell",
    category: "Transporte",
    amount: -200.00,
    date: "2024-03-15",
    icon: Car,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: 5,
    description: "Starbucks",
    category: "Lazer",
    amount: -25.90,
    date: "2024-03-21",
    icon: Coffee,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const TransactionList = () => {
  return (
    <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Despesas Recentes</CardTitle>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">Ver todas</Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${transaction.bg}`}>
                      <transaction.icon className={`h-4 w-4 ${transaction.color}`} />
                    </div>
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right font-semibold text-rose-600">
                  {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionList;