// =============================================================================
// N8nFlowPanel — n8n workflow builder and executor panel
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { useRenderCount } from '../lib/perf/perfClient'
import log from '../lib/logger'
import type { PanelProps } from './types'

export interface N8nFlowPanelProps extends PanelProps {}

export default function N8nFlowPanel({ panelId, workspaceId }: N8nFlowPanelProps) {
  useRenderCount('N8nFlowPanel')
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const setupIframe = async () => {
      try {
        // TODO: When n8n is integrated, embed iframe pointing to localhost:5678
        // For now, show a placeholder
        setIsLoading(false)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        log.error(`N8nFlowPanel: ${message}`)
        setError(message)
      }
    }

    setupIframe()
  }, [panelId, workspaceId])

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-sm font-semibold text-red-900">Error loading n8n</div>
          <div className="mt-2 text-xs text-red-700">{error}</div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-600">Loading n8n Workflows...</div>
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
        <div className="text-sm font-semibold text-gray-900">n8n Workflows</div>
        <div className="mt-1 text-xs text-gray-600">
          Workflow builder and execution engine (Phase 2 implementation)
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <div className="font-semibold">n8n integration coming soon</div>
          <div className="mt-2 text-xs">
            This panel will embed the n8n workflow builder, allowing you to create and execute
            automation workflows directly in Cate.
          </div>
          <div className="mt-3 space-y-1 text-xs">
            <div>• Drag-and-drop workflow nodes</div>
            <div>• Execute workflows with context from editor/terminal/git</div>
            <div>• Monitor execution status and logs</div>
            <div>• Save workflows to .cate/workflows/</div>
          </div>
        </div>
      </div>
    </div>
  )
}
