interface ProjectUrl {
  text: string;
  url: string;
}

export interface ProjectImage {
  src: string;
  alt?: string;
  note?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  orientation?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
}

export interface Project {
  title: string;
  date: string;
  subtext: string;
  details?: string;
  image?: string;
  imageNote?: string;
  imageWidth?: number;
  imageHeight?: number;
  gallery?: ProjectImage[];
  url?: string;
  urls?: ProjectUrl[];
  variant?: "default" | "photography" | "blog";
}
