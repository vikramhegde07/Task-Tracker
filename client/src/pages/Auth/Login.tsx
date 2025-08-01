import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
    const { login } = useAuth();
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.post("/user/login", { email, password });

            if (res.status === 200) {
                const { token, user } = res.data;
                login({ newToken: token, userData: user });
                toast.success("Logged in successfully");
                navigate("/");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
            <div className="w-fit mx-auto my-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-4 py-2 text-center text-sm">
                ⚠️ Demo accounts are for evaluation only and will be deleted after 24 hours.
            </div>
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-lg p-6 shadow-xl"
                style={{
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)",
                }}
            >
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

                <div className="mb-4">
                    <Label htmlFor="email" className="mb-1 block">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="password" className="mb-1 block">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">
                        Login
                    </Button>
                </div>

                <p className="text-sm text-center mt-4 text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
