import Rolodex from "@/components/rolodex";
import { getProjects } from "@/sanity/sanity-utils"

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <Rolodex projects={projects}></Rolodex>
        <div className="fixed bottom-12 z-40 animate-bounce border border-white rounded-xl px-4 py-0.5 text-sm backdrop-blur-sm">scroll <sup>⌄</sup></div>
    </div>
  )

}