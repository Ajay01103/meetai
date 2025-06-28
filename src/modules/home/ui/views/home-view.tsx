"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export const HomeView = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  if (!session) {
    return <h1>Loading.....</h1>
  }

  return (
    <div>
      Home Page (protected)
      <h1>Logged in as {session?.user.name}</h1>
      {!!session && (
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: { onSuccess: () => router.push("/sign-in") },
            })
          }
        >
          logout
        </Button>
      )}
    </div>
  )
}
