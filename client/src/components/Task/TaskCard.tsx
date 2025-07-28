import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TaskCard = ({ task }: { task: any }) => {
    return (
        <div className="bg-card p-4 rounded-xl shadow flex justify-between items-center">
            <div>
                <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                </h3>
                <Badge variant="outline" className="text-xs mt-1 capitalize">{task.priority}</Badge>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                    {task.completed ? "Undo" : "Done"}
                </Button>
                <Button variant="destructive" size="sm">Delete</Button>
            </div>
        </div>
    );
};

export default TaskCard;
