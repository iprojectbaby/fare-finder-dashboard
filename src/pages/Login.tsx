
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Nigeria flag colors
const nigeriaGreen = "bg-[#008751]";
const nigeriaGreenHover = "hover:bg-[#006b40]";
const nigeriaGreenText = "text-[#008751]";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: LoginFormValues) => {
    // For now, we'll just show a toast and redirect to the home page
    // In the future, this would be connected to backend authentication
    console.log("Login submitted:", data);
    toast({
      title: "Login successful",
      description: "Welcome back to Go Fare",
    });
    
    // Redirect to home page after "login"
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Nigeria flag colors as accent bars */}
        <div className="flex mb-6">
          <div className="w-1/3 h-2 bg-[#008751]"></div>
          <div className="w-1/3 h-2 bg-white"></div>
          <div className="w-1/3 h-2 bg-[#008751]"></div>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-3xl font-bold text-center text-primary">Go Fare</h1>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access transport fare updates across Enugu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="name@example.com"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10 text-muted-foreground"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className={`w-full ${nigeriaGreen} ${nigeriaGreenHover}`}
                >
                  Sign In
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm">
              <a href="#" className={`${nigeriaGreenText} hover:underline`}>
                Forgot your password?
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className={`${nigeriaGreenText} font-semibold hover:underline`}>
                Sign up
              </Link>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              By signing in, you agree to our Terms and Privacy Policy
            </div>
            
            <div className="text-center text-xs">
              <span className="text-muted-foreground">Fare prices in</span>{" "}
              <span className="font-medium">Nigerian Naira (₦)</span>
            </div>
          </CardFooter>
        </Card>
        
        {/* Nigeria flag colors as accent bars */}
        <div className="flex mt-6">
          <div className="w-1/3 h-2 bg-[#008751]"></div>
          <div className="w-1/3 h-2 bg-white"></div>
          <div className="w-1/3 h-2 bg-[#008751]"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
