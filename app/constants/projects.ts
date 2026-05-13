import { Project } from "../types";

const formatPhotoNumber = (value: number) => (
  Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "")
);

const formatFocalLength = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `${formatPhotoNumber(parsed)}mm` : undefined;
};

const formatAperture = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `f/${formatPhotoNumber(parsed)}` : undefined;
};

const formatShutterSpeed = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  if (parsed >= 1) {
    return `${formatPhotoNumber(parsed)}s`;
  }

  return `1/${Math.max(1, Math.round(1 / parsed))}s`;
};

const formatIso = (value?: string) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `ISO ${formatPhotoNumber(parsed)}` : undefined;
};

const getOrientation = (width: number, height: number) => {
  if (width === height) return "square" as const;
  return width > height ? "landscape" as const : "portrait" as const;
};

const getNextMonthLabel = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return nextMonth.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const photographyGalleryFiles = [
  {
    file: "DSC00066.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "168",
    aperture: "6.3",
    shutterSpeed: "0.04",
    iso: "2500",
  },
  {
    file: "DSC00206.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "93",
    aperture: "5.6",
    shutterSpeed: "0.005",
    iso: "500",
  },
  {
    file: "DSC00267.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "55",
    aperture: "4.5",
    shutterSpeed: "0.005",
    iso: "400",
  },
  {
    file: "DSC00727.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "180",
    aperture: "6.3",
    shutterSpeed: "0.06666666666666667",
    iso: "320",
  },
  {
    file: "DSC00927.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "9",
    aperture: "2.8",
    shutterSpeed: "0.03333333333333333",
    iso: "1000",
  },
  {
    file: "DSC01201.jpeg",
    width: 6192,
    height: 4128,
    focalLength: "9",
    aperture: "2.8",
    shutterSpeed: "0.00125",
    iso: "100",
  },
  {
    file: "DSC01530.jpeg",
    width: 6192,
    height: 4128,
    focalLength: "9",
    aperture: "2.8",
    shutterSpeed: "0.1",
    iso: "320",
  },
  {
    file: "DSC01594.jpeg",
    width: 6192,
    height: 4128,
    focalLength: "9",
    aperture: "2.8",
    shutterSpeed: "0.25",
    iso: "125",
  },
  {
    file: "DSC03076.jpeg",
    width: 6192,
    height: 4128,
    focalLength: "62",
    aperture: "5",
    shutterSpeed: "0.00625",
    iso: "100",
  },
  {
    file: "DSC03680.jpeg",
    width: 6192,
    height: 4128,
    focalLength: "9",
    aperture: "16",
    shutterSpeed: "0.01666666666666667",
    iso: "400",
  },
  {
    file: "DSC03757.JPG",
    width: 6192,
    height: 4128,
    focalLength: "55",
    aperture: "16",
    shutterSpeed: "0.003125",
    iso: "100",
  },
  {
    file: "DSC04083.JPG",
    width: 6192,
    height: 4128,
    focalLength: "90",
    aperture: "9",
    shutterSpeed: "0.0008",
    iso: "500",
  },
  {
    file: "DSC05023.JPG",
    width: 6192,
    height: 4128,
    focalLength: "55",
    aperture: "4.5",
    shutterSpeed: "0.0025",
    iso: "100",
  },
  {
    file: "DSC06914.JPG",
    width: 6192,
    height: 4128,
    focalLength: "70",
    aperture: "2.8",
    shutterSpeed: "0.0125",
    iso: "64",
  },
  {
    file: "DSC06925.JPG",
    width: 6192,
    height: 4128,
    focalLength: "27",
    aperture: "2.8",
    shutterSpeed: "0.0125",
    iso: "64",
  },
  {
    file: "DSC08059.jpeg",
    width: 6192,
    height: 4128,
    focalLength: "9",
    aperture: "4",
    shutterSpeed: "0.01666666666666667",
    iso: "100",
  },
  {
    file: "DSC08241.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "9",
    aperture: "3.2",
    shutterSpeed: "0.02",
    iso: "100",
  },
  {
    file: "DSC08377.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "9",
    aperture: "6.3",
    shutterSpeed: "0.00625",
    iso: "100",
  },
  {
    file: "DSC09984.jpeg",
    width: 4128,
    height: 6192,
    focalLength: "210",
    aperture: "6.3",
    shutterSpeed: "0.02",
    iso: "200",
  },
  {
    file: "full.png",
    width: 9000,
    height: 4128,
  },
  {
    file: "IMG_6618.JPG",
    width: 2780,
    height: 4170,
    focalLength: "9",
    aperture: "5",
    shutterSpeed: "0.01",
    iso: "100",
  },
  {
    file: "IMG_6621.JPG",
    width: 4128,
    height: 6192,
    focalLength: "120",
    aperture: "5.6",
    shutterSpeed: "0.01666666666666667",
    iso: "1000",
  },
  {
    file: "IMG_6622.JPG",
    width: 4128,
    height: 6192,
    focalLength: "198",
    aperture: "6.3",
    shutterSpeed: "0.00125",
    iso: "250",
  },
  {
    file: "IMG_6623.JPG",
    width: 6192,
    height: 4128,
    focalLength: "63",
    aperture: "5.6",
    shutterSpeed: "0.008",
    iso: "100",
  },
];

