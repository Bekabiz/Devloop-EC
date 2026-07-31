import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"

import { CINEMATIC_ORDER, cinematicUrl } from "./cinematicOrder"

const COUNT = CINEMATIC_ORDER.length
const urls = CINEMATIC_ORDER.map(cinematicUrl)

/** Deterministic pseudo-random scatter so the flight path is stable. */
function layout(i: number) {
  const rnd = (seed: number) => {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
  }
  const z = -i * 4.6
  const side = i % 2 === 0 ? -1 : 1
  // calmer, more composed drift: gentle alternating offsets, larger planes
  // up front so the sequence opens with the biggest projects filling the view
  const x = side * (1.7 + rnd(i) * 1.6)
  const y = (rnd(i + 40) - 0.5) * 1.7
  const rot = side * (0.04 + rnd(i + 80) * 0.05)
  const scale = (i < 6 ? 3.2 : 2.7) + rnd(i + 120) * 0.9
  return { x, y, z, rot, scale }
}

function Photos({ progress }: { progress: React.MutableRefObject<number> }) {
  const textures = useLoader(THREE.TextureLoader, urls)
  const group = useRef<THREE.Group>(null)
  const planes = useMemo(() => urls.map((_, i) => layout(i)), [])
  const camZ = useRef(6)

  useFrame(({ camera }) => {
    const total = COUNT * 4.6
    const target = 6 - progress.current * (total + 4)
    camZ.current += (target - camZ.current) * 0.08
    camera.position.z = camZ.current
    camera.position.x = Math.sin(progress.current * Math.PI * 2) * 0.22
    camera.position.y = Math.sin(progress.current * Math.PI * 3) * 0.12
    if (group.current) {
      group.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh
        const d = mesh.position.z - camera.position.z
        const mat = mesh.material as THREE.MeshBasicMaterial
        // fade in from far, fade out as it passes the camera
        const fadeIn = THREE.MathUtils.clamp((d + 46) / 18, 0, 1)
        const fadeOut = THREE.MathUtils.clamp((-d - 1.2) / 3.4, 0, 1)
        mat.opacity = fadeIn * fadeOut
      })
    }
  })

  return (
    <group ref={group}>
      {textures.map((tex, i) => {
        const p = planes[i]
        const img = tex.image as { width: number; height: number }
        const aspect = img && img.height ? img.width / img.height : 1.5
        tex.colorSpace = THREE.SRGBColorSpace
        return (
          <mesh key={i} position={[p.x, p.y, p.z]} rotation={[0, 0, p.rot]}>
            <planeGeometry args={[p.scale * aspect, p.scale]} />
            <meshBasicMaterial map={tex} transparent toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function CinematicScene({
  progress,
}: {
  progress: React.MutableRefObject<number>
}) {
  return (
    <Canvas
      className="cinematic__canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 55, near: 0.1, far: 80, position: [0, 0, 6] }}
    >
      <Suspense fallback={null}>
        <Photos progress={progress} />
      </Suspense>
    </Canvas>
  )
}
