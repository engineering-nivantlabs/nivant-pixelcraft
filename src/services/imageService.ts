const REPLICATE_KEY = import.meta.env.VITE_REPLICATE_API_KEY

interface GenerateParams {
  prompt: string
  style?: "photorealistic" | "artistic" | "anime" | "3d"
  count?: number
}

interface GenerateResult {
  id: string
  urls: string[]
  prompt: string
  createdAt: string
}

export async function generateImages(params: GenerateParams): Promise<GenerateResult> {
  if (!REPLICATE_KEY) {
    return {
      id: crypto.randomUUID(),
      urls: Array.from({ length: params.count || 4 }, (_, i) =>
        `https://picsum.photos/seed/${Date.now() + i}/512/512`
      ),
      prompt: params.prompt,
      createdAt: new Date().toISOString(),
    }
  }

  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REPLICATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      input: {
        prompt: params.prompt,
        num_outputs: params.count || 4,
        guidance_scale: 7.5,
      },
    }),
  })

  const prediction = await res.json()
  return {
    id: prediction.id,
    urls: prediction.output || [],
    prompt: params.prompt,
    createdAt: new Date().toISOString(),
  }
}

export async function pollPrediction(id: string): Promise<string[]> {
  const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: { Authorization: `Bearer ${REPLICATE_KEY}` },
  })
  const data = await res.json()
  if (data.status === "succeeded") return data.output
  if (data.status === "failed") throw new Error("Generation failed")
  return []
}
