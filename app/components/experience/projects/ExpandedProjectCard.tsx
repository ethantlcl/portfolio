import gsap from "gsap";
import Image from "next/image";
import { type ReactNode, useEffect, useMemo, useRef } from "react";

import { Project, ProjectImage } from "@types";

interface ExpandedProjectCardProps {
  project: Project;
  onClose: () => void;
}

interface PackedGalleryImage extends ProjectImage {
  columnSpan: 1 | 2;
}

interface ProjectImageAssetProps {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  width?: number;
  height?: number;
  preload?: boolean;
}

const ProjectImageAsset = ({
  src,
  alt,
  className,
  sizes,
  width = 1600,
  height = 900,
  preload = false,
}: ProjectImageAssetProps) => (
  <Image
    alt={alt}
    className={className}
    height={height}
    preload={preload}
    quality={90}
    sizes={sizes}
    src={src}
    width={width}
  />
);

const BlogImageFrame = ({
  image,
  className,
  sizes,
}: {
  image: ProjectImage;
  className: string;
  sizes: string;
}) => (
  <div className="project-detail-blog-image-frame">
    <ProjectImageAsset
      className={className}
      alt={image.alt || "Project image"}
      sizes={sizes}
      src={image.src}
      width={image.width}
      height={image.height}
    />
    {image.note && (
      <div className="project-detail-blog-image-note">📍 {image.note}</div>
    )}
  </div>
);

