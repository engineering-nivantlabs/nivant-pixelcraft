import { supabase } from "@/lib/supabase"

export async function getCredits(userId: string): Promise<number> {
  const { data } = await supabase
    .from("credits")
    .select("balance")
    .eq("user_id", userId)
    .single()
  return data?.balance ?? 0
}

export async function deductCredit(userId: string, amount = 1): Promise<boolean> {
  const balance = await getCredits(userId)
  if (balance < amount) return false
  await supabase
    .from("credits")
    .update({ balance: balance - amount })
    .eq("user_id", userId)
  return true
}
