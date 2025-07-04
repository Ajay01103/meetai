"use client"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Bot, Star, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardUserButton } from "./dashboard-user-button"

const firstSection = [
  {
    icon: Video,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: Bot,
    label: "Agents",
    href: "/agents",
  },
]

const secondSection = [
  {
    icon: Star,
    label: "Upgrade",
    href: "/upgrade",
  },
]

export const DashboardSidebar = () => {
  const pathname = usePathname()
  return (
    <Sidebar>
      <SidebarHeader className="text-shadow-accent-foreground">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 pt-2"
        >
          <Image
            src="/logo.svg"
            height={36}
            width={36}
            alt="logo"
          />
          <p className="text-2xl font-semibold">Meet AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuButton
                  asChild
                  key={item.href}
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                  )}
                  isActive={pathname === item.href}
                >
                  <Link
                    href={item.href}
                    className="w-full"
                  >
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuButton
                  asChild
                  key={item.href}
                  className={cn(
                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                    pathname === item.href && "bg-linear-t0-r/oklch border-[#5D6B68]/10"
                  )}
                  isActive={pathname === item.href}
                >
                  <Link
                    href={item.href}
                    className="w-full"
                  >
                    <item.icon className="size-5" />
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
