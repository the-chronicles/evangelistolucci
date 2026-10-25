import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const SOCIAL_LINKS: {
  name: string;
  handle: string;
  href: string;
  icon: IconType;
}[] = [
  {
    name: "Instagram",
    handle: "@tolucci.ng",
    href: "https://www.instagram.com/tolucci.ng/",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    handle: "tolucci.ng",
    href: "https://web.facebook.com/tolucci.ng",
    icon: FaFacebookF,
  },
  {
    name: "X",
    handle: "@TOLUccI",
    href: "https://x.com/TOLUccI",
    icon: FaXTwitter,
  },
  {
    name: "TikTok",
    handle: "@tolucci.ng",
    href: "https://www.tiktok.com/@tolucci.ng",
    icon: FaTiktok,
  },
];

export default function SocialLinks({
  showLabels = false,
}: {
  showLabels?: boolean;
}) {
  return (
    <ul className={showLabels ? "space-y-3" : "flex items-center gap-3"}>
      {SOCIAL_LINKS.map(({ name, handle, href, icon: Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}${showLabels ? ` ${handle}` : ""} (opens in a new tab)`}
            className={
              showLabels
                ? "inline-flex items-center gap-3 text-xs text-[#d6cec3] hover:text-[#c8a97e] transition-colors"
                : "inline-flex items-center justify-center w-9 h-9 border border-white/[0.1] text-[#9e978e] hover:text-[#c8a97e] hover:border-[#c8a97e] transition-colors"
            }
          >
            <Icon aria-hidden="true" className="w-4 h-4 shrink-0" />
            {showLabels && (
              <span>
                {/* {name} */}
                <span className="text-[#9e978e]">{handle}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
