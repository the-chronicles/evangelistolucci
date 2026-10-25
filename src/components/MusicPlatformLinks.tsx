import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa6";
import { Track } from "@/types";

type MusicPlatform = "spotify" | "appleMusic" | "youtubeMusic";

const PLATFORM_LABELS: Record<MusicPlatform, string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  youtubeMusic: "YouTube Music",
};

const PLATFORM_ICONS = {
  spotify: FaSpotify,
  appleMusic: FaApple,
  youtubeMusic: FaYoutube,
};

interface MusicPlatformIconLinkProps {
  platform: MusicPlatform;
  url: string;
}

export function MusicPlatformIconLink({
  platform,
  url,
}: MusicPlatformIconLinkProps) {
  const Icon = PLATFORM_ICONS[platform];
  const label = PLATFORM_LABELS[platform];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open on ${label}`}
      title={label}
      className="inline-flex aspect-square w-8 items-center justify-center border border-white/15 text-[#d6cec3] transition-colors hover:border-[#c8a97e] hover:text-[#c8a97e]"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

interface MusicPlatformLinksProps {
  track: Track;
}

export function MusicPlatformLinks({ track }: MusicPlatformLinksProps) {
  const query = encodeURIComponent(`${track.title} TOLUccI`);
  const links: Record<MusicPlatform, string> = {
    spotify: `https://open.spotify.com/search/${query}`,
    appleMusic:
      track.appleMusicUrl ??
      `https://music.apple.com/ng/artist/tolucci/1265222201?term=${query}`,
    youtubeMusic: `https://music.youtube.com/search?q=${query}`,
  };

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {(Object.keys(links) as MusicPlatform[]).map((platform) => (
        <MusicPlatformIconLink
          key={platform}
          platform={platform}
          url={links[platform]}
        />
      ))}
    </div>
  );
}
