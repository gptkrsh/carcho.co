import Navbar from "@/components/Navbar"
import { SessionProvider } from "next-auth/react"

import "@/styles/tailwind.css"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
