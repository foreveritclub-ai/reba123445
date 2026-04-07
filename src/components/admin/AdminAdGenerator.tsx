import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Video, Download, Play, Square, Loader2, Sparkles, Image as ImageIcon, Wand2, Eye, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AdStyle = "neon" | "luxury" | "gradient" | "minimal" | "retro" | "cyber";

const styleConfigs: Record<AdStyle, { bg1: string; bg2: string; accent: string; text: string; font: string; label: string; emoji: string }> = {
  neon: { bg1: "#0a0a0a", bg2: "#1a0a2e", accent: "#ff006e", text: "#ffffff", font: "'Segoe UI', sans-serif", label: "Neon Glow", emoji: "🌈" },
  luxury: { bg1: "#1a1a1a", bg2: "#2d1f0e", accent: "#d4a574", text: "#f5e6d3", font: "Georgia, serif", label: "Luxury Gold", emoji: "✨" },
  gradient: { bg1: "#667eea", bg2: "#764ba2", accent: "#ffffff", text: "#ffffff", font: "'Segoe UI', sans-serif", label: "Vivid Gradient", emoji: "🎨" },
  minimal: { bg1: "#fafafa", bg2: "#f0f0f0", accent: "#000000", text: "#111111", font: "'Segoe UI', sans-serif", label: "Clean Minimal", emoji: "⬜" },
  retro: { bg1: "#2b1055", bg2: "#d53369", accent: "#ffed4a", text: "#ffffff", font: "Impact, sans-serif", label: "Retro Wave", emoji: "🕹️" },
  cyber: { bg1: "#0d1117", bg2: "#161b22", accent: "#58a6ff", text: "#c9d1d9", font: "'Courier New', monospace", label: "Cyber Tech", emoji: "🤖" },
};

