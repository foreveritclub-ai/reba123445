import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  excerpt?: string;
}

const SocialShare = ({ url, title, excerpt }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title}${excerpt ? ` — ${excerpt}` : ""}`);

  const shares = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      className: "bg-[#25D366] hover:bg-[#20bd5a] text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      className: "bg-[#1DA1F2] hover:bg-[#1a91da] text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: "bg-[#1877F2] hover:bg-[#166fe0] text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      className: "bg-[#0A66C2] hover:bg-[#0958a8] text-white",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="border-y py-6 my-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-foreground mr-2">Share this article:</span>
        {shares.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${s.name}`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-sm ${s.className}`}
          >
            <s.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{s.name}</span>
          </a>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="rounded-full ml-auto"
        >
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Link2 className="w-4 h-4 mr-2" />}
          {copied ? "Copied" : "Copy link"}
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
