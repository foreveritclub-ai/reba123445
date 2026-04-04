import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Download, Play, Square, Loader2, Sparkles, Type, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AdStyle = "modern" | "bold" | "elegant" | "tech";

const styleConfigs: Record<AdStyle, { bg: string; accent: string; font: string; label: string }> = {
  modern: { bg: "#1a1a2e", accent: "#e94560", font: "sans-serif", label: "Modern Red" },
  bold: { bg: "#0f0c29", accent: "#f7971e", font: "Impact, sans-serif", label: "Bold Orange" },
  elegant: { bg: "#141e30", accent: "#00d2ff", font: "Georgia, serif", label: "Elegant Blue" },
  tech: { bg: "#0a192f", accent: "#64ffda", font: "monospace", label: "Tech Green" },
};

const AdminAdGenerator = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationRef = useRef<number>(0);
  const chunksRef = useRef<Blob[]>([]);

  const [headline, setHeadline] = useState("20% OFF All Services");
  const [description, setDescription] = useState("Transform your business with Egreed Technology");
  const [ctaText, setCtaText] = useState("Claim Now!");
  const [style, setStyle] = useState<AdStyle>("modern");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, frame: number, totalFrames: number, bgImage?: HTMLImageElement) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const config = styleConfigs[style];
    const progress = frame / totalFrames;

    // Background
    ctx.fillStyle = config.bg;
    ctx.fillRect(0, 0, w, h);

    // Background image with overlay
    if (bgImage) {
      const scale = Math.max(w / bgImage.width, h / bgImage.height);
      const imgW = bgImage.width * scale;
      const imgH = bgImage.height * scale;
      ctx.globalAlpha = 0.3;
      ctx.drawImage(bgImage, (w - imgW) / 2, (h - imgH) / 2, imgW, imgH);
      ctx.globalAlpha = 1;
    }

    // Animated gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, config.bg + "cc");
    gradient.addColorStop(1, config.bg + "99");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Animated particles
    for (let i = 0; i < 15; i++) {
      const x = (w * ((i * 73 + frame * 2) % 100)) / 100;
      const y = (h * ((i * 37 + frame * 1.5) % 100)) / 100;
      const size = 2 + Math.sin(frame * 0.05 + i) * 2;
      ctx.fillStyle = config.accent + "40";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Animated accent line
    const lineWidth = Math.min(w * 0.6, w * progress * 2);
    ctx.strokeStyle = config.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.35);
    ctx.lineTo(w * 0.2 + lineWidth, h * 0.35);
    ctx.stroke();

    // Headline with fade-in and slide
    const headlineY = h * 0.48;
    const headlineOffset = Math.max(0, 1 - progress * 4) * 50;
    const headlineAlpha = Math.min(1, progress * 4);
    ctx.globalAlpha = headlineAlpha;
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.min(w * 0.07, 56)}px ${config.font}`;
    ctx.textAlign = "center";

    // Word wrap headline
    const words = headline.split(" ");
    let line = "";
    const lines: string[] = [];
    const maxWidth = w * 0.7;
    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    lines.forEach((l, i) => {
      ctx.fillText(l, w / 2, headlineY - headlineOffset + i * (w * 0.08));
    });

    // Description with delayed fade-in
    const descAlpha = Math.min(1, Math.max(0, (progress - 0.2) * 5));
    const descOffset = Math.max(0, 1 - (progress - 0.2) * 5) * 30;
    ctx.globalAlpha = descAlpha;
    ctx.fillStyle = "#ffffffcc";
    ctx.font = `${Math.min(w * 0.035, 24)}px ${config.font}`;
    const descY = headlineY + lines.length * (w * 0.08) + 20;
    ctx.fillText(description, w / 2, descY - descOffset);

    // CTA button with pulse
    const ctaAlpha = Math.min(1, Math.max(0, (progress - 0.4) * 4));
    if (ctaAlpha > 0) {
      ctx.globalAlpha = ctaAlpha;
      const ctaY = descY + 60;
      const pulse = 1 + Math.sin(frame * 0.1) * 0.03;
      const btnW = ctx.measureText(ctaText).width + 60;
      const btnH = 50;

      ctx.save();
      ctx.translate(w / 2, ctaY);
      ctx.scale(pulse, pulse);

      // Button background
      ctx.fillStyle = config.accent;
      const radius = 25;
      ctx.beginPath();
      ctx.roundRect(-btnW / 2, -btnH / 2, btnW, btnH, radius);
      ctx.fill();

      // Button glow
      ctx.shadowColor = config.accent;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Button text
      ctx.fillStyle = config.bg;
      ctx.font = `bold ${Math.min(w * 0.035, 22)}px ${config.font}`;
      ctx.textBaseline = "middle";
      ctx.fillText(ctaText, 0, 0);
      ctx.restore();
    }

    // Brand watermark
    ctx.globalAlpha = Math.min(0.6, progress * 2);
    ctx.fillStyle = "#ffffff80";
    ctx.font = `${Math.min(w * 0.025, 16)}px sans-serif`;
    ctx.textAlign = "right";
    ctx.fillText("Egreed Technology", w - 30, h - 25);

    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
  }, [headline, description, ctaText, style]);

  const previewAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFrames = 150; // 5 seconds at 30fps
    let frame = 0;
    let bgImage: HTMLImageElement | undefined;

    const loadAndAnimate = () => {
      if (imagePreview) {
        const img = new window.Image();
        img.onload = () => {
          bgImage = img;
          animate();
        };
        img.src = imagePreview;
      } else {
        animate();
      }
    };

    const animate = () => {
      if (frame >= totalFrames) {
        frame = 0;
      }
      drawFrame(ctx, frame, totalFrames, bgImage);
      frame++;
      if (previewPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    loadAndAnimate();
  }, [drawFrame, imagePreview, previewPlaying]);

  useEffect(() => {
    if (previewPlaying) {
      previewAnimation();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [previewPlaying, previewAnimation]);

  const generateVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    setVideoUrl(null);
    chunksRef.current = [];

    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      let bgImage: HTMLImageElement | undefined;
      if (imagePreview) {
        bgImage = await new Promise<HTMLImageElement>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve(img);
          img.src = imagePreview!;
        });
      }

      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
        videoBitsPerSecond: 2500000,
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsGenerating(false);
        setIsRecording(false);
        toast({ title: "Video Generated!", description: "Your ad video is ready for download." });
      };

      mediaRecorder.start();
      setIsRecording(true);

      const totalFrames = 150;
      let frame = 0;

      const renderFrame = () => {
        if (frame >= totalFrames) {
          mediaRecorder.stop();
          return;
        }
        drawFrame(ctx, frame, totalFrames, bgImage);
        frame++;
        requestAnimationFrame(renderFrame);
      };

      renderFrame();
    } catch (error) {
      console.error("Video generation error:", error);
      toast({ title: "Error", description: "Failed to generate video. Please try again.", variant: "destructive" });
      setIsGenerating(false);
      setIsRecording(false);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `egreed-ad-${Date.now()}.webm`;
    a.click();
  };

  // Draw initial frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (imagePreview) {
      const img = new window.Image();
      img.onload = () => drawFrame(ctx, 75, 150, img);
      img.src = imagePreview;
    } else {
      drawFrame(ctx, 75, 150);
    }
  }, [headline, description, ctaText, style, imagePreview, drawFrame]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Ad Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Headline</label>
              <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Enter ad headline..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter ad description..." rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">CTA Button Text</label>
              <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Claim Now!" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Style</label>
              <Select value={style} onValueChange={(v) => setStyle(v as AdStyle)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(styleConfigs).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.accent }} />
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Background Image (optional)</label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview && (
                <div className="mt-2 relative w-20 h-14 rounded overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs px-1 rounded-bl">×</button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Preview
              </CardTitle>
              <Badge variant="secondary">{isRecording ? "Recording..." : "Ready"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full rounded-lg border border-border"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPreviewPlaying(!previewPlaying)}
              >
                {previewPlaying ? <Square className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {previewPlaying ? "Stop Preview" : "Preview Animation"}
              </Button>
              <Button
                size="sm"
                onClick={generateVideo}
                disabled={isGenerating || isRecording}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Video className="w-4 h-4 mr-1" />}
                {isGenerating ? "Generating..." : "Generate Video"}
              </Button>
              {videoUrl && (
                <Button size="sm" variant="outline" onClick={downloadVideo}>
                  <Download className="w-4 h-4 mr-1" /> Download
                </Button>
              )}
            </div>
            {videoUrl && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Generated Video:</p>
                <video src={videoUrl} controls className="w-full rounded-lg border border-border" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAdGenerator;
