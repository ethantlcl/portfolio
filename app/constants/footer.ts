import { FooterLink } from "../types";
import { withBasePath } from "./basePath";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: `LinkedIn`,
    hoverText: `Connect with me`,
    icon: withBasePath(`/icons/linkedin.svg`),
    url: `https://www.linkedin.com/in/ethandvtran/`,
  },
  {
    name: `GitHub`,
    hoverText: `Dont bother...`,
    icon: withBasePath(`/icons/github.svg`),
    url: `https://github.com/ethantlcl-png`,
  },
  {
    name: `Spotify`,
    hoverText: `Curated playlists`,
    icon: withBasePath(`/icons/spotify.svg`),
    url: `https://open.spotify.com/user/qvphol94tqhtuuoc2nicnxj6z?si=708063f2c22c472c`,
  },
  {
    name: `Instagram`,
    hoverText: `@ethontran`,
    icon: withBasePath(`/icons/instagram.svg`),
    url: `https://www.instagram.com/ethontran/`,
  },
  {
    name: `Resume`,
    hoverText: `Download`,
    icon: withBasePath(`/icons/file.svg`),
    url: withBasePath(`/resume.pdf`),
    unavailableMessage: `Temporarily Unavailable`,
  }
];
