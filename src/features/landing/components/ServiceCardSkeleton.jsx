import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // from shadcn/ui

const ServiceCardSkeleton = () => {
    return (
        <div className="relative h-full">
            <Card className="flex flex-col h-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden p-6">
                <CardHeader className="text-center flex flex-col items-center pt-8">
                    <Skeleton className="w-16 h-16 rounded-full mb-4" />
                    <CardTitle>
                        <Skeleton className="h-6 w-32" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow text-center p-6">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-6" />

                    <div className="space-y-3 mb-8 text-left">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center">
                                <Skeleton className="w-5 h-5 mr-3 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ))}
                    </div>

                    <Skeleton className="h-10 w-full rounded-lg mt-auto" />
                </CardContent>
            </Card>
        </div>
    );
};

export default ServiceCardSkeleton;
