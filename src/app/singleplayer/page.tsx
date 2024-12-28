"use client";

import * as THREE from "three";
import { Stats, PointerLockControls } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import Image from "next/image";
import Camera from "@/components/3d/camera";
import { TextureLoader } from "three";
import { RepeatWrapping } from "three";
import normalGround from "@/assets/textures/floor/monastery_stone_floor_nor_gl_1k.jpg";
import groundMap from "@/assets/textures/floor/monastery_stone_floor_diff_1k.jpg";

function Box(props: ThreeElements["mesh"]) {
	const meshRef = useRef<THREE.Mesh>(null!);
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	useFrame((state, delta) => (meshRef.current.rotation.x += delta));
	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "#2f74c0"} />
		</mesh>
	);
}

function World(props: ThreeElements["mesh"]) {
	const meshRef = useRef<THREE.Mesh>(null!);

	return (
		<mesh {...props} ref={meshRef} position={[0, 100, 0]}>
			<boxGeometry args={[800, 200, 800]} />
			<meshStandardMaterial color="blue" wireframe />
		</mesh>
	);
}

function Ground(props: ThreeElements["mesh"]) {
	const [normalMap, colorMap, groundBump] = useLoader(TextureLoader, [
		normalGround.src,
		groundMap.src,
		"https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/monastery_stone_floor/monastery_stone_floor_rough_1k.png",
	]);

	[normalMap, colorMap, groundBump].forEach((texture) => {
		texture.wrapS = texture.wrapT = RepeatWrapping;
		texture.repeat.set(10, 10);
	});

	return (
		<mesh
			{...props}
			position={[0, 0, 0]}
			receiveShadow
			rotation={[-Math.PI / 2, 0, 0]}
		>
			<planeGeometry args={[800, 800]} />
			<meshStandardMaterial
				color={new THREE.Color("white")}
				side={THREE.DoubleSide}
				map={colorMap}
				normalMap={normalMap}
				bumpMap={groundBump}
				roughness={0.8}
				metalness={0.2}
				normalScale={new THREE.Vector2(0.5, 0.5)}
			/>
		</mesh>
	);
}

export default function Page() {
	return (
		<div className="h-screen w-screen fixed top-0 left-0">
			<Image
				src="https://img.icons8.com/color-glass/48/define-location.png"
				alt=""
				className="fixed top-1/2 left-1/2 z-20 w-[15px] h-auto ml-[-7.5px] mt-[-7.5px]"
				width={48}
				height={48}
			/>
			<Canvas className="w-full h-full">
				<ambientLight color={0xffffff} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					decay={0}
				/>
				<Camera />
				<directionalLight
					position={[1000, 1000, -500]}
					color={0xffffff}
					castShadow
				/>
				<Stats />
				<PointerLockControls />
				<World />
				<Ground />
				{/* <Box position={[-1.2, 0, 0]} />
				<Box position={[1.2, 0, 0]} /> */}
			</Canvas>
		</div>
	);
}
