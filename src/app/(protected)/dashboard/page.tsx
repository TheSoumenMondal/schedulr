import { CheckAuth } from "@/hooks/check-auth";

export default function Home() {
  const session = CheckAuth()
  return (
    <div>Dashboard Page</div>
  );
}
