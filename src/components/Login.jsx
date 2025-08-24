import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Integrate Firebase Auth
        toast.success("Logged in successfully (demo)");
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-card rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">Login to Flexi Choice</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input border px-4 py-2 rounded focus:outline-primary"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input border px-4 py-2 rounded focus:outline-primary"
                    required
                />
                <Button type="submit" variant="cta" className="w-full">Login</Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground">
                Don&apos;t have an account? <a href="#signup" className="text-primary hover:underline">Sign Up</a>
            </div>
        </div>
    );
};

export default Login;
