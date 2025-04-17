"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { type Owner, deleteOwner } from "../actions"
import { toast } from "@/components/ui/use-toast"

interface OwnersTableProps {
  owners: Owner[]
}

export function OwnersTable({ owners }: OwnersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  // 过滤业主数据
  const filteredOwners = owners.filter((owner) => {
    const searchString = `${owner.building}${owner.floor}${owner.unit}${owner.room}`.toLowerCase()
    return searchString.includes(searchTerm.toLowerCase())
  })

  // 处理删除
  async function handleDelete(id: number) {
    if (confirm("确定要删除这条记录吗？")) {
      setIsDeleting(id)
      try {
        const result = await deleteOwner(id)
        if (result.success) {
          toast({
            title: "删除成功",
            description: result.message,
          })
        } else {
          toast({
            title: "删除失败",
            description: result.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "删除失败",
          description: "发生错误，请稍后重试",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(null)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">业主信息列表</h2>
        <div className="w-64">
          <Input placeholder="搜索楼栋/房间..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>楼栋</TableHead>
              <TableHead>楼层</TableHead>
              <TableHead>单元</TableHead>
              <TableHead>房间号</TableHead>
              <TableHead>是否同意</TableHead>
              <TableHead>录入时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  {searchTerm ? "没有找到匹配的记录" : "暂无数据"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>{owner.building}</TableCell>
                  <TableCell>{owner.floor}</TableCell>
                  <TableCell>{owner.unit}</TableCell>
                  <TableCell>{owner.room}</TableCell>
                  <TableCell>
                    <Badge variant={owner.agree ? "success" : "destructive"}>{owner.agree ? "同意" : "不同意"}</Badge>
                  </TableCell>
                  <TableCell>{new Date(owner.created_at).toLocaleString("zh-CN")}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(owner.id)}
                      disabled={isDeleting === owner.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
