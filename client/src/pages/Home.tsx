import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import TaskList from "@/components/Task/TaskList";
import CreateTaskModal from "@/components/Task/CreateTaskModal";

const Home = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Top Bar: Search + Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <Input
                    type="text"
                    placeholder="Search tasks..."
                    className="md:w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end mb-6">
                <Button onClick={() => setShowModal(true)}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Task
                </Button>
            </div>

            {/* Task List */}
            <TaskList
                filters={{ search, status: statusFilter, priority: priorityFilter, refresh, setRefresh }}
            />

            {/* Modal */}
            {showModal && (
                <CreateTaskModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        setRefresh(true);
                    }}
                />
            )}
        </div>
    );
};

export default Home;
