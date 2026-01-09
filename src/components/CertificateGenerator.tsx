import { useState } from "react";
import { Download, Award, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface CertificateGeneratorProps {
  courseId: string;
  courseTitle: string;
  studentName: string;
  userId: string;
  onGenerated?: () => void;
}

const generateCertificateNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ET-${timestamp}-${random}`;
};

const CertificateGenerator = ({
  courseId,
  courseTitle,
  studentName,
  userId,
  onGenerated,
}: CertificateGeneratorProps) => {
  const [generating, setGenerating] = useState(false);
  const [certificate, setCertificate] = useState<{
    certificate_number: string;
    issued_at: string;
  } | null>(null);

  const checkExistingCertificate = async () => {
    const { data } = await supabase
      .from("certificates")
      .select("certificate_number, issued_at")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (data) {
      setCertificate(data);
    }
    return data;
  };

  const generatePDF = (certNumber: string, issuedAt: string) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(15, 15, 20);
    doc.rect(0, 0, width, height, "F");

    // Border
    doc.setDrawColor(255, 107, 53);
    doc.setLineWidth(2);
    doc.rect(10, 10, width - 20, height - 20);

    // Inner border
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, width - 30, height - 30);

    // Title
    doc.setTextColor(255, 107, 53);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("EGREED TECHNOLOGY", width / 2, 35, { align: "center" });

    // Certificate text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE OF COMPLETION", width / 2, 55, { align: "center" });

    // Decorative line
    doc.setDrawColor(255, 107, 53);
    doc.setLineWidth(1);
    doc.line(width / 2 - 60, 62, width / 2 + 60, 62);

    // This certifies text
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("This is to certify that", width / 2, 80, { align: "center" });

    // Student name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(studentName, width / 2, 95, { align: "center" });

    // Has completed text
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("has successfully completed the course", width / 2, 110, { align: "center" });

    // Course name
    doc.setTextColor(255, 107, 53);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(courseTitle, width / 2, 125, { align: "center" });

    // Date and certificate number
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const formattedDate = new Date(issuedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Issued: ${formattedDate}`, width / 2 - 50, 150, { align: "center" });
    doc.text(`Certificate ID: ${certNumber}`, width / 2 + 50, 150, { align: "center" });

    // Signature line
    doc.setDrawColor(100, 100, 100);
    doc.line(width / 2 - 40, 170, width / 2 + 40, 170);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text("Egreed Technology", width / 2, 178, { align: "center" });

    // Verify text
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Verify this certificate at: egreed.technology/verify", width / 2, 190, { align: "center" });

    // Download the PDF
    doc.save(`Egreed-Certificate-${certNumber}.pdf`);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // Check if certificate already exists
      const existing = await checkExistingCertificate();
      if (existing) {
        generatePDF(existing.certificate_number, existing.issued_at);
        toast.success("Certificate downloaded!");
        return;
      }

      // Generate new certificate
      const certNumber = generateCertificateNumber();
      const issuedAt = new Date().toISOString();

      const { error } = await supabase.from("certificates").insert({
        user_id: userId,
        course_id: courseId,
        certificate_number: certNumber,
        student_name: studentName,
        course_title: courseTitle,
        issued_at: issuedAt,
      });

      if (error) throw error;

      setCertificate({ certificate_number: certNumber, issued_at: issuedAt });
      generatePDF(certNumber, issuedAt);
      toast.success("Certificate generated and downloaded!");
      onGenerated?.();
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6 text-center">
      <Award className="w-12 h-12 text-primary mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">🎉 Congratulations!</h3>
      <p className="text-muted-foreground mb-4">
        You've completed this course. Download your certificate now!
      </p>
      {certificate && (
        <p className="text-sm text-muted-foreground mb-4">
          Certificate ID: <span className="text-primary font-mono">{certificate.certificate_number}</span>
        </p>
      )}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:glow-primary transition-all disabled:opacity-50"
      >
        {generating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            {certificate ? "Download Certificate" : "Generate Certificate"}
          </>
        )}
      </button>
    </div>
  );
};

export default CertificateGenerator;