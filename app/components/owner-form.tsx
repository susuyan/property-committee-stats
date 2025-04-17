"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addOwner } from "../actions"
import { toast } from "@/components/ui/use-toast"

// 生成选项数组
const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString())
}

// 选项数据
const buildingOptions = generateOptions(92, 115)
const unitOptions = generateOptions(1, 4)
const floorOptions = generateOptions(1, 12)
const roomOptions = generateOptions(1, 4)

interface OwnerFormProps {
  onSuccess?: () => void
}

export function OwnerForm({ onSuccess }: OwnerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    building: "",
    unit: "",
    floor: "",
    room: "",
    agree: "true",
    remarks: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    // 验证所有必填字段
    if (!formData.building || !formData.unit || !formData.floor || !formData.room) {
      toast({
        title: "提交失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // 创建 FormData 对象
      const submitData = new FormData()
      submitData.append("building", formData.building) // 直接使用数字，不添加"号楼"
      submitData.append("unit", formData.unit)
      submitData.append("floor", formData.floor)
      submitData.append("room", formData.room)
      submitData.append("agree", formData.agree)
      submitData.append("remarks", formData.remarks)

      const result = await addOwner(submitData)
      if (result.success) {
        toast({
          title: "提交成功",
          description: result.message,
        })
        // 重置表单
        setFormData({
          building: "",
          unit: "",
          floor: "",
          room: "",
          agree: "true",
          remarks: "",
        })
        // 调用成功回调
        onSuccess?.()
      } else {
        toast({
          title: "提交失败",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "提交失败",
        description: "发生错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle>业主楼栋信息确认</CardTitle>
        <CardDescription>请填写楼栋信息及是否同意组建业委会</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="building">楼栋号</Label>
              <Select value={formData.building} onValueChange={(value) => handleChange("building", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择楼栋" />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-[200px] overflow-y-auto">
                  {buildingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">单元</Label>
              <Select value={formData.unit} onValueChange={(value) => handleChange("unit", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择单元" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}单元
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor">楼层</Label>
              <Select value={formData.floor} onValueChange={(value) => handleChange("floor", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择楼层" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {floorOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}层
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">房间号</Label>
              <Select value={formData.room} onValueChange={(value) => handleChange("room", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择房间号" />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}号
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>是否同意组建业委会</Label>
            <RadioGroup
              value={formData.agree}
              onValueChange={(value) => handleChange("agree", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="agree-yes" />
                <Label htmlFor="agree-yes">同意</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="agree-no" />
                <Label htmlFor="agree-no">不同意</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">备注</Label>
            <Textarea
              id="remarks"
              placeholder="请输入备注信息（选填）"
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="px-4 sm:px-6 flex justify-center sm:justify-start">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "提交中..." : "提交"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