const renderInlineContent = (content: string, keyPrefix: string) => {
  const nodes: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|_([^_]+)_)/g;
  let lastIndex = 0;

  for (const match of content.matchAll(pattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(content.slice(lastIndex, matchIndex));
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a
          key={`${keyPrefix}-${matchIndex}`}
          className="project-rich-link"
          href={match[3]}
          target="_blank"
          rel="noreferrer">
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(<strong key={`${keyPrefix}-${matchIndex}`}>{match[4]}</strong>);
    } else if (match[5]) {
      nodes.push(<em key={`${keyPrefix}-${matchIndex}`}>{match[5]}</em>);
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : content;
};

const ExpandedProjectCard = ({ project, onClose }: ExpandedProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const details = project.details?.trim() || "";
  const summary = project.subtext?.trim() || "";
  const isPhotographyProject = project.variant === "photography";
  const isBlogProject = project.variant === "blog";
  const isScubaProject = project.title === "Scuba";
  const gallery = project.gallery?.length
    ? project.gallery
    : project.image
      ? [{ src: project.image, alt: `${project.title} preview` }]
      : [];
  const cardClassName = `project-detail-card${isPhotographyProject ? " project-detail-card-photography" : ""}${isBlogProject ? " project-detail-card-blog" : ""}`;
  const imageClassName = `project-detail-image${isPhotographyProject ? " project-detail-image-photography" : ""}${isBlogProject ? " project-detail-image-blog" : ""}`;
  const bodyClassName = `project-detail-body${isPhotographyProject ? " project-detail-body-photography" : ""}${isBlogProject ? " project-detail-body-blog" : ""}`;
  const summaryClassName = `project-detail-summary${isPhotographyProject ? " project-detail-summary-photography" : ""}${isBlogProject ? " project-detail-summary-blog" : ""}`;
  const infoBoxClassName = `project-detail-info-box${isPhotographyProject ? " project-detail-info-box-photography" : ""}${isBlogProject ? " project-detail-info-box-blog" : ""}`;
  const infoLabelClassName = `project-detail-info-label${isPhotographyProject ? " project-detail-info-label-photography" : ""}${isBlogProject ? " project-detail-info-label-blog" : ""}`;
  const detailsClassName = `project-detail-text${isPhotographyProject ? " project-detail-text-photography" : ""}${isBlogProject ? " project-detail-text-blog" : ""}`;
  const blogGallery = isBlogProject
    ? gallery.filter((image) => image.src !== project.image)
    : gallery;
  const detailBlocks = details
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  const packedGallery = useMemo(() => {
    if (!isPhotographyProject || gallery.length < 3) {
      return gallery.map((image) => ({
        ...image,
        columnSpan: image.orientation === "landscape" ? 2 : 1,
      }));
    }

    const remaining = [...gallery];
    const ordered: PackedGalleryImage[] = [];
    let openColumns = 0;

    while (remaining.length > 0) {
      const nextImage = remaining[0];
      const nextSpan = nextImage.orientation === "landscape" ? 2 : 1;

      if (openColumns === 1) {
        const singleIndex = remaining.findIndex((image) => image.orientation !== "landscape");

        if (singleIndex >= 0) {
          const image = remaining.splice(singleIndex, 1)[0];
          ordered.push({
            ...image,
            columnSpan: 1,
          });
          openColumns = 0;
          continue;
        }

        const image = remaining.shift() as ProjectImage;
        ordered.push({
          ...image,
          columnSpan: 1,
        });
        openColumns = 0;
        continue;
      }

      if (nextSpan === 1) {
        const image = remaining.shift() as ProjectImage;
        ordered.push({
          ...image,
          columnSpan: 1,
        });
        openColumns = (openColumns + 1) % 2;
        continue;
      }

      const image = remaining.shift() as ProjectImage;
      ordered.push({
        ...image,
        columnSpan: 2,
      });
      openColumns = 0;
    }

    return ordered;
  }, [gallery, isPhotographyProject]);

  const renderRichText = (content: string, className: string) => {
    if (!content) {
      return <p className={className}> </p>;
    }

    const blocks = content
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);

    return blocks.map((block, index) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const isList = lines.every((line) => line.startsWith("- "));
      const isHeading = lines.length === 1 && lines[0].startsWith("## ");

      if (isList) {
        return (
          <ul className={`${className} project-detail-list`} key={`${className}-${index}`}>
            {lines.map((line) => (
              <li key={line}>{renderInlineContent(line.slice(2), `${className}-${index}-${line}`)}</li>
            ))}
          </ul>
        );
      }

      if (isHeading) {
        return (
          <h4 className="project-rich-heading" key={`${className}-${index}`}>
            {renderInlineContent(lines[0].slice(3), `${className}-${index}`)}
          </h4>
        );
      }

      return (
        <p className={className} key={`${className}-${index}`}>
          {renderInlineContent(block, `${className}-${index}`)}
        </p>
      );
    });
  };

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      },
    );
  }, [project.title]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape, { capture: true });

    return () => window.removeEventListener("keydown", handleEscape, { capture: true });
  }, [onClose]);

  return (
    <div className="project-modal-overlay" role="presentation" onClick={onClose}>
      <div className="project-modal-shell">
        <div
          ref={cardRef}
          className={cardClassName}
          onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="project-detail-close"
            onClick={onClose}
            aria-label={`Close ${project.title} detail view`}>
            x
          </button>
          {isPhotographyProject ? (
            <div className="project-detail-gallery">
              {packedGallery.map((image, index) => (
                (() => {
                  const metaItems = [
                    image.focalLength,
                    image.aperture,
                    image.shutterSpeed,
                    image.iso,
                  ].filter((item): item is string => Boolean(item));

                  return (
                    <figure
                      className={`project-detail-gallery-item project-detail-gallery-item-span-${image.columnSpan}`}
                      key={`${image.src}-${index}`}>
                      <ProjectImageAsset
                        className={`${imageClassName} project-detail-image-${image.orientation || "portrait"}`}
                        alt={image.alt || `${project.title} frame ${index + 1}`}
                        sizes={image.columnSpan === 2 ? "(max-width: 1280px) 92vw, 52vw" : "(max-width: 1280px) 44vw, 24vw"}
                        src={image.src}
                        preload={index < 2}
                        width={image.width}
                        height={image.height}
                      />
                      <div className="project-detail-gallery-meta project-detail-gallery-meta-overlay">
                        {(metaItems.length ? metaItems : ["EXIF unavailable"]).map((item) => (
                          <span key={`${image.src}-${item}`}>{item}</span>
                        ))}
                      </div>
                    </figure>
                  );
                })()
              ))}
            </div>
          ) : !isBlogProject && project.image && (
            <ProjectImageAsset
              className={imageClassName}
              alt={`${project.title} preview`}
              height={project.imageHeight}
              preload
              sizes="(max-width: 768px) 92vw, 640px"
              src={project.image}
              width={project.imageWidth}
            />
          )}
          <div className={bodyClassName}>
            <div className="project-detail-header">
              {isPhotographyProject && project.image && (
                <ProjectImageAsset
                  className="project-detail-hero-image"
                  alt={`${project.title} banner`}
                  height={project.imageHeight}
                  preload
                  sizes="(max-width: 1280px) 92vw, 420px"
                  src={project.image}
                  width={project.imageWidth}
                />
              )}
              {isBlogProject && (
                <>
                  {project.image && (
                    <div className="project-detail-blog-image-frame">
                      <ProjectImageAsset
                        className="project-detail-hero-image project-detail-hero-image-blog"
                        alt={`${project.title} banner`}
                        height={project.imageHeight}
                        preload
                        sizes="(max-width: 980px) 92vw, 900px"
                        src={project.image}
                        width={project.imageWidth}
                      />
                      {project.imageNote && (
                        <div className="project-detail-blog-image-note">📍 {project.imageNote}</div>
                      )}
                    </div>
                  )}
                </>
              )}
              <p className="project-detail-date">{project.date}</p>
              <h3 className="project-detail-title">{project.title}</h3>
              {!isBlogProject && renderRichText(summary, summaryClassName)}
            </div>
            {isBlogProject ? (
              <>
                <section className={`project-detail-blog-intro${blogGallery.length === 0 ? " project-detail-blog-intro-single" : ""}`}>
                  <div className="project-detail-blog-copy">
                    {renderRichText(summary, summaryClassName)}
                    {detailBlocks.slice(0, 2).map((block, index) => (
                      <p className={detailsClassName} key={`blog-intro-${index}`}>
                        {block}
                      </p>
                    ))}
                  </div>
                  <div className="project-detail-blog-collage">
                    {blogGallery.map((image, index) => (
                      <BlogImageFrame
                        key={`blog-collage-top-${index}`}
                        image={image}
                        className="project-detail-blog-collage-image"
                        sizes="(max-width: 980px) 44vw, 260px"
                      />
                    ))}
                  </div>
                </section>
                <div className={infoBoxClassName}>
                  {isScubaProject && (
                    <>
                      <p className={infoLabelClassName}>Dive Log</p>
                      <h4 className="project-detail-blog-pull-title">Below The Surface</h4>
                    </>
                  )}
                  {detailBlocks.slice(2).map((block, index) => (
                    <p className={detailsClassName} key={`blog-body-${index}`}>
                      {block}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div className={infoBoxClassName}>
                {isPhotographyProject && (
                  <p className={infoLabelClassName}>Behind The Lens</p>
                )}
                {renderRichText(details, detailsClassName)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedProjectCard;
