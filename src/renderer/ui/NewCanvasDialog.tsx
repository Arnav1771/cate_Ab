import React, { useEffect } from 'react'
import { SquaresFour, Gear, Brain, Network, Robot, ChatCircle, Database } from '@phosphor-icons/react'
import { useUIStore } from '../stores/uiStore'
import { useAppStore } from '../stores/appStore'

export const NewCanvasDialog: React.FC = () => {
  const show = useUIStore((s) => s.showNewCanvasDialog)
  const setShow = useUIStore((s) => s.setShowNewCanvasDialog)
  const selectedWorkspaceId = useAppStore((s) => s.selectedWorkspaceId)
  
  const close = () => setShow(false)
  
  // Close on Escape
  useEffect(() => {
    if (!show) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [show])

  if (!show) return null

  const app = useAppStore.getState()
  const dockCenter = { target: 'dock', zone: 'center' } as const

  const options = [
    { id: 'blank', name: 'Blank Canvas', desc: 'Standard infinite board', icon: <SquaresFour weight="fill" />, color: 'bg-violet-500', action: () => app.createCanvas(selectedWorkspaceId, undefined, dockCenter) },
    { id: 'n8n', name: 'n8n Automation', desc: 'API & Workflow orchestration', icon: <Gear weight="fill" />, color: 'bg-red-500', action: () => app.createN8nFlow(selectedWorkspaceId, undefined, dockCenter) },
    { id: 'flowise', name: 'FloWise AI', desc: 'Visual Agent builder', icon: <Brain weight="fill" />, color: 'bg-purple-500', action: () => app.createFlowiseAI(selectedWorkspaceId, undefined, dockCenter) },
    { id: 'rivet', name: 'Rivet AI', desc: 'AI chain programming', icon: <Network weight="fill" />, color: 'bg-blue-500', action: () => app.createRivet(selectedWorkspaceId, undefined, dockCenter) },
    { id: 'autogen', name: 'AutoGen Studio', desc: 'Multi-agent system builder', icon: <Robot weight="fill" />, color: 'bg-pink-500', action: () => app.createAutoGen(selectedWorkspaceId, undefined, dockCenter) },
    { id: 'webui', name: 'Open WebUI', desc: 'Local model chat & testing', icon: <ChatCircle weight="fill" />, color: 'bg-amber-500', action: () => app.createWebUI(selectedWorkspaceId, undefined, dockCenter) },
    { id: 'anythingllm', name: 'AnythingLLM', desc: 'Local RAG & document chatting', icon: <Database weight="fill" />, color: 'bg-emerald-500', action: () => app.createAnythingLLM(selectedWorkspaceId, undefined, dockCenter) },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={close}>
      <div 
        className="w-[700px] rounded-xl bg-surface-1 border border-strong shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-primary mb-1">Create New Canvas</h2>
        <p className="text-sm text-muted mb-6">Choose an environment to embed in the workspace.</p>
        
        <div className="grid grid-cols-2 gap-3">
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => { opt.action(); close() }}
              className="flex items-start text-left p-4 rounded-lg bg-surface-2 border border-subtle hover:bg-surface-3 hover:border-strong transition-colors group"
            >
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${opt.color}`}>
                {React.cloneElement(opt.icon as React.ReactElement, { size: 20 })}
              </div>
              <div className="ml-4">
                <div className="text-sm font-semibold text-primary group-hover:text-blue-400">{opt.name}</div>
                <div className="mt-1 text-xs text-muted leading-relaxed">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
