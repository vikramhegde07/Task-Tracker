import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { SendHorizonal } from "lucide-react";
import axios from "axios";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [sending, setSending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        try {
            const res = await axios.post("https://formsubmit.co/vikramhegde4037@gmail.com", { formData }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });


            if (res.status === 200) {
                toast.success("Feedback sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Failed to send feedback.");
            }
        } catch (err) {
            toast.error("An error occurred while sending.");
        } finally {
            setSending(false);
        }
    };

    return (
        <form
            // action={"https://formsubmit.co/vikramhegde4037@gmail.com"}
            // method="POST"
            onSubmit={handleSubmit}
            className="bg-card p-6 rounded-xl shadow space-y-4 max-w-2xl mx-auto my-15"
        >
            <h2 className="text-xl font-semibold">💬 Feedback</h2>
            {/* <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://task.nodenomad.in/" /> */}
            <Input
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <Input
                placeholder="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <Textarea
                name="message"
                placeholder="Your Feedback"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
            />

            <div className="flex justify-end">
                <Button type="submit" disabled={sending} className="flex items-center gap-2">
                    {sending ? "Sending..." : "Send Feedback"}
                    <SendHorizonal className={`h-4 w-4 ${sending ? "animate-ping" : ""}`} />
                </Button>
            </div>
        </form>
    );
};

export default FeedbackForm;
