import type { Project } from "@/types/Project";
import { transform } from "next/dist/build/swc";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface SlideProps {
    project: Project;
    onClose: () => void;
  }
  

export default function Slide({project, onClose}: SlideProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { onClose(); }
        };
        const handleCLickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("mousedown", handleCLickOutside);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("mousedown", handleCLickOutside);
        };
    }, [onClose]);

    return (
        <div className="z-50 w-screen h-dvh backdrop-blur-md absolute top-0 left-0 flex flex-col items-center justify-center px-12 py-16 lg:p-32">
            <div ref={modalRef} className="max-w-full max-h-full flex flex-col items-start gap-5 lg:gap-7 -translate-y-10 md:-translate-y-12 lg:-translate-y-16">
                <h1 className="text-2xl md:text-5xl lg:text-7xl lowercase">{project.name}</h1>
                <div className="max-w-full max-h-full bg-slate-50/20 backdrop-blur-lg rounded-3xl p-3 text-black shadow-xl">
                    <Image src={project.image} width={1000} height={1000} alt={project.alt} className="max-w-full max-h-full object-cover rounded-xl bg-slate-50/20"></Image>
                </div>
            </div>
        </div>
    )
}