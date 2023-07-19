"use client"
import { useRouter } from "next/navigation";
export default function App() {
  const user = null;
  const router = useRouter();
  if (!user) router.push("/signin")

  return null
}
