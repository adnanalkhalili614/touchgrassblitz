const API_KEY  = import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''
const MODEL    = 'claude-sonnet-4-20250514'
const ENDPOINT = 'https://api.anthropic.com/v1/messages'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function sendToNeo(
  system: string,
  messages: Message[],
  maxTokens = 150
): Promise<string> {
  if (!API_KEY) {
    // Demo fallback when no API key is configured
    return demoResponse(messages.at(-1)?.content ?? '')
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data.content?.[0]?.text ?? "i'm here. say it again?"
  } catch {
    return demoResponse(messages.at(-1)?.content ?? '')
  }
}

// ─── Demo responses (no API key) ─────────────────────────────────────────────

function demoResponse(lastMessage: string): string {
  const lower = lastMessage.toLowerCase()
  if (lower.includes('tired') || lower.includes('exhausted')) {
    return "being tired is real. but you set this for a reason. what was it?"
  }
  if (lower.includes('stress') || lower.includes('anxious') || lower.includes('overwhelm')) {
    return "okay. that's a signal. what's one thing you could do in the next 10 minutes?"
  }
  if (lower.includes('bored')) {
    return "boredom isn't an emergency. what were you supposed to be doing?"
  }
  if (lower.includes('better') || lower.includes('good')) {
    return "good. put your phone down now."
  }
  const defaults = [
    "what's actually going on right now?",
    "you said you wanted to become someone different. is this that person?",
    "that's not a good enough reason. try again.",
    "i hear you. but you came here for a reason. what was it?",
    "okay. take a breath. then tell me what you really need.",
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

// ─── System prompts ───────────────────────────────────────────────────────────

export function interventionSystemPrompt(
  name: string,
  whyStatement: string,
  identityStatement: string,
  triggerType: string
): string {
  return `You are Neo, a digital discipline AI. Your job is to help ${name} reconnect with their stated goal: ${whyStatement}. They want to become: ${identityStatement}. They are currently at risk of ${triggerType}. Ask one grounding question at a time. Keep responses under 15 words. Lowercase always. No filler. No flattery. Push back gently if their reason for relapsing is weak. After 3-5 exchanges, guide them to either a breathing exercise or a walk. End every session by telling them to put their phone down.`
}

export function alarmSystemPrompt(
  name: string,
  label: string,
  time: string,
  identityStatement: string
): string {
  return `You are Neo, a digital discipline AI. ${name} set an alarm called '${label}' and is trying to snooze it at ${time}. Their stated goal is to become ${identityStatement}. Evaluate their reason for snoozing. If it is weak, push back once with empathy but firmness. Keep all responses under 20 words. Lowercase. No flattery. Be a real accountability partner, not a pushover. Respond with valid JSON only: {"allow": true or false, "message": "your response here"}`
}
