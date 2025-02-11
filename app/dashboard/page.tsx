"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
const chartData = [
    { date: "2024-04-01", OfflinePayment: 222, OnlinePayment: 150 },
    { date: "2024-04-02", OfflinePayment: 97, OnlinePayment: 180 },
    { date: "2024-04-03", OfflinePayment: 167, OnlinePayment: 120 },
    { date: "2024-04-04", OfflinePayment: 242, OnlinePayment: 260 },
    { date: "2024-04-05", OfflinePayment: 373, OnlinePayment: 290 },
    { date: "2024-04-06", OfflinePayment: 301, OnlinePayment: 340 },
    { date: "2024-04-07", OfflinePayment: 245, OnlinePayment: 180 },
    { date: "2024-04-08", OfflinePayment: 409, OnlinePayment: 320 },
    { date: "2024-04-09", OfflinePayment: 59, OnlinePayment: 110 },
    { date: "2024-04-10", OfflinePayment: 261, OnlinePayment: 190 },
    { date: "2024-04-11", OfflinePayment: 327, OnlinePayment: 350 },
    { date: "2024-04-12", OfflinePayment: 292, OnlinePayment: 210 },
    { date: "2024-04-13", OfflinePayment: 342, OnlinePayment: 380 },
    { date: "2024-04-14", OfflinePayment: 137, OnlinePayment: 220 },
    { date: "2024-04-15", OfflinePayment: 120, OnlinePayment: 170 },
    { date: "2024-04-16", OfflinePayment: 138, OnlinePayment: 190 },
    { date: "2024-04-17", OfflinePayment: 446, OnlinePayment: 360 },
    { date: "2024-04-18", OfflinePayment: 364, OnlinePayment: 410 },
    { date: "2024-04-19", OfflinePayment: 243, OnlinePayment: 180 },
    { date: "2024-04-20", OfflinePayment: 89, OnlinePayment: 150 },
    { date: "2024-04-21", OfflinePayment: 137, OnlinePayment: 200 },
    { date: "2024-04-22", OfflinePayment: 224, OnlinePayment: 170 },
    { date: "2024-04-23", OfflinePayment: 138, OnlinePayment: 230 },
    { date: "2024-04-24", OfflinePayment: 387, OnlinePayment: 290 },
    { date: "2024-04-25", OfflinePayment: 215, OnlinePayment: 250 },
    { date: "2024-04-26", OfflinePayment: 75, OnlinePayment: 130 },
    { date: "2024-04-27", OfflinePayment: 383, OnlinePayment: 420 },
    { date: "2024-04-28", OfflinePayment: 122, OnlinePayment: 180 },
    { date: "2024-04-29", OfflinePayment: 315, OnlinePayment: 240 },
    { date: "2024-04-30", OfflinePayment: 454, OnlinePayment: 380 },
    { date: "2024-05-01", OfflinePayment: 165, OnlinePayment: 220 },
    { date: "2024-05-02", OfflinePayment: 293, OnlinePayment: 310 },
    { date: "2024-05-03", OfflinePayment: 247, OnlinePayment: 190 },
    { date: "2024-05-04", OfflinePayment: 385, OnlinePayment: 420 },
    { date: "2024-05-05", OfflinePayment: 481, OnlinePayment: 390 },
    { date: "2024-05-06", OfflinePayment: 498, OnlinePayment: 520 },
    { date: "2024-05-07", OfflinePayment: 388, OnlinePayment: 300 },
    { date: "2024-05-08", OfflinePayment: 149, OnlinePayment: 210 },
    { date: "2024-05-09", OfflinePayment: 227, OnlinePayment: 180 },
    { date: "2024-05-10", OfflinePayment: 293, OnlinePayment: 330 },
    { date: "2024-05-11", OfflinePayment: 335, OnlinePayment: 270 },
    { date: "2024-05-12", OfflinePayment: 197, OnlinePayment: 240 },
    { date: "2024-05-13", OfflinePayment: 197, OnlinePayment: 160 },
    { date: "2024-05-14", OfflinePayment: 448, OnlinePayment: 490 },
    { date: "2024-05-15", OfflinePayment: 473, OnlinePayment: 380 },
    { date: "2024-05-16", OfflinePayment: 338, OnlinePayment: 400 },
    { date: "2024-05-17", OfflinePayment: 499, OnlinePayment: 420 },
    { date: "2024-05-18", OfflinePayment: 315, OnlinePayment: 350 },
    { date: "2024-05-19", OfflinePayment: 235, OnlinePayment: 180 },
    { date: "2024-05-20", OfflinePayment: 177, OnlinePayment: 230 },
    { date: "2024-05-21", OfflinePayment: 82, OnlinePayment: 140 },
    { date: "2024-05-22", OfflinePayment: 81, OnlinePayment: 120 },
    { date: "2024-05-23", OfflinePayment: 252, OnlinePayment: 290 },
    { date: "2024-05-24", OfflinePayment: 294, OnlinePayment: 220 },
    { date: "2024-05-25", OfflinePayment: 201, OnlinePayment: 250 },
    { date: "2024-05-26", OfflinePayment: 213, OnlinePayment: 170 },
    { date: "2024-05-27", OfflinePayment: 420, OnlinePayment: 460 },
    { date: "2024-05-28", OfflinePayment: 233, OnlinePayment: 190 },
    { date: "2024-05-29", OfflinePayment: 78, OnlinePayment: 130 },
    { date: "2024-05-30", OfflinePayment: 340, OnlinePayment: 280 },
    { date: "2024-05-31", OfflinePayment: 178, OnlinePayment: 230 },
    { date: "2024-06-01", OfflinePayment: 178, OnlinePayment: 200 },
    { date: "2024-06-02", OfflinePayment: 470, OnlinePayment: 410 },
    { date: "2024-06-03", OfflinePayment: 103, OnlinePayment: 160 },
    { date: "2024-06-04", OfflinePayment: 439, OnlinePayment: 380 },
    { date: "2024-06-05", OfflinePayment: 88, OnlinePayment: 140 },
    { date: "2024-06-06", OfflinePayment: 294, OnlinePayment: 250 },
    { date: "2024-06-07", OfflinePayment: 323, OnlinePayment: 370 },
    { date: "2024-06-08", OfflinePayment: 385, OnlinePayment: 320 },
    { date: "2024-06-09", OfflinePayment: 438, OnlinePayment: 480 },
    { date: "2024-06-10", OfflinePayment: 155, OnlinePayment: 200 },
    { date: "2024-06-11", OfflinePayment: 92, OnlinePayment: 150 },
    { date: "2024-06-12", OfflinePayment: 492, OnlinePayment: 420 },
    { date: "2024-06-13", OfflinePayment: 81, OnlinePayment: 130 },
    { date: "2024-06-14", OfflinePayment: 426, OnlinePayment: 380 },
    { date: "2024-06-15", OfflinePayment: 307, OnlinePayment: 350 },
    { date: "2024-06-16", OfflinePayment: 371, OnlinePayment: 310 },
    { date: "2024-06-17", OfflinePayment: 475, OnlinePayment: 520 },
    { date: "2024-06-18", OfflinePayment: 107, OnlinePayment: 170 },
    { date: "2024-06-19", OfflinePayment: 341, OnlinePayment: 290 },
    { date: "2024-06-20", OfflinePayment: 408, OnlinePayment: 450 },
    { date: "2024-06-21", OfflinePayment: 169, OnlinePayment: 210 },
    { date: "2024-06-22", OfflinePayment: 317, OnlinePayment: 270 },
    { date: "2024-06-23", OfflinePayment: 480, OnlinePayment: 530 },
    { date: "2024-06-24", OfflinePayment: 132, OnlinePayment: 180 },
    { date: "2024-06-25", OfflinePayment: 141, OnlinePayment: 190 },
    { date: "2024-06-26", OfflinePayment: 434, OnlinePayment: 380 },
    { date: "2024-06-27", OfflinePayment: 448, OnlinePayment: 490 },
    { date: "2024-06-28", OfflinePayment: 149, OnlinePayment: 200 },
    { date: "2024-06-29", OfflinePayment: 103, OnlinePayment: 160 },
    { date: "2024-06-30", OfflinePayment: 446, OnlinePayment: 400 },
]
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    OfflinePayment: {
        label: "Offline Payment",
        color: "hsl(var(--chart-1))",
    },
    OnlinePayment: {
        label: "Online Payment",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
const PiechartData = [
    { class: "Class - I", students: 204, fill: "hsl(var(--chart-1))" },
    { class: "Class - II", students: 137, fill: "hsl(var(--chart-2))" },
    { class: "Class - III", students: 191, fill: "hsl(var(--chart-3))" },
    { class: "Class - IV", students: 184, fill: "hsl(var(--chart-4))" },
    { class: "Class - V", students: 78, fill: "hsl(var(--chart-5))" },
    { class: "Class - VI", students: 214, fill: "hsl(var(--chart-6))" },
    { class: "Class - VII", students: 63, fill: "hsl(var(--chart-7))" },
    { class: "Class - VIII", students: 123, fill: "hsl(var(--chart-8))" },
    { class: "Class - IX", students: 200, fill: "hsl(var(--chart-9))" },
    { class: "Class - X", students: 104, fill: "hsl(var(--chart-10))" },
];

const PiechartConfig = {
    students: {
        label: "Students",
    },
} satisfies ChartConfig;

const PiechartData2 = [
    { subject: "Bengali", teachers: 2, fill: "hsl(var(--chart-1))" },
    { subject: "English", teachers: 7, fill: "hsl(var(--chart-2))" },
    { subject: "Maths", teachers: 5, fill: "hsl(var(--chart-3))" },
    { subject: "History", teachers: 2, fill: "hsl(var(--chart-4))" },
    { subject: "Geography", teachers: 3, fill: "hsl(var(--chart-5))" },
    { subject: "Physics", teachers: 3, fill: "hsl(var(--chart-6))" },
    { subject: "Chemistry", teachers: 5, fill: "hsl(var(--chart-7))" },
    { subject: "Biology", teachers: 6, fill: "hsl(var(--chart-8))" },
    { subject: "Computer Science", teachers: 7, fill: "hsl(var(--chart-9))" },
    { subject: "Statistics", teachers: 4, fill: "hsl(var(--chart-10))" },
    { subject: "Philosophy", teachers: 6, fill: "hsl(var(--chart-11))" },
];

const PiechartConfig2 = {
    teachers: {
        label: "Teachers",
    },
} satisfies ChartConfig;


const DashboardPage = () => {
    const [timeRange, setTimeRange] = React.useState("90d")
    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });
    const totalStudents = React.useMemo(() => {
        return PiechartData.reduce((acc, curr) => acc + curr.students, 0);
    }, []);
    const totalTeachers = React.useMemo(() => {
        return PiechartData2.reduce((acc, curr) => acc + curr.teachers, 0);
    }, []);

    return (
        <section className="flex flex-col gap-5">
            <h1 className="text-xl text-center font-bold">Dashboard</h1>
            <div className="flex md:flex-row flex-col justify-center px-4 items-center gap-2 w-full h-auto">
                <Card className="h-full w-full">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1 text-center sm:text-left">
                            <CardTitle>Payment of Students</CardTitle>
                            <CardDescription>
                                Showing total Payment of students for the last 3 months
                            </CardDescription>
                        </div>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger
                                className="w-[160px] rounded-lg sm:ml-auto"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="90d" className="rounded-lg">
                                    Last 3 months
                                </SelectItem>
                                <SelectItem value="30d" className="rounded-lg">
                                    Last 30 days
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    Last 7 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <AreaChart data={filteredData}>
                                <defs>
                                    <linearGradient id="fillOfflinePayment" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-OfflinePayment)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-OfflinePayment)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillOnlinePayment" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-OnlinePayment)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-OnlinePayment)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area
                                    dataKey="OnlinePayment"
                                    type="natural"
                                    fill="url(#fillOnlinePayment)"
                                    stroke="var(--color-OnlinePayment)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="OfflinePayment"
                                    type="natural"
                                    fill="url(#fillOfflinePayment)"
                                    stroke="var(--color-OfflinePayment)"
                                    stackId="a"
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className=" h-full w-fit py-4 flex flex-col justify-center items-center">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <div className="flex items-center space-x-2 text-lg font-medium">
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <span>
                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </span>
                            ) : (
                                <span>{format(date.from, "LLL dd, y")}</span>
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </div>
                </Card>
            </div>
            <div className="flex flex-wrap gap-6 w-full h-auto justify-center items-center">
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Pie Chart - Student Distribution</CardTitle>
                        <CardDescription>Student count by class</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={PiechartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={PiechartData}
                                    dataKey="students"
                                    nameKey="class"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalStudents.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Students
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Enrollment steady this year <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total students distribution across classes
                        </div>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Pie Chart - Teacher Distribution</CardTitle>
                        <CardDescription>Number of teachers per subject</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={PiechartConfig2}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={PiechartData2}
                                    dataKey="teachers"
                                    nameKey="subject"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalTeachers.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Teachers
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Stable teacher distribution <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing the number of teachers per subject
                        </div>
                    </CardFooter>
                </Card>
            </div>

        </section>
    )
}

export default DashboardPage
