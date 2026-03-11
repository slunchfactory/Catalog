'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

type ProductItem = {
  id: string
  name: string
  w: number
  d: number
  h: number
  color: string
  accent: string
}

const PALLET_TYPES: Record<string, { label: string; w: number; d: number; maxH: number }> = {
  ISO2: { label: '국제 (ISO2) · 1200×1000mm', w: 1200, d: 1000, maxH: 1800 },
  EUR: { label: '유럽 (EUR/EPAL) · 1200×800mm', w: 1200, d: 800, maxH: 1800 },
  GMA: { label: '미국 (GMA) · 1219×1016mm', w: 1219, d: 1016, maxH: 1800 },
  JP: { label: '일본 · 1100×1100mm', w: 1100, d: 1100, maxH: 1800 },
  AU: { label: '호주 · 1165×1165mm', w: 1165, d: 1165, maxH: 1800 },
}

const CONTAINER_TYPES: Record<string, {
  label: string
  innerL: number
  innerW: number
  innerH: number
  cbm: number
  type: 'dry' | 'reefer'
}> = {
  '20ft_dry': { label: '20ft Dry', innerL: 5898, innerW: 2352, innerH: 2393, cbm: 25, type: 'dry' },
  '40ft_dry': { label: '40ft Dry', innerL: 12032, innerW: 2352, innerH: 2393, cbm: 55, type: 'dry' },
  '40ft_HC_dry': { label: '40ft HC Dry', innerL: 12032, innerW: 2352, innerH: 2698, cbm: 67, type: 'dry' },
  '20ft_reefer': { label: '20ft Reefer', innerL: 5440, innerW: 2268, innerH: 2194, cbm: 22, type: 'reefer' },
  '40ft_HC_reefer': { label: '40ft HC Reefer', innerL: 11580, innerW: 2268, innerH: 2194, cbm: 57, type: 'reefer' },
}

const ROOM_TEMP_PRODUCTS: ProductItem[] = [
  { id: 'kimchi-rice', name: '비건 김치볶음밥 밀키트', w: 410, d: 306, h: 306, color: '#E63946', accent: '#E63946' },
  { id: 'kimchi-can', name: '비건 김치캔', w: 442, d: 300, h: 115, color: '#2D6A4F', accent: '#2D6A4F' },
  { id: 'kimchi-pancake', name: '비건 김치전 밀키트', w: 410, d: 306, h: 306, color: '#E9C46A', accent: '#E9C46A' },
  { id: 'kalguksu', name: '김치칼국수 밀키트', w: 440, d: 350, h: 330, color: '#264653', accent: '#264653' },
]

const REFRIGERATED_PRODUCTS: ProductItem[] = [
  { id: 'ranch', name: '비건 랜치 소스', w: 460, d: 340, h: 165, color: '#00B4D8', accent: '#00B4D8' },
  { id: 'lemon', name: '레몬드레싱 소스', w: 460, d: 340, h: 165, color: '#F4A261', accent: '#F4A261' },
  { id: 'buncha', name: '분짜 소스', w: 460, d: 340, h: 165, color: '#E76F51', accent: '#E76F51' },
  { id: 'balsamic', name: '발사믹 드레싱', w: 460, d: 340, h: 165, color: '#6D2B2B', accent: '#6D2B2B' },
  { id: 'oriental', name: '오리엔탈 드레싱', w: 460, d: 340, h: 165, color: '#457B9D', accent: '#457B9D' },
  { id: 'gamtae', name: '감태 버터', w: 400, d: 335, h: 150, color: '#1B4332', accent: '#1B4332' },
  { id: 'pesto', name: '매생이 페스토', w: 400, d: 335, h: 150, color: '#52B788', accent: '#52B788' },
]

const FROZEN_PRODUCTS: ProductItem[] = [
  { id: 'blueberry-tart', name: '비건 블루베리 타르트', w: 510, d: 260, h: 290, color: '#7B2D8B', accent: '#7B2D8B' },
  { id: 'peach-tart', name: '비건 복숭아 타르트', w: 510, d: 260, h: 290, color: '#F4845F', accent: '#F4845F' },
  { id: 'gnocchi', name: '시금치 뇨끼 밀키트', w: 430, d: 310, h: 290, color: '#4A7C59', accent: '#4A7C59' },
  { id: 'penne', name: '매생이 크림 펜네', w: 430, d: 310, h: 290, color: '#3A7D44', accent: '#3A7D44' },
  { id: 'risotto', name: '매생이 트러플 리조또', w: 430, d: 310, h: 290, color: '#5C4033', accent: '#5C4033' },
  { id: 'peach-slice', name: '복숭아타르트 조각', w: 440, d: 330, h: 290, color: '#FFBA49', accent: '#FFBA49' },
  { id: 'blueberry-slice', name: '블루베리타르트 조각', w: 440, d: 330, h: 290, color: '#9B5DE5', accent: '#9B5DE5' },
  { id: 'chocobar', name: '피넛버터초코바', w: 440, d: 330, h: 290, color: '#8B4513', accent: '#8B4513' },
]

