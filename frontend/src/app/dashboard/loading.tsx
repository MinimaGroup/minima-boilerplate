export default function DashboardLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-8 w-32 bg-muted animate-pulse rounded mt-2" />
            <div className="h-3 w-28 bg-muted animate-pulse rounded mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
