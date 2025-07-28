import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import api from "@/lib/api";
import toast from "react-hot-toast";

const Register = () => {
    const { login } = useAuth();
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.post("/user/register", {
                username,
                email,
                password,
            });

            if (res.status === 201) {
                const { token, user } = res.data;
                login({ newToken: token, userData: user });
                toast.success("Account created successfully!");
                navigate("/");
            }
        } catch (err: any) {
            console.log(err);

            toast.error(err?.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md rounded-lg p-6 shadow-xl"
                style={{
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)",
                }}
            >
                <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>

                <div className="mb-4">
                    <Label htmlFor="username" className="mb-1 block">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        required
                        placeholder="JohnDoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="email" className="mb-1 block">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="password" className="mb-1 block">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Register</Button>
                </div>

                <p className="text-sm text-center mt-4 text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
