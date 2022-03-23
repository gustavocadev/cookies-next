import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { useEffect, useState } from "react"
import Layout from "../components/layouts/Layout"
import Cookies from "js-cookie"
import { GetServerSideProps } from "next"

type Props = {
  theme: string
}

export default function ThemeChanger({ theme }: Props) {
  const [themeMode, setThemeMode] = useState("light")

  useEffect(() => {
    const themeMode = Cookies.get("themeMode") ?? "light"
    if (themeMode) {
      setThemeMode(themeMode)
    }
  }, [])

  const handleClick = async () => {
    const resp = await fetch("/api/hello")
    const data = await resp.json()
    console.log(data)
  }
  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup
              value={themeMode}
              onChange={(e) => {
                Cookies.set("themeMode", e.target.value)
                setThemeMode(e.target.value)
              }}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>

          <Button onClick={handleClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let { themeMode = "light" } = req.cookies as {
    themeMode: "light" | "dark" | "custom"
  }

  const validThemes = ["light", "dark", "custom"]

  if (!validThemes.includes(themeMode)) {
    themeMode = "dark"
  }

  return {
    props: {
      themeMode,
    },
  }
}
