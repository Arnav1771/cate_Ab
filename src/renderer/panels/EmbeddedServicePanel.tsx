// =============================================================================
// EmbeddedServicePanel — Reusable container for local & remote AI services
// Supports Rivet, AutoGen, Open WebUI, AnythingLLM, FloWise, n8n, etc.
// Includes URL bar, live status indicator, terminal 1-click launcher, and reload.
// =============================================================================

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  ArrowClockwise,
  Play,
  ArrowSquareOut,
  Globe,
  CheckCircle,
  WarningCircle,
} from '@phosphor-icons/react'
import { useRenderCount } from '../lib/perf/perfClient'
import { useAppStore } from '../stores/appStore'
import type { PanelProps } from './types'

export interface EmbeddedServicePanelProps extends PanelProps {
  serviceId: string
  title: string
  defaultUrl: string
  launchCommand: string
  brandColor?: string
}

export default function EmbeddedServicePanel({
  panelId,
  workspaceId,
  serviceId,
  title,
  defaultUrl,
  launchCommand,
  brandColor,
}: EmbeddedServicePanelProps) {
  useRenderCount(`EmbeddedServicePanel:${serviceId}`)
  const webviewRef = useRef<any>(null)
  
  const storageKey = `cate-service-url:${serviceId}`
  const [url, setUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) || defaultUrl
    } catch {
      return defaultUrl
    }
  })
  const [inputUrl, setInputUrl] = useState<string>(url)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting')

  const handleNavigate = useCallback((targetUrl: string) => {
    let clean = targetUrl.trim()
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `http://${clean}`
    }
    setUrl(clean)
    setInputUrl(clean)
    setIsEditing(false)
    setStatus('connecting')
    try {
      localStorage.setItem(storageKey, clean)
    } catch {
      // ignore storage errors
    }
    if (webviewRef.current) {
      webviewRef.current.src = clean
    }
  }, [storageKey])

  const handleReload = () => {
    setStatus('connecting')
    webviewRef.current?.reload()
  }

  const handleLaunchTerminal = () => {
    if (!workspaceId) return
    const app = useAppStore.getState()
    // Spawn terminal in current workspace with launchCommand pre-executed
    app.createTerminal(workspaceId, `${launchCommand}\n`)
  }

  const handleOpenExternal = () => {
    if (window.electronAPI?.openExternalUrl) {
      window.electronAPI.openExternalUrl(url)
    } else {
      window.open(url, '_blank')
    }
  }

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const onDidFinishLoad = () => {
      setStatus('connected')
    }

    const onDidFailLoad = (event: any) => {
      if (event.errorCode === -3) return // ignore intentional cancellation
      setStatus('error')
    }

    webview.addEventListener('did-finish-load', onDidFinishLoad)
    webview.addEventListener('did-fail-load', onDidFailLoad)
    return () => {
      webview.removeEventListener('did-finish-load', onDidFinishLoad)
      webview.removeEventListener('did-fail-load', onDidFailLoad)
    }
  }, [url])

  return (
    <div className="flex h-full w-full flex-col bg-surface-0 select-none">
      {/* Top Header Control Bar */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-subtle bg-surface-4 px-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded text-white shrink-0 tracking-wide"
            style={{ backgroundColor: brandColor || '#3B82F6' }}
          >
            {title}
          </span>

          {/* Status Indicator */}
          <div className="flex items-center gap-1 shrink-0">
            {status === 'connected' && (
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium" title="Connected">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            )}
            {status === 'connecting' && (
              <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium" title="Connecting...">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Connecting
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center gap-1 text-[11px] text-rose-400 font-medium" title="Not Reachable">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Offline
              </span>
            )}
          </div>
        </div>

        {/* Live URL Input / Display */}
        <div className="flex-1 max-w-sm">
          {isEditing ? (
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNavigate(inputUrl)
                if (e.key === 'Escape') {
                  setInputUrl(url)
                  setIsEditing(false)
                }
              }}
              onBlur={() => {
                handleNavigate(inputUrl)
              }}
              autoFocus
              className="w-full text-xs bg-surface-6 text-primary px-2 py-1 rounded border border-accent/40 focus:outline-none"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="w-full text-xs font-mono text-muted hover:text-primary bg-surface-5 hover:bg-surface-6 px-2 py-1 rounded cursor-text truncate border border-subtle transition-colors"
              title="Click to edit URL or port"
            >
              {url}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleLaunchTerminal}
            className="flex items-center gap-1.5 h-7 px-2 rounded text-xs font-medium text-primary bg-surface-5 hover:bg-hover border border-subtle transition-colors"
            title={`Open Terminal and run: ${launchCommand}`}
          >
            <Play size={12} weight="fill" className="text-emerald-400" />
            <span className="hidden sm:inline">Launch</span>
          </button>

          <button
            onClick={handleReload}
            className="flex h-7 w-7 items-center justify-center rounded text-primary hover:bg-hover transition-colors"
            title="Reload webview"
          >
            <ArrowClockwise size={13} />
          </button>

          <button
            onClick={handleOpenExternal}
            className="flex h-7 w-7 items-center justify-center rounded text-primary hover:bg-hover transition-colors"
            title="Open in external browser"
          >
            <ArrowSquareOut size={13} />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 bg-white overflow-hidden">
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-3 p-6 text-center z-10 select-text">
            <div className="w-12 h-12 rounded-xl bg-surface-5 flex items-center justify-center mb-3 text-muted">
              <Globe size={28} />
            </div>
            <div className="text-sm font-semibold text-primary mb-1">
              Could not connect to {title}
            </div>
            <div className="text-xs text-muted max-w-sm mb-4">
              Unable to reach <code className="text-primary font-mono bg-surface-5 px-1 rounded">{url}</code>.
              Ensure the service is started or launch it below:
            </div>
            <div className="flex items-center gap-2 mb-4">
              <code className="text-xs font-mono bg-surface-6 border border-subtle px-2 py-1 rounded text-primary">
                {launchCommand}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLaunchTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-colors"
              >
                <Play size={12} weight="fill" />
                Launch in Terminal
              </button>
              <button
                onClick={handleReload}
                className="px-3 py-1.5 rounded text-xs font-medium border border-subtle bg-surface-5 text-primary hover:bg-hover transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <webview
          ref={webviewRef}
          src={url}
          className={`h-full w-full ${status === 'error' ? 'hidden' : ''}`}
          partition={`persist:${serviceId}-${panelId}`}
        />
      </div>
    </div>
  )
}
