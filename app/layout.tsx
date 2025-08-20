import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Roboto } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Método SMC - Pedro Coden | Domine o Mercado com Smart Money Concepts",
  description:
    "Aprenda Smart Money Concepts com Pedro Coden. Curso completo de trading com método exclusivo e alta taxa de acerto.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${roboto.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
