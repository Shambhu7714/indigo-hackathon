import type { AgentId, AgentResults, SocialPost, CopyBlock, BannerSpec, ImageGenResult } from '@/types'

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildFromInput(campaignType: string, description: string) {
  const desc = description.trim() || 'your next getaway'
  const type = campaignType.trim() || 'campaign'
  return { desc, type }
}

export async function runMockAgents(
  input: { campaignType: string; description: string; targetAgentId?: AgentId },
  handlers: {
    onAgentStart: (id: AgentId) => void
    onAgentDone: (id: AgentId, partial: Partial<AgentResults>) => void
  }
) {
  const { desc, type } = buildFromInput(input.campaignType, input.description)
  const target = input.targetAgentId

  const social: SocialPost[] = [
    {
      platform: 'Instagram',
      text: `✈️ ${desc.slice(0, 80)}${desc.length > 80 ? '…' : ''}\n\nBook on goIndiGo.in — ${type} stories that fly with you.`,
      hashtags: ['#goIndiGo', '#6ECreativeStudio', '#FlyHigh'],
    },
    {
      platform: 'X (Twitter)',
      text: `Planning travel? ${desc.slice(0, 100)}\nNon-stop options, on-time performance, India’s favourite airline.`,
      hashtags: ['#goIndiGo', '#6E'],
    },
    {
      platform: 'LinkedIn',
      text: `As we scale our ${type} narrative, we’re inviting travellers to explore ${desc.slice(0, 120)}. Always subject to marketing approval before publish.`,
      hashtags: ['#IndiGo', '#Aviation'],
    },
  ]

  if (!target || target === 'social') {
    handlers.onAgentStart('social')
    await wait(450)
    handlers.onAgentDone('social', { social })
  }

  const copywriting: CopyBlock[] = [
    {
      title: 'Primary headline',
      body: `Where every journey begins — ${desc}`,
    },
    {
      title: 'Supporting line',
      body: `Tailored for ${type} moments. Fare rules, routes, and disclaimers to be added by legal/commercial before go-live.`,
    },
    {
      title: 'Short CTA',
      body: 'Book smart. Fly IndiGo.',
    },
  ]

  if (!target || target === 'copywriting') {
    handlers.onAgentStart('copywriting')
    await wait(500)
    handlers.onAgentDone('copywriting', { copywriting })
  }

  const banner: BannerSpec = {
    headline: type === 'Destination' ? 'Your next destination awaits' : `Campaign: ${type}`,
    subhead: desc,
    cta: 'Explore fares',
    dimensions: '1200 × 628 (social), 728 × 90 (display)',
    notes:
      'Export after brand review. Use approved IndiGo palette, logo clear space, and partner co-mark rules where applicable.',
  }

  if (!target || target === 'banner') {
    handlers.onAgentStart('banner')
    await wait(420)
    handlers.onAgentDone('banner', { banner })
  }

  const imageGen: ImageGenResult = {
    description: `Hero visual: travellers at sunrise boarding, soft blues and whites, subtle 6E accent, headline zone top-left, brand-safe — ${desc.slice(0, 100)}`,
    style: 'Photoreal, premium, minimal clutter; no faces without release; placeholders for legal line.',
    suggestedAlt: `IndiGo ${type} campaign visual inspired by: ${desc.slice(0, 80)}`,
  }

  if (!target || target === 'imageGen') {
    handlers.onAgentStart('imageGen')
    await wait(550)
    handlers.onAgentDone('imageGen', { imageGen })
  }
}
