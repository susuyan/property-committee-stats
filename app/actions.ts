"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// 业主信息类型
export type Owner = {
  id: number
  building: string
  floor: string
  unit: string
  room: string
  agree: boolean
  remarks?: string
  created_at: string
}

// 添加业主信息
export async function addOwner(formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    const building = formData.get("building") as string
    const floor = formData.get("floor") as string
    const unit = formData.get("unit") as string
    const room = formData.get("room") as string
    const agree = formData.get("agree") === "true"
    const remarks = (formData.get("remarks") as string) || ""

    // 验证数据
    if (!building || !floor || !unit || !room) {
      return { success: false, message: "请填写所有必填字段" }
    }

    // 检查是否已存在相同记录
    const { data: existingData } = await supabase
      .from("owners")
      .select("*")
      .eq("building", building)
      .eq("floor", floor)
      .eq("unit", unit)
      .eq("room", room)
      .single()

    if (existingData) {
      // 更新现有记录
      const { error } = await supabase.from("owners").update({ agree, remarks }).eq("id", existingData.id)

      if (error) throw error

      revalidatePath("/")
      return { success: true, message: "业主信息已更新", isUpdate: true }
    }

    // 插入新记录
    const { error } = await supabase.from("owners").insert([{ building, floor, unit, room, agree, remarks }])

    if (error) throw error

    revalidatePath("/")
    return { success: true, message: "业主信息已添加", isUpdate: false }
  } catch (error) {
    console.error("添加业主信息失败:", error)
    return { success: false, message: "操作失败，请稍后重试" }
  }
}

// 获取统计信息
export async function getStatistics() {
  try {
    const supabase = createServerSupabaseClient()

    // 获取总数
    const { count: totalCount, error: countError } = await supabase
      .from("owners")
      .select("*", { count: "exact", head: true })

    if (countError) throw countError

    // 获取同意的数量
    const { count: agreeCount, error: agreeError } = await supabase
      .from("owners")
      .select("*", { count: "exact", head: true })
      .eq("agree", true)

    if (agreeError) throw agreeError

    // 计算总户数（固定为1556）
    const totalHouseholds = 1556

    // 修正同意率计算：同意户数/总户数
    const agreeRate = totalHouseholds > 0 ? (agreeCount || 0) / totalHouseholds : 0

    return {
      totalHouseholds,
      totalCount: totalCount || 0,
      agreeCount: agreeCount || 0,
      agreeRate,
      completionRate: totalHouseholds > 0 ? (totalCount || 0) / totalHouseholds : 0,
    }
  } catch (error) {
    console.error("获取统计信息失败:", error)
    return {
      totalHouseholds: 1556,
      totalCount: 0,
      agreeCount: 0,
      agreeRate: 0,
      completionRate: 0,
    }
  }
}

// 删除业主信息
export async function deleteOwner(id: number) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("owners").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/")
    return { success: true, message: "业主信息已删除" }
  } catch (error) {
    console.error("删除业主信息失败:", error)
    return { success: false, message: "操作失败，请稍后重试" }
  }
}
