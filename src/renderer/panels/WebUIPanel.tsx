// =============================================================================
// WebUIPanel — Open WebUI for local models
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface WebUIPanelProps extends PanelProps {}

export default function WebUIPanel(props: WebUIPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="webui"
      title="Open WebUI"
      defaultUrl="http://localhost:8080"
      launchCommand="open-webui serve"
      brandColor="#F59E0B"
    />
  )
}
