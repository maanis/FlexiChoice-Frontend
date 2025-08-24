import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        // TODO: Integrate Firebase Auth
        toast.success("Account created successfully (demo)");
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-card rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">Sign Up for Flexi Choice</h2>
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input border px-4 py-2 rounded focus:outline-primary"
                    required
                />
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
                <Button type="submit" variant="cta" className="w-full">Sign Up</Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground">
                Already have an account? <a href="#login" className="text-primary hover:underline">Login</a>
            </div>
        </div>
    );
};

export default SignUp;
