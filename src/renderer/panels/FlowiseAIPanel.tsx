// =============================================================================
// FlowiseAIPanel — FloWise AI flow builder and executor panel
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { useRenderCount } from '../lib/perf/perfClient'
import log from '../lib/logger'
import type { PanelProps } from './types'

export interface FlowiseAIPanelProps extends PanelProps {}

export default function FlowiseAIPanel({ panelId, workspaceId }: FlowiseAIPanelProps) {
  useRenderCount('FlowiseAIPanel')
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const setupIframe = async () => {
      try {
        // TODO: When Flowise is integrated, embed iframe pointing to localhost:3000
        // For now, show a placeholder
        setIsLoading(false)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        log.error(`FlowiseAIPanel: ${message}`)
        setError(message)
      }
    }

    setupIframe()
  }, [panelId, workspaceId])

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-sm font-semibold text-red-900">Error loading FloWise AI</div>
          <div className="mt-2 text-xs text-red-700">{error}</div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-600">Loading FloWise AI...</div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-white"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="text-sm font-semibold text-gray-900">FloWise AI</div>
        <div className="mt-1 text-xs text-gray-600">Visual AI agent and flow builder</div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="rounded-lg bg-purple-50 p-4 text-sm text-purple-800">
          <div className="font-semibold">FloWise AI integration coming soon</div>
          <div className="mt-2 text-xs">
            This panel will embed the FloWise AI flow builder, enabling you to create and execute
            complex AI agent flows with visual orchestration.
          </div>
          <div className="mt-3 space-y-1 text-xs">
            <div>• Visual flow builder for AI chains</div>
            <div>• Multi-model orchestration (Claude, OpenAI, Gemini, etc.)</div>
            <div>• Integration with n8n workflows and browser automation</div>
            <div>• Per-flow memory and context management</div>
            <div>• Save flows to .cate/ai-flows/</div>
          </div>
        </div>
      </div>
    </div>
  )
}
