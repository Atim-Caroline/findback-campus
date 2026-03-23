import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Github, School, Building2, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ugandaUniversities, universityDepartments, universityLocations } from "@/lib/university-data";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Successfully authenticated!");
      navigate("/");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Connecting to ${provider}...`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-lg shadow-lg border-none my-8">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center p-2 border border-slate-100 shadow-sm overflow-hidden">
              <img 
                src="/logo.png" 
                alt="CampusFind Logo" 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </div>
          </div>
          <div className="text-2xl font-extrabold tracking-tighter">
            <span className="text-primary">Campus</span>
            <span className="text-search-btn">Find</span>
          </div>
          <CardDescription>
            Join the community and find what you lost.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="p-0 h-auto text-xs" type="button">
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" className="pl-10" required />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Google')}>
                  <img src="/google-icon.png" alt="Google" className="mr-2 h-4 w-4 object-contain" />
                  Google
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Apple')}>
                  <img src="/apple-icon.png" alt="Apple" className="mr-2 h-4 w-4 object-contain" />
                  Apple
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="signup-email" type="email" placeholder="name@example.com" className="pl-10" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Select required>
                    <SelectTrigger className="w-full pl-10 relative">
                      <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent>
                      {ugandaUniversities.map((uni) => (
                        <SelectItem key={uni} value={uni.toLowerCase().replace(/\s+/g, '-')}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department/Faculty</Label>
                    <Select required>
                      <SelectTrigger className="w-full pl-10 relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {universityDepartments.map((dept) => (
                          <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Primary Campus Location</Label>
                    <Select required>
                      <SelectTrigger className="w-full pl-10 relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {universityLocations.map((cat) => (
                          <SelectGroup key={cat.category}>
                            <SelectLabel>{cat.category}</SelectLabel>
                            {cat.locations.map((loc) => (
                              <SelectItem key={loc} value={loc.toLowerCase().replace(/\s+/g, '-')}>
                                {loc}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type="password" className="pl-10" required />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Google')}>
                  <img src="/google-icon.png" alt="Google" className="mr-2 h-4 w-4 object-contain" />
                  Google
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Apple')}>
                  <img src="/apple-icon.png" alt="Apple" className="mr-2 h-4 w-4 object-contain" />
                  Apple
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-xs text-muted-foreground">
          <p>
            By clicking continue, you agree to our{" "}
            <Button variant="link" className="p-0 h-auto text-xs underline">
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="p-0 h-auto text-xs underline">
              Privacy Policy
            </Button>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
