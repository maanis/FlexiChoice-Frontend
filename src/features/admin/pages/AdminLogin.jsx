import React, { useEffect, useState } from 'react';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebaseConfig';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Framer Motion implementation
const motion = {
    div: ({ children, initial, animate, transition, ...props }) => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => setIsVisible(true), transition?.delay * 1000 || 0);
            return () => clearTimeout(timer);
        }, [transition?.delay]);

        return (
            <div
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
                    transition: `all ${transition?.duration || 0.6}s ease-out`
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
};

// ShadCN-style components
const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>
        {children}
    </p>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

const Label = ({ children, htmlFor, className = "" }) => (
    <label
        htmlFor={htmlFor}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
        {children}
    </label>
);

const Input = ({ className = "", error, ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive' : 'border-input'
            } ${className}`}
        {...props}
    />
);

const Button = ({ children, variant = "default", size = "default", className = "", disabled, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground"
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

const Checkbox = ({ className = "", ...props }) => (
    <input
        type="checkbox"
        className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

// Motion wrapper using Framer Motion pattern
const MotionDiv = ({ children, className = "", delay = 0, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay }}
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const res = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log(res)
            console.log('Login successful:', formData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.message);
            if (error.message.includes("invalid-credential")) {
                toast.error('Invalid email or password');
            }
            toast.error("Something went wrong!")
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                {/* Logo */}
                <MotionDiv delay={0} className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                        <Shield className="size-5" />
                    </div>
                    <span className="text-lg font-semibold">Admin Portal</span>
                </MotionDiv>

                {/* Login Card */}
                <MotionDiv delay={0.2}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Welcome back</CardTitle>
                            <CardDescription>
                                Sign in to your admin account to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6" onKeyPress={handleKeyPress}>
                                {/* Email Field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="admin@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
                                    />
                                    {errors.email && (
                                        <div className="flex items-center gap-1 text-destructive text-xs">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <button
                                            type="button"
                                            className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            error={errors.password}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="flex items-center gap-1 text-destructive text-xs">
                                            <AlertCircle className="h-3 w-3" />
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={formData.remember}
                                        onChange={handleInputChange}
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        Remember me for 30 days
                                    </Label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    onClick={handleSubmit}
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>

                                {/* Support Link */}
                                <div className="text-center text-sm">
                                    Need help?{" "}
                                    <button className="underline underline-offset-4 hover:text-primary">
                                        Contact IT Support
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </MotionDiv>

                {/* Footer */}
                <MotionDiv delay={0.4} className="text-muted-foreground text-center text-xs text-balance">
                    Protected by enterprise-grade security. By signing in, you agree to our{" "}
                    <button className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="underline underline-offset-4 hover:text-primary">
                        Privacy Policy
                    </button>
                    .
                </MotionDiv>
            </div>
        </div>
    );
};

export default AdminLogin;