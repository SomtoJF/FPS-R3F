"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<div className="w-full h-[100vh] bg-black flex flex-col gap-10 justify-start items-center pt-40">
			<h1 className="text-white text-6xl font-bold">Shotdown</h1>
			<Button
				asChild
				className="text-white bg-black border-white border-2 rounded-none"
			>
				<Link href={"/singleplayer"}>Singleplayer</Link>
			</Button>
		</div>
	);
}
