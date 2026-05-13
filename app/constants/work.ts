import * as THREE from "three"
import { WorkTimelinePoint } from "../types"

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: `2017-2025`,
    title: `Camberwell Grammar`,
    subtitle: `Scholar`,
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -4),
    year: `2022`,
    title: `Australian Army Cadets`,
    subtitle: `Cadet Corporal`,
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, 0, -8),
    year: `2026 -`,
    title: `The University of Melbourne`,
    subtitle: `Bachelor of Science`,
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, 0, -14),
    year: `2026 -`,
    title: `Omnira Systems`,
    subtitle: `Hardware Engineer`,
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -18),
    year: new Date().toLocaleDateString('default', { year: 'numeric'}),
    title: `?`,
    subtitle: `???`,
    position: 'right',
  }
]
