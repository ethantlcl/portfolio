export const BASE_PATH = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export const withBasePath = (src: string) => (
  src.startsWith("/") ? `${BASE_PATH}${src}` : `${BASE_PATH}/${src}`
);
