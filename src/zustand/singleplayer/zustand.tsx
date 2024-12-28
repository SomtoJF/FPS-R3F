import { create } from "zustand";
import * as THREE from "three";

interface CameraState {
	camera: THREE.PerspectiveCamera | null;
	setCamera: (camera: THREE.PerspectiveCamera) => void;
}

export const UseCameraStore = create<CameraState>((set) => ({
	camera: null,
	setCamera: (camera) => set({ camera }),
}));
