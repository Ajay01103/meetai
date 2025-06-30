"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const HomeView = () => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Ajay" }))

  return (
    <div>
      Home Page (protected)
      <h1>Logged in as {data?.greeting}</h1>
    </div>
  )
}
