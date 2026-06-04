import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "تسجيل الدخول — لوحة التحكم" }] }),
  component: AuthPage,
});

function usernameToEmail(u: string) {
  const t = u.trim().toLowerCase();
  if (t.includes("@")) return t;
  return `${t}@allen.local`;
}

function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("allen");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin", replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    });
    setLoading(false);
    if (error) toast.error("بيانات الدخول غير صحيحة");
    else toast.success("أهلاً بك");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center text-xs latin text-muted-foreground mb-8 hover:text-brass">
          ← العودة للموقع
        </Link>
        <div className="border border-border bg-card/40 backdrop-blur p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-brass latin text-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-brass" /> A · J · ADMIN
            </div>
            <h1 className="font-display text-3xl md:text-4xl">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground mt-2">أدخل بيانات المدير للمتابعة</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="u" className="text-xs latin text-muted-foreground">اسم المستخدم</Label>
              <div className="relative">
                <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="u" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="pr-10 latin" autoComplete="username" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="p" className="text-xs latin text-muted-foreground">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 latin" autoComplete="current-password" required />
              </div>
            </div>
            <Button type="submit" disabled={loading}
              className="w-full bg-brass text-brass-foreground hover:bg-brass/90 h-11 font-display">
              {loading ? "جارٍ الدخول..." : "دخـول"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