const ALL_PRODUCTS = [...ROOM_TEMP_PRODUCTS, ...REFRIGERATED_PRODUCTS, ...FROZEN_PRODUCTS]

const CATEGORY_PRODUCTS: Record<'실온' | '냉장' | '냉동', ProductItem[]> = {
  '실온': ROOM_TEMP_PRODUCTS,
  '냉장': REFRIGERATED_PRODUCTS,
  '냉동': FROZEN_PRODUCTS,
}

const SCALE = 1 / 1000 // 1mm = 0.001 three.js unit → 1200mm = 1.2 unit

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}

type PalletSpec = { w: number; d: number; maxH: number }

function buildPallet(scene: THREE.Scene, pallet: { w: number; d: number; maxH: number }) {
  const group = new THREE.Group()
  const palW = pallet.w * SCALE
  const palD = pallet.d * SCALE
  const boardH = 0.018
  const legH = 0.06
  const lightWood = new THREE.MeshLambertMaterial({ color: '#C8A87A' })
  const darkWood = new THREE.MeshLambertMaterial({ color: '#A8885A' })

  // ① 상판 — 하나의 solid 판
  const topGeo = new THREE.BoxGeometry(palW, boardH, palD)
  const top = new THREE.Mesh(topGeo, lightWood)
  top.position.set(0, legH + boardH / 2, 0)
  top.castShadow = true
  top.receiveShadow = true
  group.add(top)

  // ② 다리 블록 9개 (3×3 배열)
  const legSize = palW * 0.12
  for (let xi = -1; xi <= 1; xi++) {
    for (let zi = -1; zi <= 1; zi++) {
      const legGeo = new THREE.BoxGeometry(legSize, legH, legSize)
      const leg = new THREE.Mesh(legGeo, darkWood)
      leg.position.set(xi * palW * 0.38, legH / 2, zi * palD * 0.38)
      leg.castShadow = true
      leg.receiveShadow = true
      group.add(leg)
    }
  }

  // ③ 하판 — 하나의 solid 판
  const botGeo = new THREE.BoxGeometry(palW, boardH, palD)
  const bot = new THREE.Mesh(botGeo, lightWood)
  bot.position.set(0, boardH / 2, 0)
  bot.receiveShadow = true
  group.add(bot)

  scene.add(group)
  return group
}

const CATEGORIES = ['실온', '냉장', '냉동'] as const

export type SimulatorStats = {
  category: '실온' | '냉장' | '냉동'
  totalBoxes: number
  totalCBM: number
  palletsNeeded: number
  containersNeeded: number
  containerLabel: string
  items: Array<{
    id: string
    name: string
    qty: number
    unitsPerCarton?: number
    unitPrice?: number
  }>
}

export type PalletSimulatorProps = {
  onStatsChange?: (stats: Record<string, SimulatorStats | null>) => void
}

function computeStatsFromQtys(
  qtys: Record<string, number>,
  palletType: string
): Record<string, SimulatorStats | null> {
  const pallet = PALLET_TYPES[palletType]
  if (!pallet) return { 실온: null, 냉장: null, 냉동: null }
  const palletVolume = (pallet.w * pallet.d * pallet.maxH) / 1e9
  const result: Record<string, SimulatorStats | null> = { 실온: null, 냉장: null, 냉동: null }
  const categories = ['실온', '냉장', '냉동'] as const
  for (const cat of categories) {
    const products = CATEGORY_PRODUCTS[cat]
    const productList: ProductItem[] = []
    for (const p of products) {
      const qty = qtys[p.id] ?? 0
      if (qty > 0) for (let i = 0; i < qty; i++) productList.push(p)
    }
    if (productList.length === 0) continue
    const totalCBM = productList.reduce((s, p) => s + (p.w * p.d * p.h) / 1e9, 0)
    const containerKey = cat === '실온' ? '40ft_HC_dry' : '40ft_HC_reefer'
    const container = CONTAINER_TYPES[containerKey]
    if (!container) continue
    const palletsNeeded = Math.ceil(totalCBM / palletVolume)
    const containersNeeded = Math.ceil(totalCBM / container.cbm)
    const byId: Record<string, { name: string; qty: number }> = {}
    for (const p of productList) {
      if (!byId[p.id]) byId[p.id] = { name: p.name, qty: 0 }
      byId[p.id].qty += 1
    }
    const items = Object.entries(byId).map(([id, { name, qty }]) => ({ id, name, qty }))
    result[cat] = {
      category: cat,
      totalBoxes: productList.length,
      totalCBM: Math.round(totalCBM * 1000) / 1000,
      palletsNeeded,
      containersNeeded,
      containerLabel: container.label,
      items,
    }
  }
  return result
}

