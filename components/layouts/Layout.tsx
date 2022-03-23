import Head from "next/head"
import React from "react"
import Navbar from "../ui/Navbar"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head></Head>
      <Navbar />
      <main style={{ padding: "20px 50px" }}>{children}</main>
    </>
  )
}

export default Layout
