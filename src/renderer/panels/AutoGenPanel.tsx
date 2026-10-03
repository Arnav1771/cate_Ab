// =============================================================================
// AutoGenPanel — AutoGen Studio multi-agent prototyping
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface AutoGenPanelProps extends PanelProps {}

export default function AutoGenPanel(props: AutoGenPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="autogen"
      title="AutoGen Studio"
      defaultUrl="http://localhost:8081"
      launchCommand="autogenstudio ui --port 8081"
      brandColor="#EC4899"
    />
  )
}
