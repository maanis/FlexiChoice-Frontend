// Skeleton version of ServiceCard
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';


export function ServiceCardSkeleton({ index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group h-full"
        >
            <Card className="h-full bg-gradient-card shadow-card border-0 rounded-2xl overflow-hidden grid grid-rows-[1fr_auto] animate-pulse">
                <div className="p-6">
                    <CardHeader className="p-0 pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 w-10 h-10" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700" />
                                <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 space-y-3">
                        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    </CardContent>
                    <CardContent className="p-0 space-y-3 mt-3">
                        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                    </CardContent>
                </div>

                <div className="p-6 pt-0">
                    <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </Card>
        </motion.div>
    );
}