const photographyPreviewGallery = photographyGalleryFiles.map((image, index) => ({
  src: `/portfolio-photos/${image.file}`,
  alt: `A New Perspective frame ${index + 1}`,
  focalLength: formatFocalLength(image.focalLength),
  aperture: formatAperture(image.aperture),
  shutterSpeed: formatShutterSpeed(image.shutterSpeed),
  iso: formatIso(image.iso),
  orientation: getOrientation(image.width, image.height),
  width: image.width,
  height: image.height,
}));

const workExperienceGallery = [
  {
    src: '/portfolio-work-experience/IMG_3301.jpg',
    alt: 'Operating theatre procedure in progress',
    orientation: 'landscape' as const,
    width: 4032,
    height: 2268,
  },
];

const scubaBlogGallery = [
  {
    src: '/portfolio-scuba/DSC06739.JPG',
    alt: 'Scuba portfolio reef scene',
    orientation: 'landscape' as const,
    width: 6192,
    height: 4128,
  },
  {
    src: '/portfolio-scuba/P2219767.JPG',
    alt: 'Scuba portfolio underwater detail',
    orientation: 'landscape' as const,
    width: 4608,
    height: 3456,
  },
  {
    src: '/portfolio-scuba/stingray.jpg',
    alt: 'Scuba portfolio stingray',
    orientation: 'landscape' as const,
    width: 1920,
    height: 1080,
  },
];

const yesSirGallery = [
  {
    src: '/portfolio-yes-sir/IMG_9511.JPG',
    alt: 'Cadet kit laid out for inspection',
    orientation: 'landscape' as const,
    width: 4032,
    height: 3024,
  },
];

