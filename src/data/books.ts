import { Book } from "@/types";

export const initialBooks: Book[] = [
  {
    id: "engaging-babylon",
    slug: "engaging-babylon",
    title: "Engaging Babylon",
    subtitle:
      "Navigating Faith, Success and Influence in an Increasingly Godless World",
    author: "Evangelist Tolucci",
    coverImage: "/images/eb web.png",
    description:
      "As the world draws closer to its end, the perilous times the Apostle Paul warned of in 2 Timothy 3:1 will become increasingly brazen and glaring, as the lines between sacredness and impunity grow ever more blurred. Engaging Babylon was born from a deep burden in my heart: to sensitise young believers to the subtle yet formidable godless systems and ideologies cleverly woven into the pursuit of success, influence, relevance, and societal advancement. It is a call to awaken believers to the realities of the world they are called to engage, while equipping them with the biblical wisdom and spiritual discernment necessary to navigate its intricacies and complexities without compromising their allegiance to Christ.",
    centralThemes: [
      "Discerning godless systems and ideologies",
      "Engaging society with biblical wisdom",
      "Pursuing success and influence without compromise",
    ],
    targetAudience:
      "Young believers seeking to engage the world around them while remaining faithful to Christ.",
    keyTakeaways: [
      "Recognise subtle godless systems and ideologies in the pursuit of success and influence.",
      "Engage the realities of the world with biblical wisdom and spiritual discernment.",
      "Navigate societal advancement without compromising allegiance to Christ.",
    ],
    purchaseLinks: [
      { label: "Buy on Selar", url: "https://selar.com/2950qg707c" },
      {
        label: "Buy on Amazon Kindle",
        url: "https://www.amazon.com/ENGAGING-BABYLON-TOLULOPE-TOLUWASE-ebook/dp/B0HKTSZQL9",
      },
    ],
    formats: {
      ebook: {
        available: true,
        buyUrl:
          "https://www.amazon.com/ENGAGING-BABYLON-TOLULOPE-TOLUWASE-ebook/dp/B0HKTSZQL9",
      },
    },
    pages: 57,
    publishedYear: 2026,
  },
];
