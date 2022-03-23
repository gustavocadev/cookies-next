import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlined />
        </IconButton>
        <Link href="/">
          <a>
            <Typography variant="h6" color="white">
              CookieMaster
            </Typography>
          </a>
        </Link>

        <div style={{ flex: 1 }} />

        <Link href="/theme-changer">
          <a>
            <Typography variant="h6" color="white">
              Cambiar tema
            </Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
