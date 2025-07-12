import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteEventAction } from "@/lib/actions";
import Link from "next/link";

export default async function DeleteEventType(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await props.params;

  return (
    <div className="w-full h-[calc(100vh_-_200px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 shadow-xl border border-border/40 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Delete Event</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="min-w-[80px]">
              Cancel
            </Button>
          </Link>
          <form action={DeleteEventAction}>
            <input type="hidden" name="id" value={id} />
            <Button variant="destructive" size="sm" className="min-w-[80px]">
              Delete
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}