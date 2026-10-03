// =============================================================================
// AnythingLLMPanel — AnythingLLM embedded panel
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface AnythingLLMPanelProps extends PanelProps {}

export default function AnythingLLMPanel(props: AnythingLLMPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="anythingllm"
      title="AnythingLLM"
      defaultUrl="http://localhost:3001"
      launchCommand="npx anythingllm"
      brandColor="#059669"
    />
  )
}
