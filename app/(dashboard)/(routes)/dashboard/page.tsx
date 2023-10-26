"use client";

import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
import { Airplay, ArrowRight, FileStack } from "lucide-react";
import { useRouter } from "next/navigation";

const task = [
  {
    label: "customer",
    icon: Airplay,
    color: 'text-violet-700',
    bgcolor: 'bg-violet-500/10',
    href: '/customer'
  },
  {
    label: "Sale Person",
    icon: FileStack,
    href: '/sales-person',
    color: 'text-pink-500'
  },
  {
    label: "Invoice",
    icon: FileStack,
    href: '/invoice',
    color: 'text-orange-500'
  },
]

const Dashboard = () => {
  const router = useRouter()
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='
        text-2xl mb:text-4xl font-bold text-center'>Invoice Dashboard</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Analytics
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {task.map((val) => (
          <Card
            onClick={() => router.push(val.href)}
            key={val.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={"p-2 w-fit rounded-md"}>
                <val.icon className={"w-8 h-8"} />
              </div>
              <div className="font-semibold">
                {val.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard