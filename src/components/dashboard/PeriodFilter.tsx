"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PeriodFilterProps {
  month: string;
  year: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const months = [
  { value: "all", label: "All months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = ["2023", "2024", "2025", "2026", "2027"];

const PeriodFilter = ({ month, year, onMonthChange, onYearChange }: PeriodFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
      <div className="flex flex-col gap-1 flex-1 sm:flex-none">
        <span className="text-[10px] font-bold uppercase text-slate-400 ml-1">Month</span>
        <Select value={month} onValueChange={onMonthChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-slate-50 border-none shadow-none focus:ring-rose-500 h-10">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1 flex-1 sm:flex-none">
        <span className="text-[10px] font-bold uppercase text-slate-400 ml-1">Year</span>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="w-full sm:w-[110px] bg-slate-50 border-none shadow-none focus:ring-rose-500 h-10">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PeriodFilter;