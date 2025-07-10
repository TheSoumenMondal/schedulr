import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCalendar } from "@tabler/icons-react";
import Link from "next/link";

export default function OnboardingRouterTwo() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>One last step</CardTitle>
          <CardDescription>
            Please connect your calender to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={"/api/auth"}>
            <Button className="w-full">
              <IconCalendar />
              Connect Calender
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