type AspectRatio = "16:9" | "9:16" | "1:1";
const aspectDimensions: Record<AspectRatio, { w: number; h: number }> = {
  "16:9": { w: 640, h: 360 },
  "9:16": { w: 360, h: 640 },
  "1:1": { w: 480, h: 480 },
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
  const [brandName, setBrandName] = useState("Egreed Technology");
  const [style, setStyle] = useState<AdStyle>("neon");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [duration, setDuration] = useState(5);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const dims = aspectDimensions[aspectRatio];

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

    // Animated gradient background
    const grad = ctx.createLinearGradient(
      w * 0.5 + Math.cos(progress * Math.PI * 2) * w * 0.5, 0,
      w * 0.5 + Math.sin(progress * Math.PI * 2) * w * 0.5, h
    );
    grad.addColorStop(0, config.bg1);
    grad.addColorStop(1, config.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Background image
    if (bgImage) {
      const scale = Math.max(w / bgImage.width, h / bgImage.height);
      const imgW = bgImage.width * scale;
      const imgH = bgImage.height * scale;
      ctx.globalAlpha = 0.25;
      ctx.drawImage(bgImage, (w - imgW) / 2, (h - imgH) / 2, imgW, imgH);
      ctx.globalAlpha = 1;
      // Dark overlay
      const overlay = ctx.createLinearGradient(0, 0, 0, h);
      overlay.addColorStop(0, config.bg1 + "cc");
      overlay.addColorStop(0.5, config.bg1 + "88");
      overlay.addColorStop(1, config.bg1 + "dd");
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, w, h);
    }

    // Animated geometric shapes
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 6; i++) {
      const cx = w * ((i * 0.2 + progress * 0.3) % 1);
      const cy = h * ((i * 0.3 + progress * 0.2) % 1);
      const radius = 40 + Math.sin(progress * Math.PI * 2 + i) * 20;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = config.accent;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Floating particles with trails
    for (let i = 0; i < 20; i++) {
      const x = (w * ((i * 53 + frame * 1.5) % 200)) / 200;
      const y = (h * ((i * 37 + frame * 0.8) % 200)) / 200;
      const size = 1.5 + Math.sin(frame * 0.03 + i * 0.7) * 1.5;
      const alpha = 0.15 + Math.sin(frame * 0.05 + i) * 0.1;
      ctx.fillStyle = config.accent;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Accent line with glow
    const lineProgress = Math.min(1, progress * 3);
    const lineY = h * 0.32;
    const lineStartX = w * 0.15;
    const lineEndX = lineStartX + (w * 0.7) * lineProgress;

    ctx.save();
    ctx.shadowColor = config.accent;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = config.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lineStartX, lineY);
    ctx.lineTo(lineEndX, lineY);
    ctx.stroke();
    ctx.restore();

    // Small dots at line ends
    if (lineProgress > 0) {
      ctx.fillStyle = config.accent;
      ctx.beginPath();
      ctx.arc(lineStartX, lineY, 4, 0, Math.PI * 2);
      ctx.fill();
      if (lineProgress >= 1) {
        ctx.beginPath();
        ctx.arc(lineEndX, lineY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Headline with typewriter + glow effect
    const headlineDelay = 0;
    const headlineAlpha = Math.min(1, Math.max(0, (progress - headlineDelay) * 5));
    const fontSize = Math.min(w * 0.075, 60);
    ctx.font = `bold ${fontSize}px ${config.font}`;
    ctx.textAlign = "center";
    ctx.fillStyle = config.text;

    // Word wrap
    const words = headline.split(" ");
    let line = "";
    const lines: string[] = [];
    const maxWidth = w * 0.75;
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

    const headlineBaseY = h * 0.42;
    const lineHeight = fontSize * 1.3;
    const slideUp = Math.max(0, 1 - (progress - headlineDelay) * 5) * 40;

    ctx.save();
    ctx.globalAlpha = headlineAlpha;
    ctx.shadowColor = config.accent;
    ctx.shadowBlur = style === "neon" ? 20 : 0;
    lines.forEach((l, i) => {
      ctx.fillText(l, w / 2, headlineBaseY + i * lineHeight - slideUp);
    });
    ctx.restore();

    // Description
    const descDelay = 0.15;
    const descAlpha = Math.min(1, Math.max(0, (progress - descDelay) * 5));
    const descSlide = Math.max(0, 1 - (progress - descDelay) * 5) * 25;
    ctx.globalAlpha = descAlpha;
    ctx.fillStyle = config.text + "bb";
    ctx.font = `${Math.min(w * 0.035, 22)}px ${config.font}`;
    const descY = headlineBaseY + lines.length * lineHeight + 15;
    ctx.fillText(description, w / 2, descY - descSlide);
    ctx.globalAlpha = 1;

    // CTA button with shine effect
    const ctaDelay = 0.3;
    const ctaAlpha = Math.min(1, Math.max(0, (progress - ctaDelay) * 4));
    if (ctaAlpha > 0) {
      ctx.globalAlpha = ctaAlpha;
      const ctaY = descY + 55;
      const pulse = 1 + Math.sin(frame * 0.08) * 0.02;
      ctx.font = `bold ${Math.min(w * 0.035, 20)}px ${config.font}`;
      const btnW = ctx.measureText(ctaText).width + 70;
      const btnH = 48;

      ctx.save();
      ctx.translate(w / 2, ctaY);
      ctx.scale(pulse, pulse);

      // Button shadow
      ctx.shadowColor = config.accent;
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 5;

      // Rounded rect button
      ctx.fillStyle = config.accent;
      ctx.beginPath();
      ctx.roundRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);
      ctx.fill();

      // Shine sweep
      const shineX = ((frame * 3) % (btnW + 60)) - 30 - btnW / 2;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(-btnW / 2, -btnH / 2, btnW, btnH, 24);
      ctx.clip();
      const shine = ctx.createLinearGradient(shineX, 0, shineX + 40, 0);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(0.5, "rgba(255,255,255,0.25)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      ctx.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      ctx.restore();

      // Button text
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = style === "minimal" ? "#ffffff" : config.bg1;
      ctx.textBaseline = "middle";
      ctx.fillText(ctaText, 0, 1);
      ctx.restore();
    }

    // Brand watermark with subtle animation
    const brandAlpha = Math.min(0.5, progress * 2);
    ctx.globalAlpha = brandAlpha;
    ctx.fillStyle = config.text + "60";
    ctx.font = `500 ${Math.min(w * 0.025, 14)}px ${config.font}`;
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(brandName, w - 20, h - 20);

    // Corner decorations
    ctx.strokeStyle = config.accent + "30";
    ctx.lineWidth = 2;
    const cornerSize = 25;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(15, 15 + cornerSize);
    ctx.lineTo(15, 15);
    ctx.lineTo(15 + cornerSize, 15);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(w - 15, h - 15 - cornerSize);
    ctx.lineTo(w - 15, h - 15);
    ctx.lineTo(w - 15 - cornerSize, h - 15);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
  }, [headline, description, ctaText, brandName, style]);

  const previewAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dims.w;
    canvas.height = dims.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFrames = duration * 30;
    let frame = 0;
    let bgImage: HTMLImageElement | undefined;

    const loadAndAnimate = () => {
      if (imagePreview) {
        const img = new window.Image();
        img.onload = () => { bgImage = img; animate(); };
        img.src = imagePreview;
      } else {
        animate();
      }
    };

    const animate = () => {
      if (frame >= totalFrames) frame = 0;
      drawFrame(ctx, frame, totalFrames, bgImage);
      frame++;
      if (previewPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    loadAndAnimate();
  }, [drawFrame, imagePreview, previewPlaying, dims, duration]);

  useEffect(() => {
    if (previewPlaying) previewAnimation();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [previewPlaying, previewAnimation]);

  const generateVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dims.w;
    canvas.height = dims.h;
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
        videoBitsPerSecond: 4000000,
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
        toast({ title: "🎬 Video Generated!", description: "Your professional ad video is ready." });
      };

      mediaRecorder.start();
      setIsRecording(true);

      const totalFrames = duration * 30;
      let frame = 0;

      const renderFrame = () => {
        if (frame >= totalFrames) { mediaRecorder.stop(); return; }
        drawFrame(ctx, frame, totalFrames, bgImage);
        frame++;
        requestAnimationFrame(renderFrame);
      };

      renderFrame();
    } catch (error) {
      console.error("Video generation error:", error);
      toast({ title: "Error", description: "Failed to generate video.", variant: "destructive" });
      setIsGenerating(false);
      setIsRecording(false);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `egreed-ad-${aspectRatio.replace(":", "x")}-${Date.now()}.webm`;
    a.click();
  };

  // Draw initial static frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dims.w;
    canvas.height = dims.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (imagePreview) {
      const img = new window.Image();
      img.onload = () => drawFrame(ctx, 75, 150, img);
      img.src = imagePreview;
    } else {
      drawFrame(ctx, 75, 150);
    }
  }, [headline, description, ctaText, brandName, style, imagePreview, drawFrame, dims]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wand2 className="w-5 h-5 text-primary" />
                Ad Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Headline *</Label>
                <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Your main message..." className="mt-1" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Supporting text..." rows={2} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>CTA Button</Label>
                  <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Claim Now!" className="mt-1" />
                </div>
                <div>
                  <Label>Brand Name</Label>
                  <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Egreed Technology" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5 text-primary" />
                Style & Format
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Visual Style</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(Object.entries(styleConfigs) as [AdStyle, typeof styleConfigs[AdStyle]][]).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setStyle(key)}
                      className={`relative p-3 rounded-xl border-2 transition-all text-left ${
                        style === key ? "border-primary shadow-md scale-[1.02]" : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full" style={{ background: `linear-gradient(135deg, ${config.bg1}, ${config.accent})` }} />
                        <span className="text-xs">{config.emoji}</span>
                      </div>
                      <span className="text-xs font-medium">{config.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={(v) => setAspectRatio(v as AspectRatio)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                      <SelectItem value="1:1">1:1 (Square)</SelectItem>
                      <SelectItem value="9:16">9:16 (Portrait/Story)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration: {duration}s</Label>
                  <Slider value={[duration]} onValueChange={(v) => setDuration(v[0])} min={3} max={10} step={1} className="mt-3" />
                </div>
              </div>

              <div>
                <Label>Background Image (optional)</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
                {imagePreview && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="relative w-16 h-12 rounded overflow-hidden border">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => { setImageFile(null); setImagePreview(null); }} className="text-destructive text-xs">Remove</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Output */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-primary" />
                  Preview
                </CardTitle>
                <Badge variant={isRecording ? "destructive" : "secondary"} className="text-xs">
                  {isRecording ? "● Recording" : "Ready"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center bg-muted/30 rounded-xl p-4">
                <canvas
                  ref={canvasRef}
                  width={dims.w}
                  height={dims.h}
                  className="rounded-lg border border-border shadow-lg"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPreviewPlaying(!previewPlaying)}
                  className="gap-1"
                >
                  {previewPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {previewPlaying ? "Stop" : "Preview"}
                </Button>
                <Button
                  size="sm"
                  onClick={generateVideo}
                  disabled={isGenerating || isRecording}
                  className="gap-1 bg-gradient-to-r from-primary to-primary/80"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Video className="w-3.5 h-3.5" />}
                  {isGenerating ? "Generating..." : "Generate Video"}
                </Button>
                {videoUrl && (
                  <Button size="sm" variant="outline" onClick={downloadVideo} className="gap-1">
                    <Download className="w-3.5 h-3.5" /> Download .webm
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {videoUrl && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Generated Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <video src={videoUrl} controls className="w-full rounded-lg border border-border shadow-md" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAdGenerator;
