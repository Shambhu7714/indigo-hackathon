import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AgentId, AgentResults, AgentRunState, AgentStatus } from '@/types'
import { runMockAgents } from '@/mocks/agents'

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
  campaignType: string
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
  startCreating: (projectId: string) => Promise<void>
  resetProject: (projectId: string) => void
}

const defaultCampaign = (): CampaignDraft => ({
  campaignType: 'Destination',
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

      startCreating: async (projectId) => {
        const entry = ensureEntry({ ...get().byProjectId }, projectId)
        const { campaignType, description } = entry.campaign
        if (!description.trim()) return

        const running: AgentRunState = {
          social: 'pending',
          copywriting: 'pending',
          banner: 'pending',
          imageGen: 'pending',
        }

        set((s) => {
          const next = { ...s.byProjectId }
          const e = ensureEntry(next, projectId)
          e.runState = running
          e.results = {
            social: [],
            copywriting: [],
            banner: null,
            imageGen: null,
          }
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

        await runMockAgents(
          { campaignType, description },
          {
            onAgentStart: (id) => progress(id, 'running'),
            onAgentDone: (id, partial) => {
              set((s) => {
                const next = { ...s.byProjectId }
                const e = ensureEntry(next, projectId)
                e.runState = { ...e.runState, [id]: 'done' }
                if (id === 'social' && partial.social) e.results.social = partial.social
                if (id === 'copywriting' && partial.copywriting)
                  e.results.copywriting = partial.copywriting
                if (id === 'banner' && partial.banner) e.results.banner = partial.banner
                if (id === 'imageGen' && partial.imageGen) e.results.imageGen = partial.imageGen
                return { byProjectId: next }
              })
            },
          }
        )

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
