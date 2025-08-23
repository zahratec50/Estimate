"use client";
import React from "react";


export default function PresenceDot({ online }: { online: boolean }) {
return <span className={`inline-block w-1.5 h-1.5 rounded-full ${online ? "bg-green-500" : "bg-gray-300"}`} />;
}