const horizonsGallery = [
  {
    src: '/portfolio-horizons/london.JPEG',
    alt: 'London city scene',
    note: 'London',
    orientation: 'landscape' as const,
    width: 4000,
    height: 3000,
  },
  {
    src: '/portfolio-horizons/vietnam2.jpeg',
    alt: 'Vietnam travel scene',
    note: 'Vietnam',
    orientation: 'landscape' as const,
    width: 3520,
    height: 1980,
  },
  {
    src: '/portfolio-horizons/rome2.JPG',
    alt: 'Rome street detail',
    note: 'Rome',
    orientation: 'landscape' as const,
    width: 4032,
    height: 3024,
  },
  {
    src: '/portfolio-horizons/germany.JPG',
    alt: 'Germany travel photograph',
    note: 'Germany',
    orientation: 'landscape' as const,
    width: 4032,
    height: 3024,
  },
  {
    src: '/portfolio-horizons/france.JPEG',
    alt: 'France city scene',
    note: 'France',
    orientation: 'landscape' as const,
    width: 4000,
    height: 3000,
  },
  {
    src: '/portfolio-horizons/vietnam.jpeg',
    alt: 'Vietnam street view',
    note: 'Vietnam',
    orientation: 'landscape' as const,
    width: 4032,
    height: 3024,
  },
  {
    src: '/portfolio-horizons/japan.JPG',
    alt: 'Japan travel image',
    note: 'Japan',
    orientation: 'landscape' as const,
    width: 1848,
    height: 1622,
  },
  {
    src: '/portfolio-horizons/venice.JPG',
    alt: 'Venice waterfront view',
    note: 'Venice',
    orientation: 'landscape' as const,
    width: 6192,
    height: 4128,
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'A New Perspective',
    date: 'Dec 2025',
    subtext: 'The Gear: Sony a6700',
    details: `Getting my first "real" camera changed how I look at, well, everything. Instead of just seeing a building or a tree, I started obsessing over how light hits a surface and why certain frames feel "right." It's been a lesson in slowing down and actually noticing the world. Plus, it turns out that when you understand shadows and composition, you can make even the most boring objects look like high art. It's my favorite way to stay creative and remind myself that everything looks different if you just change your lens.`,
    image: '/portfolio-photos/20251224_143100.jpeg',
    imageWidth: 4000,
    imageHeight: 2252,
    gallery: photographyPreviewGallery,
    variant: 'photography',
  },
  {
    title: 'Work Experience',
    date: 'Jul 2024',
    subtext: 'Clinical shadowing in specialized laparoscopic gastrointestinal surgery, spanning consultations, triage, and long days in theatre.',
    details: `Completed an intensive clinical shadowing program under Mr. Ian Michell (MBBS, FRACS), focusing on specialized laparoscopic gastrointestinal surgery. I gained immersive exposure to the entire patient lifecycle—from initial consultations to the high-stakes environment of the operating theater. This experience was a masterclass in clinical triage and cross-functional teamwork, providing a front-row seat to the 'glamour' of the surgical world: 5:00 AM starts, post-midnight finishes, and the discovery that 'lunch' is often just a theoretical concept. Beyond the technical observations of complex procedures, I developed a deep appreciation for surgical resilience and the art of maintaining peak precision when the coffee has long since worn off.`,
    image: '/portfolio-work-experience/IMG_3324.jpeg',
    imageWidth: 4032,
    imageHeight: 2268,
    gallery: workExperienceGallery,
    variant: 'blog',
  },
  {
    title: 'Piano Diplomacy',
    date: 'Nov 2024',
    subtext: 'The Achievement: AMusA Associate Diploma',
    details: `Ten years, thousands of hours, and a lot of "encouragement" from my mum (who had to drag me away from my iPad more times than I'd like to admit) finally paid off with my AMusA. But more than the diploma, piano taught me that "perfection" is overrated. The real magic happens in the interpretation - the space where there is no right or wrong, just how you feel the music. It's my ultimate grounding force and a reminder that the best things in life usually require a decade of discipline and a lot of patience.`,
    image: '/portfolio-piano-diplomacy/B2DADDB3-3336-44AB-A005-0AFB0B23B0DF.jpeg',
    imageWidth: 3320,
    imageHeight: 2656,
    variant: 'blog',
  },
//  {
//    title: 'Project 4',
//    date: 'May 2021',
//    subtext: 'A Discord Bot that sends alerts for COVID-19 vaccine availability based on PIN/district using public APIs.',
//    details: BLOG_PLACEHOLDER_DETAILS,
//    image: '/preview.jpg',
//    imageWidth: 5472,
//    imageHeight: 3648,
//    variant: 'blog',
//  },
  {
    title: 'And... Action!',
    date: 'Aug 2024',
    subtext: 'The Role: Producer, Lead, and Occasional Firefighter',
    details: `For my VCE media production, I decided that simply starring in a music video wasn't enough of a headache - so I produced it, too. I led a crew of eight, ranging from camera ops to backup dancers, which basically meant I spent my time balancing "creative vision" with the logistical reality of getting eight teenagers to show up at a venue on time. It was a crash course in leadership, choreography, and the art of keeping a team motivated when you're three hours into a shoot and everyone is hungry.`,
    image: '/portfolio-and-action/1BF5D1B6-220F-4FCF-913B-521A1A137609_1_105_c.jpeg',
    imageWidth: 1024,
    imageHeight: 768,
    variant: 'blog',
  },
  {
    title: '开阔眼界',
    date: 'ONGOING',
    subtext: 'Broadening my Horizons',
    details: `I've always been curious about how the world actually functions outside of a textbook or a news feed. For me, traveling isn't about checking off tourist spots; it's about "learning on the ground." I love the logistical puzzle of navigating a completely unfamiliar country - figuring out the local systems, the unwritten social rules, and the way people actually live when the cameras aren't on. It's a crash course in adaptability, realizing that the "right" way to do things changes the moment you cross a border. This first-hand immersion has only made me hungrier to explore more of the world, stay observant, and occasionally get a little lost in the interest of finding a better perspective.`,
    image: '/portfolio-horizons/vietnam2.jpeg',
    imageNote: 'Vietnam',
    imageWidth: 3520,
    imageHeight: 1980,
    gallery: horizonsGallery,
    variant: 'blog',
  },
  {
    title: 'Upcoming...',
    date: getNextMonthLabel(),
    subtext: '',
    details: '',
    image: '/preview.jpg',
    imageWidth: 5472,
    imageHeight: 3648,
    variant: 'blog',
  },
  {
    title: 'YES SIR',
    date: 'DEC 2025',
    subtext: 'The Rank: Corporal, Australian Army Cadets',
    details: `As a Corporal in the AAC, I learned that leadership is about 20% looking cool in uniform and 80% making sure no one gets lost in the bush. Working in Headquarters meant I was the one juggling multiple radio channels, tracking vehicle routes, and ensuring every cadet was accounted for. It was high-pressure, behind-the-scenes work that taught me how to stay calm when three different people are talking in your ear and the map doesn't match the ground. It's where I learned that a team is only as good as its communication.`,
    image: '/portfolio-yes-sir/IMG_5611.JPG',
    imageWidth: 2594,
    imageHeight: 3458,
    gallery: yesSirGallery,
    variant: 'blog',
  },
  {
    title: 'Scuba',
    date: 'Feb 2026',
    subtext: 'The Goal: Not Getting Eaten',
    details: `I've always been terrified of the ocean - the deep, dark, "what-just-touched-my-foot" unknown. So, naturally, I decided to dive right into it. Taking up scuba was about proving to myself that the unknown is always scarier in your head than it is in person. As a huge fan of our planet, seeing the hidden world beneath the waves firsthand was life-changing. It turns out the ocean isn't just a dark abyss; it's a beautiful, fragile ecosystem that's worth protecting - even if it still makes me a little nervous.`,
    image: '/portfolio-scuba/thumbnail.png',
    imageWidth: 1280,
    imageHeight: 720,
    gallery: scubaBlogGallery,
    variant: 'blog',
  },
  {
    title: 'MEC Startup Competition',
    date: 'Apr 2026',
    subtext: "The Idea: The 'Did I Close the Garage?' Solver",
    details: `Entering the MEC competition was my first real taste of the startup world, where there are no textbooks and definitely no answer keys. My team and I tackled a very specific brand of modern anxiety: the "I'm ten minutes away from home and I can't remember if I closed the garage door" feeling. We built a way for users to remotely monitor and control their garage, learning through a lot of trial, error, and mentor feedback. It was a wild introduction to entrepreneurship and the realization that the best products solve the problems that keep you up at night.`,
    image: '/portfolio-mec-startup-competition/mec-airwallex-ssc-final.jpg',
    imageWidth: 1920,
    imageHeight: 1080,
    variant: 'blog',
  },
];

