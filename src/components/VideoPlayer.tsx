interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const getVideoEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://player.vimeo.com/video/${match[1]}?byline=0&portrait=0`;
    }
  }

  return null;
};

const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  const embedUrl = getVideoEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Video not available</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Check back later for video content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default VideoPlayer;