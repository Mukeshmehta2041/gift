import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "./them-provider"

export const metadata = {
  title: "Happy Birthday Kajal Kumari",
  description: "A special birthday surprise for Kajal Kumari",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
