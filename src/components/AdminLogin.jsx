import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/sonner";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = (e) => {
        e.preventDefault();
        // TODO: Integrate Firebase Auth with admin check
        toast.success("Admin logged in (demo)");
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-card rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Admin Email"
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
                <Button type="submit" variant="cta" className="w-full">Login as Admin</Button>
            </form>
        </div>
    );
};

export default AdminLogin;
