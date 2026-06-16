import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/header/Header";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
}

interface Order {
  id: string;
  status: string;
  total_cents: number;
  currency: string;
  items: Array<{ name?: string; quantity?: number }>;
  created_at: string;
}

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [profileRes, ordersRes] = await Promise.all([
        supabase.from("profiles").select("full_name, phone, address_line1, address_line2, city, postal_code, country").eq("id", user.id).maybeSingle(),
        supabase.from("orders").select("id, status, total_cents, currency, items, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (profileRes.data) setProfile(profileRes.data as Profile);
      else setProfile({ full_name: "", phone: "", address_line1: "", address_line2: "", city: "", postal_code: "", country: "" });
      if (ordersRes.data) setOrders(ordersRes.data as Order[]);
      setLoadingData(false);
    })();
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/auth" state={{ from: "/account" }} replace />;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...profile }, { onConflict: "id" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  };

  const update = (field: keyof Profile, value: string) =>
    setProfile((p) => (p ? { ...p, [field]: value } : p));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-wide">My Account</h1>
            <p className="text-sm text-muted-foreground font-light mt-1">{user.email}</p>
          </div>
          <Button variant="outline" onClick={signOut} className="font-light">Sign out</Button>
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-light mb-6 pb-2 border-b border-border">Profile</h2>
          {loadingData || !profile ? (
            <p className="text-sm text-muted-foreground font-light">Loading...</p>
          ) : (
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="md:col-span-2">
                <Label className="font-light">Full name</Label>
                <Input value={profile.full_name ?? ""} onChange={(e) => update("full_name", e.target.value)} maxLength={100} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="font-light">Phone</Label>
                <Input value={profile.phone ?? ""} onChange={(e) => update("phone", e.target.value)} maxLength={30} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="font-light">Address</Label>
                <Input value={profile.address_line1 ?? ""} onChange={(e) => update("address_line1", e.target.value)} maxLength={200} className="mt-1" placeholder="Street address" />
              </div>
              <div className="md:col-span-2">
                <Input value={profile.address_line2 ?? ""} onChange={(e) => update("address_line2", e.target.value)} maxLength={200} placeholder="Apt, suite, etc. (optional)" />
              </div>
              <div>
                <Label className="font-light">City</Label>
                <Input value={profile.city ?? ""} onChange={(e) => update("city", e.target.value)} maxLength={100} className="mt-1" />
              </div>
              <div>
                <Label className="font-light">Postal code</Label>
                <Input value={profile.postal_code ?? ""} onChange={(e) => update("postal_code", e.target.value)} maxLength={20} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="font-light">Country</Label>
                <Input value={profile.country ?? ""} onChange={(e) => update("country", e.target.value)} maxLength={100} className="mt-1" />
              </div>
              <div className="md:col-span-2 pt-2">
                <Button type="submit" disabled={saving} className="font-light">
                  {saving ? "Saving..." : "Save profile"}
                </Button>
              </div>
            </form>
          )}
        </section>

        <section>
          <h2 className="text-xl font-light mb-6 pb-2 border-b border-border">Orders</h2>
          {loadingData ? (
            <p className="text-sm text-muted-foreground font-light">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground font-light mb-4">You haven't placed any orders yet.</p>
              <Link to="/" className="text-sm underline underline-offset-4 font-light">Start shopping</Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {orders.map((o) => (
                <li key={o.id} className="py-5 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-light">Order #{o.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">
                      {new Date(o.created_at).toLocaleDateString()} · {o.items.length} item{o.items.length === 1 ? "" : "s"} · {o.status}
                    </p>
                  </div>
                  <p className="text-sm font-light">
                    {o.currency === "EUR" ? "€" : o.currency + " "}
                    {(o.total_cents / 100).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default Account;