export const PROJECT_PRELOAD_ASSET_URLS = [
  '/portfolio-photos/20251224_143100.jpeg',
  ...photographyPreviewGallery.map((image) => image.src),
  ...PROJECTS.flatMap((project) => {
    const assets: string[] = [];

    if (project.image) {
      assets.push(project.image);
    }

    if (project.gallery?.length) {
      assets.push(...project.gallery.map((image) => image.src));
    }

    return assets;
  }),
];

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const parseProjectDate = (date: string) => {
  const trimmedDate = date.trim();
  const yearOnlyMatch = trimmedDate.match(/^(\d{4})$/);

  if (yearOnlyMatch) {
    return Date.UTC(Number(yearOnlyMatch[1]), 0, 1);
  }

  const monthYearMatch = trimmedDate.match(/^([A-Za-z]{3,})\s+(\d{4})$/);

  if (monthYearMatch) {
    const month = MONTH_INDEX[monthYearMatch[1].slice(0, 3).toLowerCase()] ?? 0;
    const year = Number(monthYearMatch[2]);
    return Date.UTC(year, month, 1);
  }

  const parsedDate = Date.parse(trimmedDate);
  return Number.isNaN(parsedDate) ? Number.MAX_SAFE_INTEGER : parsedDate;
};

export const SORTED_PROJECTS = [...PROJECTS].sort((left, right) => {
  const dateDifference = parseProjectDate(left.date) - parseProjectDate(right.date);

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return left.title.localeCompare(right.title);
});
