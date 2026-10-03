// =============================================================================
// N8nFlowPanel — n8n workflow builder and executor panel
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface N8nFlowPanelProps extends PanelProps {}

export default function N8nFlowPanel(props: N8nFlowPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="n8n"
      title="n8n Workflows"
      defaultUrl="http://localhost:5678"
      launchCommand="npx n8n"
      brandColor="#EA580C"
    />
  )
}
