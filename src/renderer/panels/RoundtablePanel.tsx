// =============================================================================
// RoundtablePanel — Shared multi-user / multi-agent pair programming room
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface RoundtablePanelProps extends PanelProps {}

export default function RoundtablePanel(props: RoundtablePanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="roundtable"
      title="Roundtable Room"
      defaultUrl="http://localhost:4173"
      launchCommand="npm start"
      brandColor="#6366F1"
    />
  )
}
