const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

export async function createCheckoutSession(priceId: string, userId: string) {
  const res = await fetch("/api/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId, userId }),
  })
  const { url } = await res.json()
  if (url) window.location.href = url
}

export const PLANS = {
  free: { credits: 10, price: 0 },
  starter: { credits: 100, price: 9, priceId: "price_starter" },
  pro: { credits: 500, price: 29, priceId: "price_pro" },
  unlimited: { credits: -1, price: 79, priceId: "price_unlimited" },
} as const
