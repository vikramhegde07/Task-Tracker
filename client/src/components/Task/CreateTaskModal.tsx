"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateTaskForm from "./CreateTaskForm";

interface CreateTaskModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void; // optional callback after task creation
}

const CreateTaskModal = ({ open, onClose, onSuccess }: CreateTaskModalProps) => {
    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="max-w-md p-0">
                <DialogHeader className="px-6 pt-6 pb-0">
                    <div className="flex justify-between items-center">
                        <DialogTitle>Create Task</DialogTitle>
                    </div>
                </DialogHeader>

                <div className="px-6 pb-6 pt-4">
                    <CreateTaskForm
                        onSuccess={() => {
                            onSuccess?.();
                            onClose();
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTaskModal;
