import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-4xl font-bold">404</div>
        <div className="text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </div>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
