"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

const AddTransactionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Despesa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do seu novo gasto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" placeholder="Ex: Aluguel, Mercado..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input id="amount" type="number" placeholder="0,00" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moradia">Moradia</SelectItem>
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
                <SelectItem value="lazer">Lazer</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">Salvar Despesa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;