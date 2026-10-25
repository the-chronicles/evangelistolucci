import { Sermon } from "@/types";

type SermonSource = Pick<
  Sermon,
  "slug" | "title" | "date" | "topic" | "description" | "duration" | "youtubeId"
> & {
  scriptureReferences?: string[];
};

function createSermon(source: SermonSource): Sermon {
  return {
    ...source,
    id: `youtube-${source.youtubeId}`,
    scriptureReferences: source.scriptureReferences ?? [],
    thumbnailUrl: `https://i.ytimg.com/vi/${source.youtubeId}/hqdefault.jpg`,
  };
}

export const initialSermons: Sermon[] = [
  createSermon({
    slug: "types-of-consecration",
    title: "Types of Consecration | Evangelist Tolucci | 12th Sept. 2026",
    date: "2026-09-24",
    topic: "Consecration",
    description: "Bi-monthly apostolic gathering of The MASS Movement.",
    duration: "3h 26m 24s",
    youtubeId: "BlucHquVsjs",
  }),
  createSermon({
    slug: "latter-rain-uk",
    title:
      "Latter Rain | United Kingdom | Evangelist Tolucci | 22nd August 2026",
    date: "2026-08-26",
    topic: "Revival",
    description:
      "Apostolic charge at the annual convergence of MASS Movement UK on Saturday 22nd August 2026 at Lifespring Conference Center, Wolverhampton, United Kingdom.",
    duration: "48m 8s",
    youtubeId: "q-pvPc9iDsw",
  }),
  createSermon({
    slug: "signs-of-the-times-part-2",
    title:
      "Signs of the Times Pt.2 | Evangelist Tolucci | 1st August, 2026 | New Teaching",
    date: "2026-08-11",
    topic: "Teaching",
    description: "Bi-monthly Apostolic gathering of MASS Movement.",
    duration: "2h 8m 37s",
    youtubeId: "71CE93O1xHU",
  }),
  createSermon({
    slug: "berith-covenant-systems-of-leverage",
    title:
      "BERITH - Covenant Systems of Leverage | Evangelist Tolucci | Lagos | July 2026",
    date: "2026-08-04",
    topic: "Teaching",
    description: "Activating covenant provisions for divine leverage.",
    duration: "2h 8m 8s",
    youtubeId: "F0GmA8XXIOw",
  }),
  createSermon({
    slug: "signs-of-the-times-part-1",
    title:
      "Signs Of The Times Pt.1 || Evangelist Tolucci || 18th July 2026 || New Teaching",
    date: "2026-07-23",
    topic: "Teaching",
    description: "Bi-monthly Apostolic gathering of MASS Movement.",
    duration: "2h 18m 43s",
    youtubeId: "-GsAwoDVBr4",
  }),
  createSermon({
    slug: "unlocking-divine-creativity",
    title:
      "Unlocking Divine Creativity | Evangelist Tolucci | May 31st 2026 | LAG",
    date: "2026-06-07",
    topic: "Teaching",
    description:
      "Debunking the creative myth. Dimensions and steps to unlocking divine creativity.",
    duration: "1h 53m 42s",
    youtubeId: "lYmavaXHzK0",
  }),
  createSermon({
    slug: "eden-part-2",
    title: "Eden 2 | Evangelist Tolucci | Lagos Apostolic Meeting | 03_05_2026",
    date: "2026-05-07",
    topic: "Teaching",
    description:
      "Continuation of the earlier teaching series on the template of EDEN at Lagos Apostolic Fellowship on 3rd May, 2026.",
    duration: "2h 12m 42s",
    youtubeId: "1-CyEbU2yGA",
  }),
  createSermon({
    slug: "eden-part-1",
    title: "EDEN 1 | Lagos Apostolic Gathering | 1st March 2026",
    date: "2026-03-29",
    topic: "Teaching",
    description: "Lagos Apostolic Gathering on 1st March 2026.",
    duration: "2h 0m 47s",
    youtubeId: "dIdiJP-JA0s",
  }),
  createSermon({
    slug: "five-dimensions-of-worship",
    title: "5 Dimensions of Worship - Evangelist Tolucci",
    date: "2026-02-16",
    topic: "Worship",
    description:
      "Teaching on 5 Dimensions of Worship at Pre-MRF Revival Vigils at Chapel of Resurrection, University of Ibadan.",
    duration: "33m 37s",
    youtubeId: "j0hUxY6biBY",
  }),
  createSermon({
    slug: "blueprint-part-2",
    title: "Blueprint (Part 2) | Teaching by Evangelist Tolucci",
    date: "2026-02-08",
    topic: "Teaching",
    description:
      "The second part of a teaching on identity and purpose at the Lagos Apostolic Meeting on 1st February, 2026.",
    duration: "1h 8m 54s",
    youtubeId: "DBI-z3Q0Oqw",
  }),
  createSermon({
    slug: "blueprint",
    title: "Blueprint | Teaching by Evangelist Tolucci",
    date: "2026-01-30",
    topic: "Teaching",
    description:
      "A teaching on identity and purpose at the Inaugural Volunteers meeting on Friday 16th January, 2026 at Chapel of Resurrection, University of Ibadan.",
    duration: "48m 15s",
    youtubeId: "RhL4BsM8_hI",
  }),
  createSermon({
    slug: "sentinels-part-3",
    title: "Sentinels 3 | Personal Gateways of Warfare | Evang. Tolucci",
    date: "2025-12-05",
    topic: "Prayer & Warfare",
    description:
      "Teaching on Battle At The Gates at MASS Apostolic Gathering on Saturday 15th November 2025.",
    duration: "3h 29m 41s",
    youtubeId: "VGiDBXa9xxI",
  }),
  createSermon({
    slug: "sentinels-part-1",
    title: "Sentinels 1 - Battle At The Gates - Evang.Tolucci",
    date: "2025-10-30",
    topic: "Prayer & Warfare",
    description:
      "Teaching on Battle At The Gates at MASS Apostolic Gathering on Saturday 27th September 2025.",
    duration: "3h 8m 57s",
    youtubeId: "C8bPeotTPVs",
  }),
  createSermon({
    slug: "sentinels-part-2",
    title: "Sentinels 2 - Civilizations & Atmospheres - Evang. Tolucci",
    date: "2025-10-12",
    topic: "Prayer & Warfare",
    description:
      "Teaching on Civilizations and Atmospheres at Sentinels: Battle at the Gates, the Mountain-Top Experience, on Wednesday 1st October 2025.",
    duration: "1h 27m 35s",
    youtubeId: "IBRy7wAiuOQ",
  }),
  createSermon({
    slug: "understanding-priesthood",
    title: "MAG | Understanding Priesthood | Evangelist Tolucci | July 2025",
    date: "2025-07-23",
    topic: "Discipleship",
    description:
      "Apostolic convergence of the MASS Movement Kings and Priests for July 2025, held on 19th July 2025.",
    duration: "2h 56m 28s",
    youtubeId: "3nMy98npJmE",
  }),
  createSermon({
    slug: "unplug-necessary-separations",
    title:
      "MAG | UNPLUG - Necessary Separations Unto Destiny | Evangelist Tolucci | May 2025",
    date: "2025-06-08",
    topic: "Discipleship",
    description:
      "Apostolic convergence of the MASS Movement Kings and Priests for May 2025, held on 31st May 2025.",
    duration: "2h 26m 36s",
    youtubeId: "V6HQo_LvhA4",
  }),
  createSermon({
    slug: "apostolic-charge-night-of-flight",
    title: "Apostolic Charge | Night of Flight 2024 | United Kingdom",
    date: "2025-05-12",
    topic: "Revival",
    description:
      "Charge from Acts 8:1-4 by Evangelist Tolucci at Night of Flight 2024 at All Nations, Wolverhampton, United Kingdom.",
    duration: "14m 17s",
    youtubeId: "QI7YrR341fM",
    scriptureReferences: ["Acts 8:1-4"],
  }),
  createSermon({
    slug: "transfer-window",
    title:
      "TRANSFER WINDOW | Navigating Prophetic Pathway to Receiving Generational Mantles",
    date: "2024-11-22",
    topic: "Teaching",
    description:
      "A prophetic teaching at the Operation WildFire Prayer Rally in Ibadan on Saturday 2nd November 2024.",
    duration: "2h 55m 27s",
    youtubeId: "qFuqIsqp4ig",
  }),
  createSermon({
    slug: "aq-understanding-adversity",
    title: "AQ - Teaching by Evang. Tolu'Toluwase (Tolucci)",
    date: "2024-10-31",
    topic: "Teaching",
    description:
      "A biblical study on understanding adversity, purpose, and the response of every believer at MASS Revival Community in Lagos.",
    duration: "4h 8m 44s",
    youtubeId: "c0k8mf0NVq0",
  }),
  createSermon({
    slug: "angelos-biblical-study",
    title: "ANGELOS (Teaching) - Evang. Tolucci",
    date: "2024-10-09",
    topic: "Teaching",
    description:
      "A biblical study on the description, classification, activation, and general ministry of angels at MASS Revival Community in Lagos.",
    duration: "3h 3m 5s",
    youtubeId: "X2aK7MLPUkA",
  }),
];
