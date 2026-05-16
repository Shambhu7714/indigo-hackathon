import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { WorkspaceTabs } from '@/components/workspace/WorkspaceTabs'
import { CampaignForm } from '@/components/workspace/CampaignForm'
import { PreviewPanel } from '@/components/workspace/PreviewPanel'
import { useProjectsStore } from '@/store/projectsStore'
import { useWorkspaceStore } from '@/store/workspaceStore'

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
      await startCreating(pid)
    } finally {
      setSubmitting(false)
    }
  }

  if (!projectId || !project) {
    return (
      <AppShell>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Project not found</h1>
          <Link to="/projects" className="mt-4 inline-block text-sm font-medium text-[#0C2340] hover:underline">
            ← Back to projects
          </Link>
        </div>
      </AppShell>
    )
  }

  if (!workspace) {
    return (
      <AppShell>
        <div className="px-4 py-16 text-center text-gray-600">Loading…</div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <Breadcrumbs projectName={project.name} />
      <WorkspaceTabs active={workspace.activeTab} onChange={(t) => setActiveTab(project.id, t)} />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 pt-2 sm:px-6 lg:grid-cols-[minmax(0,400px)_1fr] lg:items-start">
        <CampaignForm
          campaignType={workspace.campaign.campaignType}
          description={workspace.campaign.description}
          onCampaignTypeChange={(v) => setCampaign(project.id, { campaignType: v })}
          onDescriptionChange={(v) => setCampaign(project.id, { description: v })}
          onSubmit={handleStart}
          loading={submitting}
        />
        <PreviewPanel
          activeTab={workspace.activeTab}
          runState={workspace.runState}
          results={workspace.results}
          hasGenerated={workspace.hasGenerated}
        />
      </div>
    </AppShell>
  )
}
