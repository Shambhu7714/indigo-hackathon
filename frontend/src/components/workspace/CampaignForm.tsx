import { Send } from 'lucide-react'

const campaignTypes = ['Destination', 'Sale', 'Brand', 'Product launch', 'Partnership', 'Seasonal']

interface CampaignFormProps {
  campaignType: string
  description: string
  onCampaignTypeChange: (v: string) => void
  onDescriptionChange: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

export function CampaignForm({
  campaignType,
  description,
  onCampaignTypeChange,
  onDescriptionChange,
  onSubmit,
  loading,
}: CampaignFormProps) {
  const canSubmit = description.trim().length > 0

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Campaign Details</h2>
      <p className="mt-1 text-sm text-gray-500">Tell us what you are building — our agents will align output to your brief.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="campaign-type" className="block text-sm font-medium text-gray-700">
            Campaign Type <span className="text-red-600">*</span>
          </label>
          <select
            id="campaign-type"
            value={campaignType}
            onChange={(e) => onCampaignTypeChange(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {campaignTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="campaign-desc" className="block text-sm font-medium text-gray-700">
            Describe your campaign <span className="text-red-600">*</span>
          </label>
          <textarea
            id="campaign-desc"
            rows={7}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="e.g. Promote winter getaways from Delhi with emphasis on direct flights and family fares…"
            className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <button
          type="button"
          disabled={!canSubmit || loading}
          onClick={onSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0C2340] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a1c34] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Start Creating
            </>
          )}
        </button>
      </div>
    </section>
  )
}
