import '../globals.css'
import Link from "next/link"

export const metadata = {
  title: 'Rolodex',
  description: 'Inspired by letsavee',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="p-2 bg-black text-white tabular-nums">
        <header className="fixed top-0 left-0 w-screen p-2">
          <h1 className="text-md lowercase w-full flex justify-between"><span>Beauty</span> <span>for</span> <span>everyone</span> <span>savee™</span></h1>
        </header>
        <main className="w-screen h-screen absolute top-0 left-0">{children}</main>
        <footer className="fixed bottom-0 left-0 w-screen p-2">
          <p className="text-md lowercase w-full flex justify-between"><span>Beauty</span> <span>for</span> <span>everyone</span> <span>savee™</span></p>
        </footer>
      </body>
    </html>
  )
}