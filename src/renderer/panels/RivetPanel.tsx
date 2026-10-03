// =============================================================================
// RivetPanel — Rivet AI visual programming environment
// =============================================================================

import EmbeddedServicePanel from './EmbeddedServicePanel'
import type { PanelProps } from './types'

export interface RivetPanelProps extends PanelProps {}

export default function RivetPanel(props: RivetPanelProps) {
  return (
    <EmbeddedServicePanel
      {...props}
      serviceId="rivet"
      title="Rivet AI"
      defaultUrl="http://localhost:3000"
      launchCommand="npx rivet-app"
      brandColor="#3B82F6"
    />
  )
}
