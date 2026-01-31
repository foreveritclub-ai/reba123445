import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, User, Camera, Save, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Profile {
  full_name: string;
  email: string;
  avatar_url: string;
  bio: string;
  phone: string;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    avatar_url: "",
    bio: "",
    phone: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url, bio, phone")
        .eq("id", user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          email: data.email || user!.email || "",
          avatar_url: data.avatar_url || "",
          bio: data.bio || "",
          phone: data.phone || "",
        });
      } else {
        setProfile((prev) => ({
          ...prev,
          email: user!.email || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          phone: profile.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          <Link to="/" className="text-xl font-bold">
            <span className="text-foreground">Egreed</span>
            <span className="text-primary"> Technology</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground mb-8">
            Update your personal information
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Section */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <Label htmlFor="avatar_url">Avatar URL</Label>
                  <Input
                    id="avatar_url"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={profile.avatar_url}
                    onChange={(e) => handleChange("avatar_url", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a URL to your profile picture
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Your full name"
                    value={profile.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="mt-1 bg-secondary/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed here
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+250 788 123 456"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={4}
                    className="mt-1 resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    A short bio about yourself (optional)
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Tour Settings */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Learning Guide</h2>
              <p className="text-muted-foreground mb-4">
                Reset the learning tour to view the step-by-step guide again when you visit a course.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("egreed-learning-tour-completed");
                  toast.success("Learning tour reset! Visit any course to see the guide again.");
                }}
                className="inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Learning Tour
              </Button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:glow-primary transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfileSettings;