import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
// app/[route]/loading.tsx
export default function PageLoading() {
  return (
    <main className="container">
      <Card className="mt-6 w-full bg-transparent">
        <CardContent className="gap-6 mt-4 flex flex-col">
            <div className="flex gap-12">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[50px]" />
            </div>
          </CardContent>
      </Card>
      <Card className="mt-3 w-full bg-transparent">
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
        <CardContent className="gap-12 mt-4 flex flex-col">
          <div className="flex gap-48">
            <Skeleton className="h-4 w-[30px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[400px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 w-full bg-transparent">
        <CardContent className="gap-6 mt-4 flex flex-col ">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[300px]" />
             <div className="flex gap-4">
             <Skeleton className="h-3  w-[50px]" />
              <Skeleton className="h-3 w-[50px]" />
             </div>

            </div>
          </CardContent>
      </Card>
    </main>
  );
}
