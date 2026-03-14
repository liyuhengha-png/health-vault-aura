import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { textChunk, fileName } = await req.json()

    const apiKey = Deno.env.get("ARK_API_KEY") ?? Deno.env.get("OPENAI_API_KEY") ?? "";
    const baseURL = Deno.env.get("ARK_BASE_URL") ?? "https://api.tu-zi.com/v1";
    const model = Deno.env.get("ARK_MODEL") ?? "doubao-seed-1-6-flash-250828";

    if (!apiKey) {
      throw new Error("Missing ARK_API_KEY (or OPENAI_API_KEY) in Supabase Edge Function secrets.");
    }

    const prompt = `Strictly output in the following JSON format without any additional explanation:

{
    "fileName": "${fileName || 'unknown.pdf'}",
    "contentType": "application/pdf",
    "indicatorCount": <total number of indicators>,
    "indicators": [
        {
            "id": "<indicator ID in lowercase English, e.g. hba1c>",
            "name": "<indicator name, e.g. HbA1c>",
            "category": "<category, e.g. Lab Results, Blood Test, Imaging, etc.>",
            "value": "<value>",
            "unit": "<unit>",
            "referenceRange": "<reference range>",
            "status": "<status: normal/high/low>",
            "instrument": "<testing instrument or method>"
        }
    ]
}

Requirements:
1. Extract all recognizable medical indicators (including blood tests, biochemical indicators, imaging results, etc.)
2. indicatorCount must equal the length of the indicators array
3. Use empty string "" for any missing fields
4. Determine status by comparing value against reference range: normal/high/low. If comparison is impossible, use abnormal or "".
5. Output JSON only, no other text
6. For Chinese reports, keep the original indicator names but normalize status to English
7. Prefer category values such as Lab Results, Imaging / Reports, Vitals, Conditions & Diagnoses
8. Must output in English

PDF content:
${textChunk}`;

    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI API Error:', errText);
      throw new Error(`AI API failed with status ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || "";

    return new Response(
      JSON.stringify({ responseText, model, baseURL }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
