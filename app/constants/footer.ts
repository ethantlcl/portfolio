import { FooterLink } from "../types";
import { withBasePath } from "./basePath";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: `LinkedIn`,
    hoverText: `Connect with me`,
    icon: `icons/linkedin.svg`,
    url: `https://www.linkedin.com/in/ethan-tran-29467b33a/`,
  },
  {
    name: `GitHub`,
    hoverText: `Dont bother...`,
    icon: `icons/github.svg`,
    url: `https://github.com/ethantlcl-png`,
  },
  {
    name: `Spotify`,
    hoverText: `Curated playlists`,
    icon: `icons/spotify.svg`,
    url: `https://open.spotify.com/user/qvphol94tqhtuuoc2nicnxj6z?si=708063f2c22c472c`,
  },
  {
    name: `Instagram`,
    hoverText: `@ethontran`,
    icon: `icons/instagram.svg`,
    url: `https://www.instagram.com/ethontran/`,
  },
  {
    name: `Resume`,
    hoverText: `Download`,
    icon: `icons/file.svg`,
    url: withBasePath(`/resume.pdf`),
    download: true,
    downloadFileName: `Resume - Ethan Tran.pdf`,
  }
];
