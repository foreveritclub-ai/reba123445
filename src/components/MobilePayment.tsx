import { useState } from "react";
import { Phone, Loader2, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MobilePaymentProps {
  courseId: string;
  courseTitle: string;
  amount: number;
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const MobilePayment = ({
  courseId,
  courseTitle,
  amount,
  userId,
  onSuccess,
  onCancel,
}: MobilePaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mtn" | "airtel">("mtn");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"input" | "confirm" | "processing">("input");

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, "");
    
    // Handle Rwanda phone numbers
    if (cleaned.startsWith("250")) {
      return cleaned;
    } else if (cleaned.startsWith("0")) {
      return "250" + cleaned.substring(1);
    } else if (cleaned.length === 9) {
      return "250" + cleaned;
    }
    return cleaned;
  };

  const validatePhone = (phone: string) => {
    const formatted = formatPhoneNumber(phone);
    // Rwanda mobile numbers: 250 7X XXX XXXX (12 digits total)
    return /^250[7][0-9]{8}$/.test(formatted);
  };

  const handleSubmit = async () => {
    if (!validatePhone(phoneNumber)) {
      toast.error("Please enter a valid Rwanda phone number");
      return;
    }

    setStep("confirm");
  };

  const handleConfirmPayment = async () => {
    setProcessing(true);
    setStep("processing");

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);

      // Create payment record
      const { data: payment, error } = await supabase
        .from("payments")
        .insert({
          user_id: userId,
          course_id: courseId,
          amount: amount,
          currency: "RWF",
          payment_method: paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money",
          phone_number: formattedPhone,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      // Simulate payment processing (in production, integrate with actual payment gateway)
      // MTN MoMo API or Airtel Money API would be called here via an edge function
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // For demo purposes, mark as successful
      await supabase
        .from("payments")
        .update({ 
          status: "completed",
          transaction_id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        })
        .eq("id", payment.id);

      // Create enrollment
      await supabase.from("enrollments").insert({
        user_id: userId,
        course_id: courseId,
      });

      toast.success("Payment successful! You are now enrolled.");
      onSuccess();
    } catch (error: any) {
      console.error("Payment error:", error);
      if (error.code === "23505") {
        toast.error("You are already enrolled in this course");
      } else {
        toast.error("Payment failed. Please try again.");
      }
      setStep("input");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Smartphone className="w-5 h-5 text-primary" />
        Mobile Money Payment
      </h3>

      {step === "input" && (
        <>
          {/* Payment method selection */}
          <div className="mb-6">
            <Label className="mb-3 block">Select Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("mtn")}
                className={`p-4 border rounded-xl text-center transition-all ${
                  paymentMethod === "mtn"
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-border hover:border-yellow-500/50"
                }`}
              >
                <div className="font-bold text-yellow-500">MTN</div>
                <div className="text-xs text-muted-foreground">Mobile Money</div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("airtel")}
                className={`p-4 border rounded-xl text-center transition-all ${
                  paymentMethod === "airtel"
                    ? "border-red-500 bg-red-500/10"
                    : "border-border hover:border-red-500/50"
                }`}
              >
                <div className="font-bold text-red-500">Airtel</div>
                <div className="text-xs text-muted-foreground">Money</div>
              </button>
            </div>
          </div>

          {/* Phone number input */}
          <div className="mb-6">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="078 XXX XXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Enter your {paymentMethod === "mtn" ? "MTN" : "Airtel"} registered phone number
            </p>
          </div>

          {/* Amount display */}
          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Course</span>
              <span className="font-medium truncate ml-2 max-w-[200px]">{courseTitle}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-xl font-bold text-primary">{amount.toLocaleString()} FRW</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 border border-border rounded-xl font-medium hover:bg-secondary/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-primary transition-all"
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <div className="text-center py-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              paymentMethod === "mtn" ? "bg-yellow-500/20" : "bg-red-500/20"
            }`}>
              <Smartphone className={`w-8 h-8 ${paymentMethod === "mtn" ? "text-yellow-500" : "text-red-500"}`} />
            </div>
            <h4 className="font-bold text-lg mb-2">Confirm Payment</h4>
            <p className="text-muted-foreground text-sm mb-4">
              You will receive a prompt on your phone ({formatPhoneNumber(phoneNumber)}) to authorize the payment.
            </p>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-primary">{amount.toLocaleString()} FRW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium">{paymentMethod === "mtn" ? "MTN MoMo" : "Airtel Money"}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("input")}
              className="flex-1 py-3 border border-border rounded-xl font-medium hover:bg-secondary/50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirmPayment}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:glow-primary transition-all"
            >
              Pay Now
            </button>
          </div>
        </>
      )}

      {step === "processing" && (
        <div className="text-center py-8">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h4 className="font-bold text-lg mb-2">Processing Payment</h4>
          <p className="text-muted-foreground text-sm">
            Please check your phone and enter your PIN to complete the payment...
          </p>
        </div>
      )}
    </div>
  );
};

export default MobilePayment;