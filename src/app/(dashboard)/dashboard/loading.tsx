import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="mt-2 h-4 w-[300px]" />

      {/* Stats Grid Skeleton */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[100px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-1" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State Skeleton */}
      <div className="mt-12 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center">
        <Skeleton className="h-6 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[300px] mb-6" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  );
}
