// =============================================================================
// FlowiseAIPanel — FloWise AI flow builder and executor panel
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface FlowiseAIPanelProps extends PanelProps {}

export default function FlowiseAIPanel(props: FlowiseAIPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="flowise"
      title="FloWise AI"
      defaultUrl="http://localhost:3000"
      launchCommand="npx flowise"
      brandColor="#8B5CF6"
    />
  )
}
