export type AgentId = 'social' | 'copywriting' | 'banner' | 'imageGen'
export type CampaignType = AgentId

export type AgentStatus = 'idle' | 'pending' | 'running' | 'done' | 'error'

export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
}

export interface Project {
  id: string
  name: string
  updatedAt: string
}

export interface SocialPost {
  platform: string
  text: string
  hashtags: string[]
}

export interface CopyBlock {
  title: string
  body: string
}

export interface BannerSpec {
  headline: string
  subhead: string
  cta: string
  dimensions: string
  notes: string
}

export interface ImageGenResult {
  description: string
  style: string
  suggestedAlt: string
  imageUrl?: string
}

export interface AgentResults {
  social: SocialPost[]
  copywriting: CopyBlock[]
  banner: BannerSpec | null
  imageGen: ImageGenResult | null
}

export interface AgentRunState {
  social: AgentStatus
  copywriting: AgentStatus
  banner: AgentStatus
  imageGen: AgentStatus
}
