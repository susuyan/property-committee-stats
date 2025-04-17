import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StatisticsProps {
  totalHouseholds: number
  totalCount: number
  agreeCount: number
  agreeRate: number
}

export function Statistics({ totalHouseholds, totalCount, agreeCount, agreeRate }: StatisticsProps) {
  // 格式化百分比
  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`
  }

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2 px-4 sm:px-6">
            <CardTitle className="text-sm font-medium">总户数</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl font-bold">{totalHouseholds}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 px-4 sm:px-6">
            <CardTitle className="text-sm font-medium">已录入户数</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 px-4 sm:px-6">
            <CardTitle className="text-sm font-medium">同意户数</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl font-bold">{agreeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 px-4 sm:px-6">
            <CardTitle className="text-sm font-medium">同意率</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-2xl font-bold">{formatPercent(agreeRate)}</div>
            <Progress value={agreeRate * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
