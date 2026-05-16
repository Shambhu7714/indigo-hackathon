import { AppShell } from '@/components/layout/AppShell'

export function PlaceholderPage({ title, body }: { title: string; body: string }) {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-gray-600">{body}</p>
      </div>
    </AppShell>
  )
}
