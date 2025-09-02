import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";

export function DeleteDialog({ open, onOpenChange, serviceTitle, onConfirm }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <AlertDialogContent>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            // remove the conflicting fixed, top, left, and translate classes
                            className="bg-background border-0 p-1 shadow-card focus:outline-none"
                        >
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl">
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm">
                                    This action cannot be undone. This will permanently delete{" "}
                                    <span className="font-semibold text-foreground">
                                        "{serviceTitle}"
                                    </span>{" "}
                                    from your services.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="gap-2">
                                <AlertDialogCancel className="rounded-xl">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={onConfirm}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                                >
                                    Delete Service
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </motion.div>
                    </AlertDialogContent>
                )}
            </AnimatePresence>
        </AlertDialog>
    );
}