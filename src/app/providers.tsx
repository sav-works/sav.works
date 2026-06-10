'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PH, usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    ui_host: 'https://eu.posthog.com',
    capture_pageview: false,
    person_profiles: 'always',
  })
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url += '?' + searchParams.toString()
      }
      ph.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, ph])

  return null
}

function SuspendedTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  )
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PH client={posthog}>
      <SuspendedTracker />
      {children}
    </PH>
  )
}
