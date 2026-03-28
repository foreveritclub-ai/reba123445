import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Save, Eye, EyeOff } from "lucide-react";

const AdminDiscountConfig = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ["discount-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discount_config")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState<any>(null);

  // Sync form state when data loads
  if (config && !form) {
    setForm({ ...config });
  }

  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      const { id, ...rest } = values;
      const { error } = await supabase
        .from("discount_config")
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discount-config"] });
      toast({ title: "Discount config updated!" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSave = () => {
    if (!form) return;
    updateMutation.mutate(form);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!form) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Discount Popup Configuration
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {form.is_active ? (
              <Eye className="w-4 h-4 text-green-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">
              {form.is_active ? "Active" : "Inactive"}
            </span>
            <Switch
              checked={form.is_active}
              onCheckedChange={(val) => setForm({ ...form, is_active: val })}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Offer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Discount Percentage</Label>
              <Input
                type="number"
                min={1}
                max={100}
                value={form.discount_percentage}
                onChange={(e) => setForm({ ...form, discount_percentage: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label>Promo Code</Label>
              <Input
                value={form.promo_code}
                onChange={(e) => setForm({ ...form, promo_code: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <Label>Title (e.g. "20% OFF")</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>CTA Button Text</Label>
              <Input
                value={form.cta_text}
                onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timing & Behavior</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Popup Delay (seconds)</Label>
              <Input
                type="number"
                min={1}
                max={60}
                value={form.delay_seconds}
                onChange={(e) => setForm({ ...form, delay_seconds: parseInt(e.target.value) || 4 })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                How long to wait before showing the popup
              </p>
            </div>
            <div>
              <Label>Offer Expiry (hours)</Label>
              <Input
                type="number"
                min={1}
                max={720}
                value={form.expiry_hours}
                onChange={(e) => setForm({ ...form, expiry_hours: parseInt(e.target.value) || 24 })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Countdown timer duration for the offer
              </p>
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-dashed border-primary/30">
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Preview</h4>
              <div className="text-center">
                <p className="text-2xl font-black bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  {form.title}
                </p>
                <p className="font-semibold text-sm">{form.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1">{form.description}</p>
                <div className="mt-2 inline-block px-3 py-1 rounded bg-muted border border-dashed border-primary/40">
                  <span className="text-xs text-muted-foreground">Code: </span>
                  <span className="font-mono font-bold text-primary">{form.promo_code}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {updateMutation.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default AdminDiscountConfig;
