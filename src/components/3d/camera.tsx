"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import useKeyboard from "@/hooks/useKeyboard";

export default function Camera() {
	const { camera } = useThree();
	const keyMap = useKeyboard();
	const moveSpeed = 400;

	const direction = useRef(new THREE.Vector3());

	useFrame((_, delta) => {
		direction.current.set(0, 0, 0);

		// Add movement based on keys pressed
		if (keyMap["KeyW"]) direction.current.z = -1;
		if (keyMap["KeyS"]) direction.current.z = 1;
		if (keyMap["KeyA"]) direction.current.x = -1;
		if (keyMap["KeyD"]) direction.current.x = 1;

		// Normalize the direction vector and apply movement speed
		direction.current.normalize();
		direction.current.multiplyScalar(moveSpeed * delta);

		// Get camera's forward and right vectors
		const forward = new THREE.Vector3(0, 0, -1);
		const right = new THREE.Vector3(1, 0, 0);

		// Apply camera rotation to these vectors
		forward.applyQuaternion(camera.quaternion);
		right.applyQuaternion(camera.quaternion);

		// Calculate final movement
		const movement = new THREE.Vector3();
		movement.addScaledVector(forward, -direction.current.z);
		movement.addScaledVector(right, direction.current.x);

		// Update camera position
		camera.position.add(movement);
	});

	return null;
}
