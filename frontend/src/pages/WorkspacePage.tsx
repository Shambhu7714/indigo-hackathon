import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs'
import { CampaignForm } from '@/components/workspace/CampaignForm'
import { PreviewPanel } from '@/components/workspace/PreviewPanel'
import { useProjectsStore } from '@/store/projectsStore'
import { useWorkspaceStore } from '@/store/workspaceStore'
import { ArrowLeft, Loader2, Plane } from 'lucide-react'

export function WorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>()
  const projects = useProjectsStore((s) => s.projects)
  const getOrInit = useWorkspaceStore((s) => s.getOrInit)
  const setCampaign = useWorkspaceStore((s) => s.setCampaign)
  const setActiveTab = useWorkspaceStore((s) => s.setActiveTab)
  const startCreating = useWorkspaceStore((s) => s.startCreating)
  const byId = useWorkspaceStore((s) => s.byProjectId)

  const [submitting, setSubmitting] = useState(false)

  const pid = projectId ?? ''
  const project = projects.find((p) => p.id === pid)

  useEffect(() => {
    if (!pid) return
    getOrInit(pid)
  }, [pid, getOrInit])

  const workspace = pid ? byId[pid] : undefined

  async function handleStart() {
    if (!pid || !workspace) return
    setSubmitting(true)
    try {
      // Pass the selected agent/campaign type so only that one runs
      await startCreating(pid, workspace.campaign.campaignType as any)
    } finally {
      setSubmitting(false)
    }
  }

  if (!projectId || !project) {
    return (
      <AppShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/20">
            <Plane className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black">Campaign Not Found</h1>
          <p className="mt-2 text-white/40">This flight path doesn't exist in our systems.</p>
          <Link to="/projects" className="btn-ghost mt-8 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Fleet
          </Link>
        </div>
      </AppShell>
    )
  }

  if (!workspace) {
    return (
      <AppShell>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-brand-orange" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Syncing Workspace...</span>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      {/* Dynamic Header Area */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Breadcrumbs projectName={project.name} />
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="animate-slide-up">
              <h1 className="text-4xl font-black tracking-tight">{project.name}</h1>
              <div className="mt-2 flex items-center gap-4">
                 <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/20">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   Active Orbit
                 </div>
                 <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ID: {project.id.slice(0, 8)}</span>
              </div>
            </div>
            
            <div className="animate-slide-up delay-100">
               <WorkspaceTabs active={workspace.activeTab} onChange={(t) => setActiveTab(project.id, t)} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:items-start animate-fade-in delay-200">
        <aside className="sticky top-32">
          <CampaignForm
            campaignType={workspace.campaign.campaignType}
            description={workspace.campaign.description}
            onCampaignTypeChange={(v) => setCampaign(project.id, { campaignType: v })}
            onDescriptionChange={(v) => setCampaign(project.id, { description: v })}
            onSubmit={handleStart}
            loading={submitting}
          />
        </aside>
        
        <div className="min-w-0">
          <PreviewPanel
            activeTab={workspace.activeTab}
            runState={workspace.runState}
            results={workspace.results}
            hasGenerated={workspace.hasGenerated}
          />
        </div>
      </div>
    </AppShell>
  )
}
