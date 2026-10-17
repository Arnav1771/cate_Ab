// =============================================================================
// AgentDeckPanel — Live AI coding agent control tower & telemetry panel
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface AgentDeckPanelProps extends PanelProps {}

export default function AgentDeckPanel(props: AgentDeckPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="agentdeck"
      title="AgentDeck Control Tower"
      defaultUrl="http://localhost:4317"
      launchCommand="npx agentdeck serve"
      brandColor="#F59E0B"
    />
  )
}
