import Rolodex from "@/components/rolodex";
import { getProjects } from "@/sanity/sanity-utils"

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <Rolodex projects={projects}></Rolodex>
    </div>
  )

}