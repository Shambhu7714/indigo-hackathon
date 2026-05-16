import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AgentId, AgentResults, AgentRunState, AgentStatus } from '@/types'
import { campaignApi } from '@/lib/api'
import { useAuthStore } from './authStore'

const initialRun: AgentRunState = {
  social: 'idle',
  copywriting: 'idle',
  banner: 'idle',
  imageGen: 'idle',
}

const emptyResults: AgentResults = {
  social: [],
  copywriting: [],
  banner: null,
  imageGen: null,
}

interface CampaignDraft {
  campaignType: AgentId
  description: string
}

interface WorkspaceSlice {
  byProjectId: Record<
    string,
    {
      campaign: CampaignDraft
      activeTab: AgentId
      runState: AgentRunState
      results: AgentResults
      hasGenerated: boolean
    }
  >
  getOrInit: (projectId: string) => NonNullable<WorkspaceSlice['byProjectId'][string]>
  setCampaign: (projectId: string, patch: Partial<CampaignDraft>) => void
  setActiveTab: (projectId: string, tab: AgentId) => void
  startCreating: (projectId: string, targetAgentId?: AgentId) => Promise<void>
  resetProject: (projectId: string) => void
}

const defaultCampaign = (): CampaignDraft => ({
  campaignType: 'social',
  description: '',
})

function ensureEntry(
  byProjectId: WorkspaceSlice['byProjectId'],
  projectId: string
): NonNullable<WorkspaceSlice['byProjectId'][string]> {
  if (!byProjectId[projectId]) {
    byProjectId[projectId] = {
      campaign: defaultCampaign(),
      activeTab: 'social',
      runState: { ...initialRun },
      results: { ...emptyResults, social: [], copywriting: [] },
      hasGenerated: false,
    }
  }
  return byProjectId[projectId]
}

export const useWorkspaceStore = create<WorkspaceSlice>()(
  persist(
    (set, get) => ({
      byProjectId: {},

      getOrInit: (projectId) => {
        const state = get()
        if (state.byProjectId[projectId]) return state.byProjectId[projectId]
        set((s) => {
          const next = { ...s.byProjectId }
          ensureEntry(next, projectId)
          return { byProjectId: next }
        })
        return get().byProjectId[projectId]!
      },

      setCampaign: (projectId, patch) =>
        set((s) => {
          const next = { ...s.byProjectId }
          const entry = ensureEntry(next, projectId)
          entry.campaign = { ...entry.campaign, ...patch }
          return { byProjectId: next }
        }),

      setActiveTab: (projectId, tab) =>
        set((s) => {
          const next = { ...s.byProjectId }
          const entry = ensureEntry(next, projectId)
          entry.activeTab = tab
          return { byProjectId: next }
        }),

      startCreating: async (projectId, targetAgentId) => {
        const entry = ensureEntry({ ...get().byProjectId }, projectId)
        const { description } = entry.campaign
        const campaignType = entry.campaign.campaignType as any
        if (!description.trim()) return

        // If no target, run all. If target, only run target.
        const agentsToRun: AgentId[] = targetAgentId 
          ? [targetAgentId] 
          : ['social', 'copywriting', 'banner', 'imageGen']

        set((s) => {
          const next = { ...s.byProjectId }
          const e = ensureEntry(next, projectId)
          
          // Only reset the agents we are about to run
          agentsToRun.forEach(id => {
            e.runState[id] = 'pending'
            if (id === 'social') e.results.social = []
            if (id === 'copywriting') e.results.copywriting = []
            if (id === 'banner') e.results.banner = null
            if (id === 'imageGen') e.results.imageGen = null
          })

          e.hasGenerated = false
          return { byProjectId: next }
        })

        const progress = (id: AgentId, status: AgentStatus) =>
          set((s) => {
            const next = { ...s.byProjectId }
            const e = ensureEntry(next, projectId)
            e.runState = { ...e.runState, [id]: status }
            return { byProjectId: next }
          })

        const res = await campaignApi.generate(
          { projectId, campaignType, description, targetAgentId: targetAgentId || undefined },
          useAuthStore.getState().token || undefined
        )

        if (res.ok) {
          const id = targetAgentId || 'social' // default if targetAgentId was null
          set((s) => {
            const next = { ...s.byProjectId }
            const e = ensureEntry(next, projectId)
            e.runState = { ...e.runState, [id]: 'done' }
            
            // For now, since Gemini returns raw text, we store it in a simplified way
            // In a real app, we'd parse the JSON if the prompt asked for it.
            if (id === 'social') e.results.social = [{ platform: 'Gemini AI', text: res.data.content, hashtags: [] }]
            if (id === 'copywriting') e.results.copywriting = [{ title: 'Gemini Deck', body: res.data.content }]
            if (id === 'banner') e.results.banner = { headline: 'Gemini Gen', subhead: res.data.content, cta: 'Fly Now', dimensions: '1200x628', notes: 'AI Generated' }
            if (id === 'imageGen') e.results.imageGen = { 
              description: res.data.content, 
              style: 'Aviation Photo', 
              suggestedAlt: 'IndiGo Creative',
              imageUrl: res.data.imageUrl 
            }
            
            return { byProjectId: next }
          })
        } else {
           // Handle error
           const id = targetAgentId || 'social'
           progress(id, 'error')
        }

        set((s) => {
          const next = { ...s.byProjectId }
          const e = ensureEntry(next, projectId)
          e.hasGenerated = true
          return { byProjectId: next }
        })
      },

      resetProject: (projectId) =>
        set((s) => {
          const next = { ...s.byProjectId }
          next[projectId] = {
            campaign: defaultCampaign(),
            activeTab: 'social',
            runState: { ...initialRun },
            results: { ...emptyResults, social: [], copywriting: [] },
            hasGenerated: false,
          }
          return { byProjectId: next }
        }),
    }),
    { name: '6e-creative-workspace' }
  )
)
