import "../styles/globals.css"
import type { AppContext, AppProps } from "next/app"
import { CssBaseline, Theme, ThemeProvider } from "@mui/material"
import { customTheme, darkTheme, lightTheme } from "../themes"
import { GetServerSideProps } from "next"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

type Props = AppProps & {
  themeMode: string
}

function MyApp({ Component, pageProps, themeMode = "dark" }: Props) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get("themeMode") ?? "light"
    const selectedTheme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme
    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  let { themeMode } = ctx.req
    ? (ctx.req as any).cookies
    : { themeMode: "light" }

  const validThemes = ["light", "dark", "custom"]

  if (!validThemes.includes(themeMode)) {
    themeMode = "dark"
  }

  return {
    themeMode,
  }
}

export default MyApp
