"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import type { Project } from "@/types/Project";
import Slide from './slide';

interface RolodexProps {
  projects: Project[];
}

export default function Rolodex({projects}: RolodexProps){
  const [virtualScroll, setVirtualScroll] = useState(10);
  const [hoveredProjectName, setHoveredProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProject, setshowProject] = useState(false);

  // Scroll position
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setVirtualScroll((prev) => prev + event.deltaY);
    };

    let startY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = startY - currentY;
      setVirtualScroll((prev) => prev + deltaY);
      startY = currentY;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const displayProject = (project: Project) => {
    setSelectedProject(project);
    setshowProject(true);
  }

  const handleCloseSlide = () => {
    setshowProject(false);
  }

  const radius = window.innerWidth/8;
  const angleStep = 360 / projects.length;
  
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2 className="absolute text-4xl md:text-7xl z-50 text-center lowercase px-10 drop-shadow-lg pointer-events-none">
          {hoveredProjectName}
        </h2>
        <div
          className="relative w-1/4 rolodex"
          style={{
            height: radius*2,
            perspective: "20000px",
            transformStyle: 'preserve-3d',
            transformOrigin: "center",
            transformBox: "fill-box"
          }}
        >
          {projects.map((project: Project, index: number) => {
            const angle = angleStep * index + ((virtualScroll/6) / radius) * 360;
            const z = radius * Math.cos((angle * Math.PI) / 180);
            const x = -radius * Math.sin((angle * Math.PI) / 180);
            const zIndex = Math.round((-x / radius) * 100);
            return(
              <div
                key={project._id}
                className="w-full h-full absolute top-0 left-0 cursor-pointer rounded-s-md overflow-hidden"
                style={{
                  transform: `
                    rotateY(${angle}deg)
                    translateX(${x-radius}px)
                    translateZ(${z}px)
                  `,
                  zIndex: zIndex
                }}
                onMouseOver={()=>setHoveredProjectName(project.name)}
                onMouseLeave={()=>setHoveredProjectName("")}
                onClick={()=>displayProject(project)}
              >
                {project.image && (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-l from-black opacity-80"></div>
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={750}
                      height={750}
                      className="object-cover h-full"
                    />
                  </div>
                )}
              </div>
            )}
          )}
        </div>
        {showProject && selectedProject && <Slide project={selectedProject} onClose={handleCloseSlide}/>}
      </div>
    )
}