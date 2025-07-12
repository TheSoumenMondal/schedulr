import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Success = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-sm select-none bg-transparent sm:bg-card border-0 sm:border">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Booking Successful</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center">
            Your booking has been successfully created. You will receive a
            confirmation email shortly.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full">Go Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
