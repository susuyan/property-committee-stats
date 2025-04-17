"use client"

import { Statistics } from "./components/statistics"
import { OwnerForm } from "./components/owner-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useEffect, useState, useCallback } from "react"

interface StatsData {
  totalHouseholds: number
  totalCount: number
  agreeCount: number
  agreeRate: number
}

interface Owner {
  agree: boolean
}

interface TotalData {
  total_households: number
}

export default function HomePage() {
  const [stats, setStats] = useState<StatsData>({
    totalHouseholds: 0,
    totalCount: 0,
    agreeCount: 0,
    agreeRate: 0
  })

  const fetchStats = useCallback(async () => {
    const supabase = createClientSupabaseClient()

    // 固定总户数为 1556
    const totalHouseholds = 1556

    // 获取已录入户数和同意户数
    const { data: owners } = await supabase
      .from("owners")
      .select("agree") as { data: Owner[] | null }

    const totalCount = owners?.length || 0
    const agreeCount = owners?.filter((owner: Owner) => owner.agree)?.length || 0

    // 计算同意率 = 同意户数/总户数
    const agreeRate = totalHouseholds > 0 ? agreeCount / totalHouseholds : 0

    setStats({
      totalHouseholds,
      totalCount,
      agreeCount,
      agreeRate
    })
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">业委会组建统计</h1>
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="form" className="w-full">
          <TabsList>
            <TabsTrigger value="form">信息录入</TabsTrigger>
            <TabsTrigger value="stats">统计汇总</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <OwnerForm onSuccess={fetchStats} />
          </TabsContent>
          <TabsContent value="stats">
            <Statistics {...stats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
