import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";
import { useLoading } from "@/context/LoadingContext";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface CreateTaskFormProps {
    onSuccess?: () => void;
}
const CreateTaskForm = ({ onSuccess }: CreateTaskFormProps) => {
    const { setIsLoading } = useLoading();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("todo");
    const [open, setOpen] = useState(false)
    const [dueDate, setDueDate] = useState<Date | undefined>()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return toast.error("Title is required");

        setIsLoading(true);
        try {
            const res = await api.post("/task", {
                title,
                description,
                priority,
                status,
                dueDate: dueDate || null,
            });

            if (res.status === 201) {
                toast.success("Task created");
                // Clear form
                setTitle("");
                setDescription("");
                setPriority("medium");
                setStatus("todo");
                setDueDate(undefined);
                onSuccess?.();
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to create task");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card p-4 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold">Create New Task</h2>

            <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
            />

            <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium mb-1 block">Priority</label>
                    <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium mb-1 block">Status</label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="dueDate" className="text-sm font-medium">
                        Due Date
                    </Label>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="dueDate"
                                className="justify-between font-normal w-fit"
                            >
                                {dueDate ? dueDate.toLocaleDateString() : "Select due date"}
                                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={(date) => {
                                    setDueDate(date)
                                    setOpen(false)
                                }}
                                captionLayout="dropdown"
                                fromYear={2020}
                                toYear={2035}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit">Add Task</Button>
            </div>
        </form>
    );
};

export default CreateTaskForm;
