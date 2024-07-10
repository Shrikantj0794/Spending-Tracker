"use client"

import { ColumnDef } from "@tanstack/react-table"
export type Transaction = {
    title: string,
    description: string,
    amount: string,
    transactionType:string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionType",
    header: "Income / Expense",
  },
]