function buildScene(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
  scene.background = new THREE.Color('#F5F0EB')
  scene.fog = new THREE.Fog('#F5F0EB', 8, 20)

  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)
  const dirLight = new THREE.DirectionalLight(0xfff8f0, 1.2)
  dirLight.position.set(4, 8, 4)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.set(2048, 2048)
  dirLight.shadow.camera.near = 0.1
  dirLight.shadow.camera.far = 30
  dirLight.shadow.camera.left = -5
  dirLight.shadow.camera.right = 5
  dirLight.shadow.camera.top = 5
  dirLight.shadow.camera.bottom = -5
  scene.add(dirLight)
  const fillLight = new THREE.DirectionalLight(0xe0f0ff, 0.3)
  fillLight.position.set(-3, 2, -2)
  scene.add(fillLight)

  const floorGeo = new THREE.PlaneGeometry(12, 12)
  const floorMat = new THREE.MeshLambertMaterial({ color: '#E8E0D8' })
  const floor = new THREE.Mesh(floorGeo, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  camera.position.set(3.2, 2.8, 3.2)
  camera.lookAt(0, 0.5, 0)
}

export default function PalletSimulator(props: PalletSimulatorProps = {}) {
  const { onStatsChange } = props
  const mountRefs = useRef<Record<string, HTMLDivElement | null>>({
    '실온': null, '냉장': null, '냉동': null,
  })
  const rendererRefs = useRef<Record<string, THREE.WebGLRenderer | null>>({
    '실온': null, '냉장': null, '냉동': null,
  })
  const sceneRefs = useRef<Record<string, THREE.Scene | null>>({
    '실온': null, '냉장': null, '냉동': null,
  })
  const cameraRefs = useRef<Record<string, THREE.PerspectiveCamera | null>>({
    '실온': null, '냉장': null, '냉동': null,
  })
  const animFrameRefs = useRef<Record<string, number>>({
    '실온': 0, '냉장': 0, '냉동': 0,
  })
  const boxMeshesRefs = useRef<Record<string, THREE.Object3D[]>>({
    '실온': [], '냉장': [], '냉동': [],
  })
  const palletGroupRefs = useRef<Record<string, THREE.Group | null>>({
    '실온': null, '냉장': null, '냉동': null,
  })
  const cameraAngleRefs = useRef<Record<string, { theta: number; phi: number; radius: number }>>({
    '실온': { theta: Math.PI / 4, phi: Math.PI / 3, radius: 3.5 },
    '냉장': { theta: Math.PI / 4, phi: Math.PI / 3, radius: 3.5 },
    '냉동': { theta: Math.PI / 4, phi: Math.PI / 3, radius: 3.5 },
  })
  const activeCategoryRef = useRef<'실온' | '냉장' | '냉동'>('실온')

  const [activeCategory, setActiveCategory] = useState<'실온' | '냉장' | '냉동'>('실온')
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({})
  const [palletType, setPalletType] = useState<string>('ISO2')
  const [containerType, setContainerType] = useState<string>('40ft_HC_dry')
  const [placedBoxes, setPlacedBoxes] = useState<any[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [stats, setStats] = useState<{
    totalBoxes: number
    totalCBM: number
    palletsNeeded: number
    containersNeeded: number
  } | null>(null)

  const [statsPerCategory, setStatsPerCategory] = useState<Record<string, SimulatorStats | null>>({
    '실온': null,
    '냉장': null,
    '냉동': null,
  })

  const displayedProducts = CATEGORY_PRODUCTS[activeCategory]

  // 컨테이너 선택 제한: 실온 → dry, 냉장/냉동 → reefer (탭 전환 시 자동 교체)
  useEffect(() => {
    const currentContainer = CONTAINER_TYPES[containerType]
    if (!currentContainer) return
    if (activeCategory === '실온' && currentContainer.type === 'reefer') {
      setContainerType('40ft_HC_dry')
    } else if ((activeCategory === '냉장' || activeCategory === '냉동') && currentContainer.type === 'dry') {
      setContainerType('40ft_HC_reefer')
    }
  }, [activeCategory, containerType])

  // activeCategory ref 동기화 (카메라 등에서 최신 탭 참조)
  useEffect(() => {
    activeCategoryRef.current = activeCategory
  }, [activeCategory])

  // Three.js 씬 초기화 — 탭별 독립 renderer + scene + camera
  useEffect(() => {
    CATEGORIES.forEach((cat) => {
      const mount = mountRefs.current[cat]
      if (!mount || rendererRefs.current[cat]) return

      const W = mount.clientWidth
      const H = mount.clientHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      mount.appendChild(renderer.domElement)
      rendererRefs.current[cat] = renderer

      const scene = new THREE.Scene()
      sceneRefs.current[cat] = scene

      const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 50)
      cameraRefs.current[cat] = camera

      buildScene(scene, camera)
      palletGroupRefs.current[cat] = buildPallet(scene, PALLET_TYPES['ISO2'])

      const animate = () => {
        animFrameRefs.current[cat] = requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    })

    const handleResize = () => {
      CATEGORIES.forEach((cat) => {
        const mount = mountRefs.current[cat]
        const renderer = rendererRefs.current[cat]
        const camera = cameraRefs.current[cat]
        if (!mount || !renderer || !camera) return
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      CATEGORIES.forEach((cat) => {
        cancelAnimationFrame(animFrameRefs.current[cat])
        const renderer = rendererRefs.current[cat]
        if (renderer) {
          renderer.dispose()
          const mount = mountRefs.current[cat]
          if (mount && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
          rendererRefs.current[cat] = null
        }
        sceneRefs.current[cat] = null
        cameraRefs.current[cat] = null
        palletGroupRefs.current[cat] = null
        boxMeshesRefs.current[cat] = []
      })
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 팔레트 규격 변경 시 3개 탭 씬 모두 팔레트 업데이트
  useEffect(() => {
    const spec = PALLET_TYPES[palletType]
    if (!spec) return
    CATEGORIES.forEach((cat) => {
      const scene = sceneRefs.current[cat]
      if (!scene) return
      const oldGroup = palletGroupRefs.current[cat]
      if (oldGroup) {
        scene.remove(oldGroup)
        palletGroupRefs.current[cat] = null
      }
      palletGroupRefs.current[cat] = buildPallet(scene, spec)
    })
  }, [palletType])

  const computePlacements = useCallback((
    products: ProductItem[],
    pallet: PalletSpec,
    mode: '실온' | '냉장' | '냉동'
  ) => {
    const placements: any[] = []
    const STEP = 10
    const WALL_GAP = mode === '냉장' ? 100 : 0 // 팔레트 벽면 이격 (mm)
    const AIR_GAP = mode === '냉장' ? 50 : 0 // 박스 간 공기 통로 (mm)

    const palW = pallet.w - WALL_GAP * 2
    const palD = pallet.d - WALL_GAP * 2
    const offsetX = WALL_GAP
    const offsetZ = WALL_GAP
    const palMaxH = pallet.maxH
    const grid: Record<string, number> = {}

    const getHeight = (x: number, z: number, w: number, d: number): number => {
      let maxH = 0
      for (let xi = x; xi < x + w; xi += STEP)
        for (let zi = z; zi < z + d; zi += STEP) {
          const key = `${Math.floor(xi / STEP)}_${Math.floor(zi / STEP)}`
          maxH = Math.max(maxH, grid[key] || 0)
        }
      return maxH
    }

    const setHeight = (x: number, z: number, w: number, d: number, h: number) => {
      for (let xi = x; xi < x + w; xi += STEP)
        for (let zi = z; zi < z + d; zi += STEP) {
          const key = `${Math.floor(xi / STEP)}_${Math.floor(zi / STEP)}`
          grid[key] = h
        }
    }

    /**
     * 박스를 (px, py, pz) 위치에 놓을 때,
     * 바닥면(px~px+bw, pz~pz+bd)이 충분히 지지되는지 검증.
     * - py === 0이면 팔레트 위 → 항상 true
     * - py > 0이면 아래 박스들이 바닥면의 SUPPORT_RATIO 이상 커버하는지 확인
     */
    const isSupportedAt = (
      px: number,
      py: number,
      pz: number,
      bw: number,
      bd: number,
      placed: { x: number; y: number; z: number; w: number; h: number; d: number }[]
    ): boolean => {
      const SUPPORT_RATIO = 0.7 // 70% 이상 지지면 필요
      if (py <= 1) return true // 팔레트 바닥 (부동소수점 여유)

      const boxArea = bw * bd
      if (boxArea <= 0) return false

      // 아래 박스들 중 이 박스 바닥면과 겹치는 것들의 면적 합산
      let supportedArea = 0
      for (const p of placed) {
        const topY = p.y + p.h
        // 이 박스의 바닥(py)과 맞닿는 박스만 (1mm 여유)
        if (Math.abs(topY - py) > 1) continue

        // X축 겹침
        const overlapX = Math.min(px + bw, p.x + p.w) - Math.max(px, p.x)
        if (overlapX <= 0) continue

        // Z축 겹침
        const overlapZ = Math.min(pz + bd, p.z + p.d) - Math.max(pz, p.z)
        if (overlapZ <= 0) continue

        supportedArea += overlapX * overlapZ
      }

      return supportedArea / boxArea >= SUPPORT_RATIO
    }

    // 배치 후보: 기존 박스 엣지(inner 좌표) + 팔레트 경계
    const getCandidatePositions = (bw: number, bd: number): Array<{ x: number; z: number }> => {
      const xs = new Set<number>([0])
      const zs = new Set<number>([0])
      for (const p of placements) {
        const innerRight = p.x + p.w - offsetX
        const innerFront = p.z + p.d - offsetZ
        if (innerRight <= palW - bw) xs.add(innerRight)
        if (innerFront <= palD - bd) zs.add(innerFront)
      }
      if (palW - bw >= 0) xs.add(palW - bw)
      if (palD - bd >= 0) zs.add(palD - bd)

      const candidates: Array<{ x: number; z: number }> = []
      xs.forEach((x) => {
        zs.forEach((z) => {
          if (x >= 0 && x + bw <= palW && z >= 0 && z + bd <= palD) {
            candidates.push({ x, z })
          }
        })
      })
      return candidates
    }

    const findBestPosition = (bw: number, bd: number, bh: number) => {
      const candidates = getCandidatePositions(bw, bd)
      let bestX = -1, bestZ = -1, bestH = Infinity

      for (const { x, z } of candidates) {
        const baseH = getHeight(x, z, bw, bd)
        const supported = isSupportedAt(x + offsetX, baseH, z + offsetZ, bw, bd, placements)
        if (baseH + bh <= palMaxH && baseH < bestH && supported) {
          bestH = baseH
          bestX = x
          bestZ = z
        }
      }
      return { x: bestX, z: bestZ, h: bestH }
    }

    for (const p of products) {
      const pos1 = p.w <= palW && p.d <= palD
        ? findBestPosition(p.w, p.d, p.h)
        : { x: -1, z: -1, h: Infinity }

      const pos2 = p.w !== p.d && p.d <= palW && p.w <= palD
        ? findBestPosition(p.d, p.w, p.h)
        : { x: -1, z: -1, h: Infinity }

      let chosen: { x: number; z: number; h: number; rotated: boolean }
      if (pos1.x >= 0 && (pos2.x < 0 || pos1.h <= pos2.h)) {
        chosen = { ...pos1, rotated: false }
      } else if (pos2.x >= 0) {
        chosen = { ...pos2, rotated: true }
      } else {
        continue
      }

      const bw = chosen.rotated ? p.d : p.w
      const bd = chosen.rotated ? p.w : p.d

      placements.push({ ...p, x: chosen.x + offsetX, z: chosen.z + offsetZ, y: chosen.h, w: bw, d: bd })
      setHeight(chosen.x, chosen.z, bw + AIR_GAP, bd + AIR_GAP, chosen.h + p.h)
    }

    return placements
  }, [])

  const addBoxToScene = useCallback((placement: any, delay: number, pallet: PalletSpec, category: '실온' | '냉장' | '냉동') => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const scene = sceneRefs.current[category]
        if (!scene) return resolve()
        const w = placement.w * SCALE
        const h = placement.h * SCALE
        const d = placement.d * SCALE
        const geo = new THREE.BoxGeometry(w - 0.005, h - 0.005, d - 0.005)
        const base = new THREE.MeshLambertMaterial({ color: placement.color || '#EFEFEF' })
        const side = new THREE.MeshLambertMaterial({ color: lighten(placement.color || '#EFEFEF', -15) })
        const top = new THREE.MeshLambertMaterial({ color: lighten(placement.color || '#EFEFEF', 15) })
        const mesh = new THREE.Mesh(geo, [side, side, top, base, base, side])
        mesh.castShadow = true
        mesh.receiveShadow = true
        const palletTopY = 0.06 + 0.018 // legH + boardH
        const palW = pallet.w * SCALE
        const palD = pallet.d * SCALE
        const tx = (placement.x + placement.w / 2) * SCALE - palW / 2
        const ty = palletTopY + placement.y * SCALE + h / 2
        const tz = (placement.z + placement.d / 2) * SCALE - palD / 2
        mesh.position.set(tx, ty + 3, tz)
        mesh.scale.set(0.1, 0.1, 0.1)
        scene.add(mesh)
        if (!boxMeshesRefs.current[category]) boxMeshesRefs.current[category] = []
        boxMeshesRefs.current[category].push(mesh)
        const edgesGeo = new THREE.EdgesGeometry(geo)
        const edgesMat = new THREE.LineBasicMaterial({ color: placement.accent, transparent: true, opacity: 0.4 })
        const edges = new THREE.LineSegments(edgesGeo, edgesMat)
        mesh.add(edges)
        const startTime = Date.now()
        const duration = 400
        const startY = ty + 2.5
        const drop = () => {
          const t = Math.min((Date.now() - startTime) / duration, 1)
          const ease = 1 - Math.pow(1 - t, 3)
          mesh.position.y = startY + (ty - startY) * ease
          mesh.scale.setScalar(0.1 + 0.9 * ease)
          if (t < 1) requestAnimationFrame(drop)
          else { mesh.position.y = ty; mesh.scale.set(1, 1, 1); resolve() }
        }
        drop()
      }, delay)
    })
  }, [])

  const clearBoxes = useCallback((category: '실온' | '냉장' | '냉동') => {
    const scene = sceneRefs.current[category]
    if (!scene) return
    const meshes = boxMeshesRefs.current[category]
    if (meshes) meshes.forEach((m) => scene.remove(m))
    boxMeshesRefs.current[category] = []
  }, [])

  const handleClear = useCallback(() => {
    clearBoxes(activeCategoryRef.current)
    setSelectedProducts({})
    setPlacedBoxes([])
    setStats(null)
    const empty = { '실온': null, '냉장': null, '냉동': null }
    setStatsPerCategory(empty)
    onStatsChange?.(empty)
  }, [clearBoxes, onStatsChange])

  const updateCamera = useCallback(() => {
    const cat = activeCategoryRef.current
    const camera = cameraRefs.current[cat]
    if (!camera) return
    const { theta, phi, radius } = cameraAngleRefs.current[cat]
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    camera.position.set(x, y, z)
    camera.lookAt(0, 0.5, 0)
  }, [])

  const rotateLeft = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c].theta -= 0.3; updateCamera() }
  const rotateRight = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c].theta += 0.3; updateCamera() }
  const rotateUp = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c].phi = Math.max(0.2, cameraAngleRefs.current[c].phi - 0.2); updateCamera() }
  const rotateDown = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c].phi = Math.min(1.4, cameraAngleRefs.current[c].phi + 0.2); updateCamera() }
  const zoomIn = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c].radius = Math.max(2, cameraAngleRefs.current[c].radius - 0.5); updateCamera() }
  const zoomOut = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c].radius = Math.min(9, cameraAngleRefs.current[c].radius + 0.5); updateCamera() }
  const resetCamera = () => { const c = activeCategoryRef.current; cameraAngleRefs.current[c] = { theta: Math.PI / 4, phi: Math.PI / 3, radius: 3.5 }; updateCamera() }

  const handleQtyChange = useCallback(
    (id: string, delta: number) => {
      const newQtys = {
        ...selectedProducts,
        [id]: Math.max(0, (selectedProducts[id] ?? 0) + delta),
      }
      setSelectedProducts(newQtys)
      const next = computeStatsFromQtys(newQtys, palletType)
      onStatsChange?.(next)
    },
    [selectedProducts, palletType, onStatsChange]
  )

  const runSimulation = useCallback(async () => {
    if (isAnimating) return
    clearBoxes(activeCategory)
    setIsAnimating(true)
    const productList: ProductItem[] = []
    Object.entries(selectedProducts).forEach(([id, qty]) => {
      const prod = ALL_PRODUCTS.find((p) => p.id === id)
      if (prod && qty > 0) for (let i = 0; i < qty; i++) productList.push(prod)
    })
    if (productList.length === 0) {
      setIsAnimating(false)
      return
    }
    const pallet = PALLET_TYPES[palletType]
    const container = CONTAINER_TYPES[containerType]
    // 부피 내림차순 정렬 — 큰 박스 먼저 배치해 무거운 것이 아래로
    const sorted = [...productList].sort((a, b) => (b.w * b.d * b.h) - (a.w * a.d * a.h))
    const placements = computePlacements(sorted, pallet, activeCategory)
    setPlacedBoxes(placements)

    const totalCBM = productList.reduce((s, p) => s + (p.w * p.d * p.h) / 1e9, 0)
    const palletVolume = (pallet.w * pallet.d * pallet.maxH) / 1e9
    const palletsNeeded = Math.ceil(totalCBM / palletVolume)
    const containersNeeded = Math.ceil(totalCBM / container.cbm)
    const containerLabel = container.label

    const byId: Record<string, { name: string; qty: number }> = {}
    for (const p of productList) {
      if (!byId[p.id]) byId[p.id] = { name: p.name, qty: 0 }
      byId[p.id].qty += 1
    }
    const items = Object.entries(byId).map(([id, { name, qty }]) => ({ id, name, qty }))

    const newStats: SimulatorStats = {
      category: activeCategory,
      totalBoxes: productList.length,
      totalCBM: Math.round(totalCBM * 1000) / 1000,
      palletsNeeded,
      containersNeeded,
      containerLabel,
      items,
    }

    setStats({
      totalBoxes: productList.length,
      totalCBM: Math.round(totalCBM * 1000) / 1000,
      palletsNeeded,
      containersNeeded,
    })

    setStatsPerCategory((prev) => {
      const next = { ...prev, [activeCategory]: newStats }
      onStatsChange?.(next)
      return next
    })

    for (let i = 0; i < placements.length; i++) {
      await addBoxToScene(placements[i], i * 120, pallet, activeCategory)
    }
    setIsAnimating(false)
  }, [selectedProducts, isAnimating, palletType, containerType, activeCategory, computePlacements, addBoxToScene, clearBoxes, onStatsChange])

  const totalBoxes = Object.values(selectedProducts).reduce((s, v) => s + v, 0)

  return (
    <div className="flex h-[600px] overflow-hidden rounded-xl border border-stone-200 bg-[#F5F0EB]">
      {/* 탭: 실온 / 냉장 / 냉동 */}
      <div className="flex w-full flex-col">
        <div className="flex border-b border-stone-200 bg-[#FDFAF7]">
          {(['실온', '냉장', '냉동'] as const).map((cat) => {
            const catProducts = CATEGORY_PRODUCTS[cat]
            const catQty = catProducts.reduce((s, p) => s + (selectedProducts[p.id] || 0), 0)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'border-b-2 border-[#C8202A] font-semibold text-[#C8202A]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat}
                {catQty > 0 && (
                  <span className="rounded-full bg-[#C8202A] px-1.5 py-0.5 text-[9px] leading-none text-white">
                    {catQty}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-1 min-h-0">
          {/* 왼쪽 패널 */}
          <div className="flex w-72 flex-col overflow-hidden border-r border-stone-200 bg-[#FDFAF7]">
            {/* 드롭다운 영역 */}
            <div className="flex-shrink-0 space-y-1.5 border-b border-stone-100 px-3 py-2">
              <div>
                <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  팔레트 규격
                </label>
                <select
                  value={palletType}
                  onChange={(e) => setPalletType(e.target.value)}
                  className="w-full rounded-md border border-stone-200 bg-white px-2 py-1.5 text-xs text-gray-700 focus:border-stone-400 focus:outline-none"
                >
                  {Object.entries(PALLET_TYPES).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  컨테이너 규격
                </label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className="w-full rounded-md border border-stone-200 bg-white px-2 py-1.5 text-xs text-gray-700 focus:border-stone-400 focus:outline-none"
                >
                  {Object.entries(CONTAINER_TYPES)
                    .filter(([, val]) =>
                      activeCategory === '실온' ? val.type === 'dry' : val.type === 'reefer'
                    )
                    .map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* 제품 목록 — 남은 공간 전부 */}
            <div className="flex-1 overflow-y-auto">
              {displayedProducts.map((p) => {
                const qty = selectedProducts[p.id] || 0
                return (
                  <div key={p.id} className="flex items-center gap-2 border-b border-stone-100 px-3 py-2">
                    <span className="w-5 h-5 flex-shrink-0 rounded-sm" style={{ backgroundColor: p.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-[#1A1A1A]">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.w}×{p.d}×{p.h} mm</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(p.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-stone-200 bg-white text-sm text-gray-500 hover:border-stone-400"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-xs font-bold" style={{ color: qty > 0 ? '#C8202A' : '#CCC' }}>{qty}</span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(p.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-stone-200 bg-white text-sm text-gray-500 hover:border-stone-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 버튼 영역 — 하단 고정 */}
            <div className="flex-shrink-0 space-y-1.5 border-t border-stone-100 p-3">
              <button
                type="button"
                onClick={runSimulation}
                disabled={isAnimating || totalBoxes === 0}
                className="w-full rounded-lg py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors"
                style={{
                  background: totalBoxes > 0 && !isAnimating ? '#C8202A' : '#D1C9C2',
                  cursor: totalBoxes > 0 && !isAnimating ? 'pointer' : 'not-allowed',
                }}
              >
                {isAnimating ? '적재 중...' : `${totalBoxes}박스 적재하기`}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="w-full rounded-lg border border-stone-200 py-1.5 text-xs text-gray-400 hover:border-stone-300"
              >
                초기화
              </button>
            </div>
          </div>

          {/* 오른쪽 3D 뷰포트 — 탭별 독립 canvas, 현재 탭만 표시 */}
          <div className="relative flex-1">
            {CATEGORIES.map((cat) => (
              <div
                key={cat}
                ref={(el) => { mountRefs.current[cat] = el }}
                className="absolute inset-0 h-full w-full"
                style={{ visibility: activeCategory === cat ? 'visible' : 'hidden', pointerEvents: activeCategory === cat ? 'auto' : 'none' }}
              />
            ))}
            {/* 좌상단: 보관 조건 */}
            <div className="absolute left-2 top-2 text-left">
              {activeCategory === '실온' && (
                <p className="text-[10px] leading-relaxed text-gray-400">
                  Dry Container · 실온 보관<br />온도 제어 불필요
                </p>
              )}
              {activeCategory === '냉장' && (
                <p className="text-[10px] leading-relaxed text-gray-400">
                  Reefer · 0~+10°C<br />벽면 100mm 이격 · 박스 간 50mm 공기 통로<br />공기 순환으로 균일 냉각
                </p>
              )}
              {activeCategory === '냉동' && (
                <p className="text-[10px] leading-relaxed text-gray-600">
                  Reefer · -18°C 이하<br />선적 전 예냉(pre-cooling) 필수<br />밀착 적재 · T-floor 바닥 통풍
                </p>
              )}
            </div>
            {/* 우상단: Stats (박스~적재율) — 길게 */}
            {stats && (
              <div className="absolute right-2 top-2 min-w-[240px] rounded-lg border border-stone-200 bg-white/75 px-2 py-2 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-[9px] text-gray-400">박스</p>
                    <p className="text-xs font-bold text-[#1A1A1A]">{stats.totalBoxes}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">CBM</p>
                    <p className="text-xs font-bold text-[#1A1A1A]">{stats.totalCBM}</p>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <div>
                      <p className="text-[9px] text-gray-400">팔레트</p>
                      <p className="text-xs font-bold text-[#C8202A]">{stats.palletsNeeded}</p>
                    </div>
                    <p className="text-[8px] text-gray-400 whitespace-nowrap">{CONTAINER_TYPES[containerType].label}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">컨테이너</p>
                    <p className="text-xs font-bold text-[#C8202A]">{stats.containersNeeded}</p>
                  </div>
                </div>
                <div className="mt-1.5">
                  <div className="mb-0.5 flex justify-between text-[9px] text-gray-400">
                    <span>적재율</span>
                    <span>{Math.min(100, Math.round((stats.totalCBM / CONTAINER_TYPES[containerType].cbm) * 100))}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-stone-200">
                    <div
                      className="h-full rounded-full bg-[#C8202A] transition-all duration-700"
                      style={{ width: `${Math.min(100, (stats.totalCBM / CONTAINER_TYPES[containerType].cbm) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* 카메라 컨트롤 버튼 */}
            <div className="absolute bottom-2 right-2 flex flex-col items-center gap-0.5">
              <div className="mb-0.5 flex gap-0.5">
                <button
                  type="button"
                  onClick={zoomIn}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-xs font-bold text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={zoomOut}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-xs font-bold text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  −
                </button>
              </div>
              <button
                type="button"
                onClick={rotateUp}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-xs text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
              >
                ▲
              </button>
              <div className="flex gap-0.5">
                <button
                  type="button"
                  onClick={rotateLeft}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-xs text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={resetCamera}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-[8px] text-gray-400 shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  ↺
                </button>
                <button
                  type="button"
                  onClick={rotateRight}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-xs text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  ▶
                </button>
              </div>
              <button
                type="button"
                onClick={rotateDown}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white/80 text-xs text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
              >
                ▼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
