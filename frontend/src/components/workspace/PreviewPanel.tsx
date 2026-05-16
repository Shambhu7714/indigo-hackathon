import { LayoutTemplate, Loader2 } from 'lucide-react'
import type { AgentId, AgentResults, AgentRunState } from '@/types'

const labels: Record<AgentId, string> = {
  social: 'Social agent',
  copywriting: 'Copywriting agent',
  banner: 'Banner agent',
  imageGen: 'Image Gen agent',
}

interface PreviewPanelProps {
  activeTab: AgentId
  runState: AgentRunState
  results: AgentResults
  hasGenerated: boolean
}

function StatusChip({ status }: { status: AgentRunState[AgentId] }) {
  if (status === 'idle')
    return (
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Idle</span>
    )
  if (status === 'pending')
    return (
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900">Queued</span>
    )
  if (status === 'running')
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-900">
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
        Running
      </span>
    )
  if (status === 'done')
    return (
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-900">Done</span>
    )
  return (
    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">Error</span>
  )
}

function isAnyRunning(run: AgentRunState) {
  return Object.values(run).some((s) => s === 'running' || s === 'pending')
}

export function PreviewPanel({ activeTab, runState, results, hasGenerated }: PreviewPanelProps) {
  const showEmpty = !hasGenerated && !isAnyRunning(runState)

  return (
    <section className="flex min-h-[420px] flex-col rounded-xl border border-dashed border-gray-200 bg-gradient-to-b from-slate-50 to-blue-50/30 p-6 shadow-inner">
      {showEmpty && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <LayoutTemplate className="h-14 w-14 text-[#0C2340]/70" aria-hidden />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Ready to create your campaign?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">
              Fill out the campaign details on the left to generate tailored content for all your social
              platforms.
            </p>
          </div>
        </div>
      )}

      {(hasGenerated || isAnyRunning(runState)) && !showEmpty && (
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white/90 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Agent run</p>
            <ul className="mt-3 space-y-2">
              {(Object.keys(labels) as AgentId[]).map((id) => (
                <li key={id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-gray-800">{labels[id]}</span>
                  <StatusChip status={runState[id]} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Preview — {labels[activeTab]}</h3>
            <div className="mt-4 space-y-4 text-sm text-gray-800">
              {activeTab === 'social' && (
                <ul className="space-y-4">
                  {results.social.length === 0 && isAnyRunning(runState) && (
                    <li className="text-gray-500">Generating social posts…</li>
                  )}
                  {results.social.map((p, i) => (
                    <li key={i} className="rounded-lg border border-gray-100 bg-gray-50/80 p-4">
                      <p className="text-xs font-semibold uppercase text-blue-900">{p.platform}</p>
                      <p className="mt-2 whitespace-pre-wrap text-gray-800">{p.text}</p>
                      <p className="mt-2 text-xs text-blue-800">{p.hashtags.join(' ')}</p>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'copywriting' && (
                <div className="space-y-4">
                  {results.copywriting.length === 0 && isAnyRunning(runState) && (
                    <p className="text-gray-500">Generating copy blocks…</p>
                  )}
                  {results.copywriting.map((c, i) => (
                    <div key={i} className="rounded-lg border border-gray-100 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{c.title}</p>
                      <p className="mt-2 leading-relaxed">{c.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'banner' && (
                <div>
                  {!results.banner && isAnyRunning(runState) && (
                    <p className="text-gray-500">Composing banner spec…</p>
                  )}
                  {results.banner && (
                    <div className="space-y-3">
                      <div className="rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/50 p-6 text-center">
                        <p className="text-lg font-bold text-[#0C2340]">{results.banner.headline}</p>
                        <p className="mt-2 text-gray-700">{results.banner.subhead}</p>
                        <p className="mt-4 inline-block rounded-md bg-[#0C2340] px-4 py-2 text-sm font-semibold text-white">
                          {results.banner.cta}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">Sizes:</span> {results.banner.dimensions}
                      </p>
                      <p className="text-xs text-gray-600">{results.banner.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'imageGen' && (
                <div>
                  {!results.imageGen && isAnyRunning(runState) && (
                    <p className="text-gray-500">Drafting image generation brief…</p>
                  )}
                  {results.imageGen && (
                    <div className="space-y-3">
                      <div className="flex aspect-video max-h-56 items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 via-blue-100 to-slate-100 ring-1 ring-gray-200">
                        <p className="max-w-sm px-6 text-center text-sm italic text-gray-600">
                          {results.imageGen.description}
                        </p>
                      </div>
                      <p className="text-xs">
                        <span className="font-semibold text-gray-700">Style: </span>
                        {results.imageGen.style}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">Alt text: </span>
                        {results.imageGen.suggestedAlt}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
