import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { format } from "date-fns";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done" | "cancelled";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate?: string;
}

interface TaskListProps {
    filters: {
        search?: string;
        status?: string;
        priority?: string;
        refresh: boolean;
        setRefresh: React.Dispatch<React.SetStateAction<boolean>>
    };
}

const priorityColor: Record<Task["priority"], string> = {
    low: "bg-green-200 text-green-700",
    medium: "bg-yellow-200 text-yellow-800",
    high: "bg-orange-300 text-orange-800",
    urgent: "bg-red-300 text-red-800",
};

const statusColor: Record<Task["status"], string> = {
    todo: "border-gray-400",
    "in-progress": "border-blue-400",
    done: "border-green-500",
    cancelled: "border-red-400",
};

const TaskList = ({ filters }: TaskListProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/task");
            setTasks(res.data);
        } catch (err) {
            toast.error("Failed to load tasks");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/task/${id}`);
            toast.success("Task deleted");
            setTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (err) {
            toast.error("Error deleting task");
        }
    };

    useEffect(() => {
        fetchTasks();
        filters.setRefresh(false);
    }, [filters.refresh]);

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            filters.status === "all" || !filters.status || task.status === filters.status;
        const matchesPriority =
            filters.priority === "all" || !filters.priority || task.priority === filters.priority;
        const matchesSearch =
            !filters.search ||
            task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            task.description?.toLowerCase().includes(filters.search.toLowerCase());

        return matchesStatus && matchesPriority && matchesSearch;
    });

    if (!filteredTasks.length) {
        return (
            <p className="text-center text-muted-foreground mt-6">
                No tasks match your filters.
            </p>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
                <Card
                    key={task._id}
                    className={`relative ${statusColor[task.status]}`}
                >
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-5 w-5">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleDelete(task._id)}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {task.description && (
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                        )}

                        <div className="flex flex-wrap gap-2">
                            <Badge className={priorityColor[task.priority]}>
                                Priority: {task.priority}
                            </Badge>

                            <Badge variant="outline" className="capitalize">
                                Status: {task.status}
                            </Badge>

                            {task.dueDate && (
                                <Badge variant="outline" className="ml-auto">
                                    Due: {format(new Date(task.dueDate), "PPP")}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TaskList;
