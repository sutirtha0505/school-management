"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from 'react'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Calendar1, Shapes } from 'lucide-react'
import Image from 'next/image';

interface MonthlyData {
  month: string
  paidAmount: number
  paidStudents: number
  unpaidAmount: number
  unpaidStudents: number
  cash: number
  bankTransfer: number
  online: number
  discount: number
}
const financialData: MonthlyData[] = [
  {
    month: "April 2024",
    paidAmount: 1671340,
    paidStudents: 1296,
    unpaidAmount: 50100,
    unpaidStudents: 39,
    cash: 1148070,
    bankTransfer: 523270,
    online: 0,
    discount: 18010,
  },
  {
    month: "May 2024",
    paidAmount: 1823450,
    paidStudents: 1342,
    unpaidAmount: 45200,
    unpaidStudents: 32,
    cash: 1250000,
    bankTransfer: 573450,
    online: 12000,
    discount: 21500,
  },
  {
    month: "June 2024",
    paidAmount: 1945670,
    paidStudents: 1389,
    unpaidAmount: 38900,
    unpaidStudents: 28,
    cash: 1320000,
    bankTransfer: 625670,
    online: 15000,
    discount: 24300,
  },
  {
    month: "July 2024",
    paidAmount: 2123890,
    paidStudents: 1456,
    unpaidAmount: 42300,
    unpaidStudents: 31,
    cash: 1423890,
    bankTransfer: 700000,
    online: 18500,
    discount: 27600,
  },
  {
    month: "August 2024",
    paidAmount: 2256780,
    paidStudents: 1523,
    unpaidAmount: 35600,
    unpaidStudents: 26,
    cash: 1556780,
    bankTransfer: 700000,
    online: 22500,
    discount: 29800,
  },
  {
    month: "September 2024",
    paidAmount: 2345890,
    paidStudents: 1578,
    unpaidAmount: 48900,
    unpaidStudents: 35,
    cash: 1645890,
    bankTransfer: 700000,
    online: 25000,
    discount: 31200,
  },
  {
    month: "October 2024",
    paidAmount: 2456780,
    paidStudents: 1634,
    unpaidAmount: 52300,
    unpaidStudents: 38,
    cash: 1756780,
    bankTransfer: 700000,
    online: 28500,
    discount: 33600,
  },
  {
    month: "November 2024",
    paidAmount: 2567890,
    paidStudents: 1689,
    unpaidAmount: 46700,
    unpaidStudents: 34,
    cash: 1867890,
    bankTransfer: 700000,
    online: 32000,
    discount: 35900,
  },
  {
    month: "December 2024",
    paidAmount: 2678900,
    paidStudents: 1745,
    unpaidAmount: 41200,
    unpaidStudents: 30,
    cash: 1978900,
    bankTransfer: 700000,
    online: 35500,
    discount: 38200,
  },
  {
    month: "January 2025",
    paidAmount: 2789010,
    paidStudents: 1801,
    unpaidAmount: 38600,
    unpaidStudents: 28,
    cash: 2089010,
    bankTransfer: 700000,
    online: 38500,
    discount: 40600,
  },
  {
    month: "February 2025",
    paidAmount: 2890120,
    paidStudents: 1856,
    unpaidAmount: 35900,
    unpaidStudents: 26,
    cash: 2190120,
    bankTransfer: 700000,
    online: 42000,
    discount: 42900,
  },
  {
    month: "March 2025",
    paidAmount: 2956780,
    paidStudents: 1912,
    unpaidAmount: 33200,
    unpaidStudents: 24,
    cash: 2256780,
    bankTransfer: 700000,
    online: 45500,
    discount: 45200,
  },
  {
    month: "April 2025",
    paidAmount: 3067890,
    paidStudents: 1967,
    unpaidAmount: 30500,
    unpaidStudents: 22,
    cash: 2367890,
    bankTransfer: 700000,
    online: 48500,
    discount: 47500,
  },
]
const FeesPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(financialData[0].month)
  
    const currentData = financialData.find((data) => data.month === selectedMonth)!
  
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      })
        .format(amount)
        .replace("INR", "₹")
    }
  return (
    <div className='w-full h-full justify-start flex flex-col gap-4 items-center pb-8'>
      <h1 className='text-center text-xl font-bold'>Payments Page</h1>
      <h2 className='text-center text-sm'>Track and analyze payment patterns across months and classes</h2>
      <Menubar className='flex justify-between items-center'>
        <MenubarMenu>
          <MenubarTrigger className='flex gap-2'>
            <Calendar1 />
            Month Wise
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className='flex gap-2'>
            <Shapes />
            Class wise
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className='w-full flex flex-wrap gap-6 justify-center items-center'>
      <Image width={500} height={500} src="/payment-status.png" alt='Payment status'/>
      <Image width={500} height={500} src="/payment-status.png" alt='Payment-status'/>
      </div>
      <Card className="bg-[#1c2127] text-gray-300 border-none max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-3xl font-light text-gray-400">{selectedMonth}</CardTitle>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px] bg-[#252a31] border-none">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {financialData.map((data) => (
              <SelectItem key={data.month} value={data.month}>
                {data.month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-emerald-400 text-lg mb-2">Paid Amount</div>
            <div className="text-4xl font-semibold mb-2">{formatCurrency(currentData.paidAmount)}</div>
            <div className="text-gray-500">{currentData.paidStudents} students</div>
          </div>

          <div>
            <div className="text-red-400 text-lg mb-2">Unpaid Amount</div>
            <div className="text-4xl font-semibold mb-2">{formatCurrency(currentData.unpaidAmount)}</div>
            <div className="text-gray-500">{currentData.unpaidStudents} students</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg">Cash</div>
            <div className="text-xl">{formatCurrency(currentData.cash)}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-lg">Bank Transfer</div>
            <div className="text-xl">{formatCurrency(currentData.bankTransfer)}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-lg">Online</div>
            <div className="text-xl">{formatCurrency(currentData.online)}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-lg">Discount</div>
            <div className="text-xl">{formatCurrency(currentData.discount)}</div>
          </div>
        </div>
      </CardContent>
    </Card>

    </div>
  )
}

export default FeesPage