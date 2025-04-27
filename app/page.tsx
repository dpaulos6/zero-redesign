"use client"

import {
  PixelatedBackground,
  PixelatedLeft,
  PixelatedRight
} from "@/components/pixelated-bg"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

const tabs = [
  { label: "Smart Categorization", value: "smart-categorization" },
  { label: "AI Features", value: "ai-features" },
  { label: "Feature Name", value: "feature-3" }
]

export default function Home() {
  const tabRefs = useRef<HTMLButtonElement[]>([])
  const [glowStyle, setGlowStyle] = useState({ left: 0, width: 0 })

  const handleTabChange = useCallback((value: string) => {
    const index = tabs.findIndex((tab) => tab.value === value)
    const tab = tabRefs.current[index]
    if (tab) {
      const rect = tab.getBoundingClientRect()
      const listRect = tab.parentElement?.getBoundingClientRect()
      const offsetLeft = listRect ? rect.left - listRect.left : 0

      const newWidth = rect.width * 0.9
      const newLeft = offsetLeft + (rect.width - newWidth) / 2

      setGlowStyle({ left: newLeft, width: newWidth })
    }
  }, [])

  useEffect(() => {
    handleTabChange(tabs[0].value)
  }, [handleTabChange])

  return (
    <main className="relative flex flex-1 flex-col overflow-x-hidden">
      <PixelatedBackground
        className="-z-10 -translate-x-1/2 absolute top-0 left-1/2 h-auto w-screen min-w-[1920px] object-cover opacity-5"
        style={{ mixBlendMode: "screen" }}
      />
      <header className="fixed z-50 flex w-full items-center justify-center px-4 pt-6">
        <nav className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-xl border border-input/50 bg-popover p-2">
          <div className="flex items-center gap-6">
            <div className="size-10 rounded-md bg-white" />
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/#"
                    className={navigationMenuTriggerStyle()}
                  >
                    Product
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resource</NavigationMenuTrigger>
                  {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="h-10"
            >
              Sign in
            </Button>
            <Button className="h-10 font-medium">Get started</Button>
          </div>
        </nav>
      </header>
      <section className="mt-40 flex flex-col items-center px-4">
        <div className="mb-6 inline-flex items-center rounded-full border border-input/50 bg-[#2a2a2a] px-4 py-1.5 pr-1.5">
          <span>See what's new from O.email</span>
          <Link
            href="/#"
            className="ml-2 flex items-center gap-1 rounded-full bg-gradient-to-b from-neutral-600 to-neutral-700 px-3 py-1 text-foreground text-sm"
          >
            <span>Learn More</span>
            <MoveRight className="!size-4" />
          </Link>
        </div>
        <h1 className="mb-6 text-center text-6xl">
          Open source gmail
          <br />
          alternative
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-400 text-lg">
          Experience email the way you want with O – the first open source
          <br />
          email app that puts your privacy and safety first.
        </p>
        <Button className="bg-white px-6 py-5 text-black hover:bg-gray-200">
          Get Started
        </Button>
      </section>
      <section className="relative mt-10 flex flex-col justify-center">
        <div className="-translate-x-1/2 absolute top-0 left-1/2 h-px w-full bg-border md:container xl:max-w-7xl" />
        <Tabs
          defaultValue="smart-categorization"
          onValueChange={handleTabChange}
          className="flex w-full items-center gap-0"
        >
          <div className="tabs-container relative flex w-full max-w-[40rem] justify-center md:max-w-max">
            <TabsList className="relative h-fit w-full rounded-none bg-transparent pb-0 md:w-auto">
              <div className="-top-4 absolute left-0 h-[calc(100%+16px)] w-px bg-border" />
              <div className="-top-4 absolute right-0 h-[calc(100%+16px)] w-px bg-border" />
              {/* Glow */}
              <CustomTabGlow glowStyle={glowStyle} />

              {/* Tab Triggers */}
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="!bg-transparent !shadow-none relative h-12 w-52 rounded-none"
                  ref={(el) => {
                    if (el) tabRefs.current[index] = el
                  }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="relative flex w-full justify-center border-t">
            <div className="container relative border-x xl:max-w-7xl">
              <PixelatedLeft
                className="-z-10 -translate-x-full absolute top-0 left-0 h-full w-auto opacity-50"
                style={{ mixBlendMode: "screen" }}
              />
              <PixelatedRight
                className="-z-10 absolute top-0 right-0 h-full w-auto translate-x-full opacity-50"
                style={{ mixBlendMode: "screen" }}
              />
              <div className="-top-4 -left-px absolute hidden h-4 w-px bg-border md:block" />
              <div className="-top-4 -right-px absolute hidden h-4 w-px bg-border md:block" />
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                >
                  <Image
                    src="/email-preview.png"
                    alt="Zero Email Preview"
                    width={1920}
                    height={1080}
                    className=""
                  />
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </section>
    </main>
  )
}

const CustomTabGlow = ({
  glowStyle
}: { glowStyle: { left: number; width: number } }) => {
  return (
    <div
      className="absolute w-1/3 transition-all duration-300 ease-in-out"
      style={{
        left: `${glowStyle.left}px`
      }}
    >
      <div
        style={{
          width: `${glowStyle.width}px`
        }}
        className="bottom-0 h-12 translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] blur-md"
      />
      <div
        style={{ width: `${glowStyle.width}px` }}
        className="bottom-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent"
      />
    </div>
  )
}
