import { useEffect, useRef, useState } from "react"

const A = "/assets"
const sprite = `${A}/49bc9.png`

// Central map of link destinations. Every value is a placeholder "#" to be
// filled in later; real https:// links in the markup are left inline, not here.
export const links = {
  // Top bar
  topbar: {
    personal: "#",
  },
  // Primary nav labels
  nav: {
    mobilePlans: "https://www.yes.my/yes-postpaid-plans/",
    devices: "https://www.yes.my/devices/",
    broadband: "https://www.yes.my/yes-5g-broadband/",
    deals: "https://www.yes.my/yes-5g-advanced-deals/",
    whyYes: "https://www.yes.my/yes-5g-advanced/",
    help: "https://enterprisecrm.yes.my/docs/faq",
  },
  // Header MyYes account link
  myyes: "#",
  // Dark sub-nav labels still pointing at "#"
  subnav: {
    iPhone: "https://www.yes.my/iphone/",
    "5gAdvanced": "https://www.yes.my/yes-5g-advanced/",
    yesGaming: "https://www.cloudgaming.my",
    esim: "https://www.yes.my/e-sim/",
    roaming: "https://www.yes.my/roaming/",
  },
  // Hero campaign CTAs
  hero: {
    primaryCta: "#",
    offerTerms: "#",
  },
  // Connections: shortcut tiles + plan cards
  connections: {
    shortcut: {
      "MyYes App": "https://play.google.com/store/apps/details",
      "Switch to Yes": "https://www.yes.my/keep-your-number/",
      "Check Coverage": "https://www.yes.my/coverage/",
      Reload: "https://store.yes.my/pay-and-reload",
      "Track Order": "https://www.yes.my/trackorder/",
      "Verify Number(s)": "https://store.yes.my/whitelist-numbers",
      "Network Status": "https://www.yes.my/network-maintenance/",
    },
    plan: {
      Prepaid: "https://www.yes.my/yes-prepaid-plans/#prepaid-plans",
      Postpaid: "https://www.yes.my/yes-postpaid-plans/",
      "Home WiFi": "https://www.yes.my/yes-5g-broadband/",
      "Mobile WiFi": "https://www.yes.my/yes-5g-mobile-wifi/",
    },
  },
  // Deals: only the still-"#" link (View all deals)
  deals: {
    viewAll: "#",
  },
  // Devices section links
  devices: {
    shopAll: "https://www.yes.my/devices/",
    action: "#",
    planDetails: "#",
  },
  // Why Yes discover link
  whyYes: {
    discover: "#",
  },
  // Explore story cards
  explore: {
    story: {
      "5G Advanced": "https://www.yes.my/yes-5g-advanced/",
      "Yes Gaming": "https://www.cloudgaming.my",
      ILMUchat: "https://www.yes.my/ilmuchat/",
    },
  },
  // Support cards + Ask Sofia
  support: {
    card: {
      "Switch to Yes ↗": "https://www.yes.my/keep-your-number/",
      "Check Coverage ↗": "https://www.yes.my/coverage/",
      "MyYes App ↗": "https://play.google.com/store/apps/details",
      "Find a store ↗": "#",
      "FAQs ↗": "https://www.yes.my/support/store-locator/",
      "Ask Sofia ↗": "https://www.yes.my/support/offlinechat/",
    },
    askSofia: "https://www.yes.my/support/offlinechat/",
  },
  // Footer link groups (keyed by label) + app stores
  footer: {
    "Prepaid Plans": "https://www.yes.my/yes-prepaid-plans/",
    "Postpaid Plans": "#",
    "Broadband WiFi": "https://www.yes.my/yes-5g-broadband/",
    "Broadband MiFi": "#",
    eSIM: "#",
    "Switch to Yes": "https://www.yes.my/keep-your-number/",
    Roaming: "#",
    Dealers: "#",
    "Courier Partner – B2B": "#",
    "Courier Partner – B2C": "#",
    "Trade-In": "#",
    "Device Manuals": "#",
    Coverage: "#",
    "Speed Test": "#",
    "Track Order": "#",
    "Verify Number(s)": "#",
    "Network Status": "#",
    "About Us": "#",
    Newsroom: "#",
    "Terms & Conditions": "#",
    "Privacy Policy": "#",
    FAQ: "#",
    "Ask Sofia": "#",
    "Email Us": "#",
    "Visit Our Store": "#",
    app: {
      appStore: "#",
      googlePlay: "#",
      appGallery: "#",
    },
  },
  // Social links
  social: {
    facebook: "https://www.facebook.com/YesMalaysiaTelco",
    instagram: "https://www.instagram.com/yes.my/",
    youtube: "https://www.youtube.com/@Yes.Malaysia",
    x: "https://x.com/Yes_Telco",
    tiktok: "https://www.tiktok.com/@yes.malaysia",
  },
} as const

// Label -> href lookups for lists whose display labels differ from the keys
// above. Keeps the .map() rendering unchanged while providing a valid href.
const navLinks: Record<string, string> = {
  "Mobile Plans": links.nav.mobilePlans,
  Devices: links.nav.devices,
  Broadband: links.nav.broadband,
  Deals: links.nav.deals,
  "Why Yes": links.nav.whyYes,
  Help: links.nav.help,
}
const subnavLinks: Record<string, string> = {
  "iPhone ↗": links.subnav.iPhone,
  "5G Advanced ↗": links.subnav["5gAdvanced"],
  "Yes Gaming ↗": links.subnav.yesGaming,
  "eSIM ↗": links.subnav.esim,
  "Roaming ↗": links.subnav.roaming,
}
const shortcutLinks: Record<string, string> = links.connections.shortcut
const planLinks: Record<string, string> = links.connections.plan
const storyLinks: Record<string, string> = links.explore.story
const supportLinks: Record<string, string> = links.support.card
const { app: _footerApp, ...footerRest } = links.footer
const footerLinks: Record<string, string> = footerRest
const appStoreLinks: Record<string, string> = {
  "App Store ↗": links.footer.app.appStore,
  "Google Play ↗": links.footer.app.googlePlay,
  "AppGallery ↗": links.footer.app.appGallery,
}
const socialLinks: Record<string, string> = {
  "Facebook ↗": links.social.facebook,
  "Instagram ↗": links.social.instagram,
  "YouTube ↗": links.social.youtube,
  "X ↗": links.social.x,
  "TikTok ↗": links.social.tiktok,
}

type CropProps = {
  className?: string
  width: number
  height: number
  left: number
  top: number
  alt?: string
}

function Crop({
  className = "",
  width,
  height,
  left,
  top,
  alt = "",
}: CropProps) {
  return (
    <div className={`crop ${className}`}>
      <img alt={alt} src={sprite} style={{ width, height, left, top }} />
    </div>
  )
}

function Arrow() {
  return <img className="size-4" aria-hidden="true" src={`${A}/95f60.svg`} />
}

function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null)
  const [isOnScreen, setIsOnScreen] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.02 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, isOnScreen] as const
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(node)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`section-reveal ${revealed ? "is-revealed" : ""}`}
    >
      {children}
    </div>
  )
}

function Header() {
  return (
    <header className="bg-white text-[#211c35]">
      <div className="flex h-[34px] items-center justify-between bg-[#fff3f8] px-5 text-[12px] md:px-[72px]">
        <div className="flex gap-6">
          <a className="font-bold text-[#ff008a]" href={links.topbar.personal}>
            Personal
          </a>
          <a className="text-[#6d6477]" href="https://www.yes.my/business/">
            Business ↗
          </a>
        </div>
        <div className="flex gap-5">
          <a className="font-bold" href="https://www.yes.my">
            English
          </a>
          <a href="https://www.yes.my/ms/">BM</a>
          <a className="font-noto" href="https://www.yes.my/zh-hans/">
            中文
          </a>
        </div>
      </div>
      <div className="flex min-h-[84px] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-3 sm:flex-nowrap md:px-[72px]">
        <img
          className="h-[54px] w-[72px] object-contain"
          src={`${A}/8ea2c.png`}
          alt="Yes"
          width={72}
          height={54}
        />
        <nav className="scrollbar-none order-3 flex w-full items-center gap-8 overflow-x-auto whitespace-nowrap text-[14px] font-semibold sm:order-none sm:ml-auto sm:w-auto">
          {[
            "Mobile Plans",
            "Devices",
            "Broadband",
            "Deals",
            "Why Yes",
            "Help",
          ].map((item) => (
            <a key={item} href={navLinks[item]}>
              {item}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-6 sm:ml-0">
          <img
            className="size-6"
            src={`${A}/44791.svg`}
            alt="Search"
            width={24}
            height={24}
          />
          <a
            className="flex items-center gap-2 text-[14px] font-semibold"
            href={links.myyes}
          >
            <img
              className="size-5"
              src={`${A}/b774e.svg`}
              alt=""
              width={20}
              height={20}
            />{" "}
            MyYes
          </a>
        </div>
      </div>
      <div className="scrollbar-none flex h-[42px] items-center gap-8 overflow-x-auto bg-[#181a34] px-5 text-[12px] whitespace-nowrap md:px-[72px]">
        <span className="mr-auto text-[#c9c5db]">Yes, made simple.</span>
        {[
          "iPhone ↗",
          "5G Advanced ↗",
          "Yes Gaming ↗",
          "eSIM ↗",
          "Roaming ↗",
        ].map((item) => (
          <a className="text-white" key={item} href={subnavLinks[item]}>
            {item}
          </a>
        ))}
      </div>
    </header>
  )
}

type Campaign = {
  category: string
  title: string
  qualifier: string
  oldPrice?: string
  price: string
  suffix: string
  description: string
  benefits: [string, string][]
  ai: boolean
  action: string
  caption: string
  image: string
  artworkHeight: number
  artworkWidth: number
  artworkLeft: number
}

const campaigns: Campaign[] = [
  {
    category: "YES  /  iPhone Duo",
    title: "Pre-order iPhone Duo",
    qualifier: "FROM",
    price: "RM166",
    suffix: "/month",
    description: "Foldable. Posable. Standable.\nSo affordable. So many ways.",
    benefits: [
      ["Extra RM360 OFF", "So affordable. So many ways."],
      ["Pay up to 24M", "with Ryt Credit"],
      ["FREE case", "iPhone Duo case worth RM319"],
    ],
    ai: false,
    action: "Pre-order",
    caption: "iPhone Duo · Foldable. Posable. Standable.",
    image: "3bb75.png",
    artworkHeight: 396.68,
    artworkWidth: 1880,
    artworkLeft: -921,
  },
  {
    category: "YES  /  iPhone 18 Pro",
    title: "Own iPhone 18 Pro now",
    qualifier: "FROM ONLY",
    price: "RM65",
    suffix: "/month",
    description: "So affordable. So many ways.",
    benefits: [["Over RM5,000", "trade-in value"]],
    ai: true,
    action: "Buy now",
    caption: "iPhone 18 Pro · With Yes",
    image: "f1091.png",
    artworkHeight: 405.12,
    artworkWidth: 1920,
    artworkLeft: -941,
  },
  {
    category: "YES  /  AI POSTPAID",
    title: "Yes AI Postpaid",
    qualifier: "ONLY",
    oldPrice: "RM30",
    price: "RM20",
    suffix: "/month",
    description: "Start with 5G Advanced.\nStart with Malaysia’s AI.",
    benefits: [
      ["No upfront", "payment"],
      ["Uncapped", "5G Advanced"],
    ],
    ai: true,
    action: "Explore postpaid",
    caption: "Yes AI Postpaid · Uncapped 5G Advanced + ILMUchat PRO",
    image: "6260a.png",
    artworkHeight: 408.285,
    artworkWidth: 1935,
    artworkLeft: -901,
  },
  {
    category: "YES  /  MOBILE WIFI",
    title: "On-the-go WiFi",
    qualifier: "ONLY",
    price: "RM58",
    suffix: "/month",
    description: "PLAN + DEVICE",
    benefits: [
      ["Uncapped", "data & speed"],
      ["5G Advanced", "enabled"],
    ],
    ai: true,
    action: "Explore Mobile WiFi",
    caption: "Yes Mobile WiFi · Plan + device",
    image: "6cf6a.png",
    artworkHeight: 422,
    artworkWidth: 2000,
    artworkLeft: -971,
  },
  {
    category: "YES  /  HOME WIFI",
    title: "Fast WiFi for everyone at home",
    qualifier: "ONLY",
    price: "RM68",
    suffix: "/month",
    description: "Bring everyone’s connections together.",
    benefits: [],
    ai: true,
    action: "Explore Home WiFi",
    caption: "Yes Home WiFi · For everyone at home",
    image: "8d006.png",
    artworkHeight: 281.333,
    artworkWidth: 1333.333,
    artworkLeft: -647.67,
  },
  {
    category: "YES  /  PREPAID",
    title: "Get started with Yes Prepaid",
    qualifier: "YES PREPAID",
    price: "RM10",
    suffix: " for 20GB",
    description: "Your connection. Your possibilities.",
    benefits: [],
    ai: true,
    action: "Explore prepaid",
    caption: "Yes Prepaid · RM10 for 20GB",
    image: "cab0c.png",
    artworkHeight: 241.143,
    artworkWidth: 1142.857,
    artworkLeft: -435.29,
  },
]

function CampaignArtwork({ campaign }: { campaign: Campaign }) {
  return (
    <div
      className="campaign-artwork"
      style={{ aspectRatio: `600 / ${campaign.artworkHeight}` }}
    >
      <img
        alt={campaign.title}
        src={`${A}/${campaign.image}`}
        style={{
          width: `${(campaign.artworkWidth / 600) * 100}%`,
          left: `${(campaign.artworkLeft / 600) * 100}%`,
        }}
      />
    </div>
  )
}

function Hero({ motionPaused }: { motionPaused: boolean }) {
  const [activeCampaign, setActiveCampaign] = useState(0)
  const campaign = campaigns[activeCampaign]
  const [motionRef, isOnScreen] = useOnScreen<HTMLElement>()
  const motionRunning = isOnScreen && !motionPaused

  return (
    <section
      ref={motionRef}
      className={`hero decorative-motion relative min-h-[748px] overflow-hidden bg-[#17182f] text-white ${
        motionRunning ? "motion-running" : ""
      }`}
    >
      <img
        className="absolute inset-y-0 right-0 h-full w-[55%] object-cover"
        src={`${A}/2951c.png`}
        alt=""
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#17182f_0%,#17182f_43%,rgba(23,24,47,.3)_72%,rgba(23,24,47,0)_100%)]" />
      <img
        className="campaign-ribbon"
        src={`${A}/${activeCampaign === 2 ? "fe0c8.svg" : "b1a76.svg"}`}
        alt=""
      />
      <img
        className="campaign-petal campaign-petal-one"
        src={`${A}/${activeCampaign === 2 ? "eaedd.svg" : "a9a90.svg"}`}
        alt=""
      />
      <img
        className="campaign-petal campaign-petal-two"
        src={`${A}/${activeCampaign === 2 ? "eaedd.svg" : "a9a90.svg"}`}
        alt=""
      />
      <div className="relative flex justify-between px-5 pt-9 text-[12px] md:px-[72px]">
        <span className="font-semibold text-[#f9b7d7]">CONNECTED IN BLOOM</span>
        <span className="text-[#d1ccdf]">
          {String(activeCampaign + 1).padStart(2, "0")} / 06
        </span>
      </div>
      <div className="relative grid items-start gap-[58px] px-5 pb-24 pt-[42px] md:px-[72px] min-[1350px]:grid-cols-[590px_600px]">
        <div className="flex flex-col items-start gap-5">
          <p className="text-[13px] font-semibold text-[#f9b7d7]">
            {campaign.category}
          </p>
          <h2 className="text-[28px] leading-[1.15] font-semibold sm:text-[34px]">
            {campaign.title}
          </h2>
          <div className="space-y-1">
            <div className="flex items-baseline gap-3 text-[13px] font-semibold text-[#d1ccdf]">
              <span>{campaign.qualifier}</span>
              {campaign.oldPrice && (
                <span className="line-through">{campaign.oldPrice}</span>
              )}
            </div>
            <p className="leading-none">
              <span className="text-[64px] font-extrabold text-[#ff008a] sm:text-[82px] lg:text-[100px]">
                {campaign.price}
              </span>
              <span className="text-[20px] font-semibold sm:text-[24px]">
                {campaign.suffix}
              </span>
            </p>
          </div>
          <p className="max-w-[550px] whitespace-pre-line text-[17px] leading-[1.5] text-[#d1ccdf]">
            {campaign.description}
          </p>
          {campaign.benefits.length > 0 && (
            <div
              className={`grid w-full gap-6 py-2 ${
                campaign.benefits.length === 3 ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              {campaign.benefits.map(([title, detail]) => (
                <div key={title}>
                  <strong className="block text-[21px] leading-[1.2]">
                    {title}
                  </strong>
                  <span className="mt-1.5 block text-[13px] leading-[1.4] text-[#d1ccdf]">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          )}
          {campaign.ai && (
            <p className="flex items-center gap-2 text-[14px] font-semibold">
              <img className="size-[18px]" src={`${A}/4305f.svg`} alt="" />
              FREE ILMUchat PRO Malaysia&apos;s AI
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <a className="pill pink" href={links.hero.primaryCta}>
              {campaign.action}
              <img className="size-[17px]" src={`${A}/e42bd.svg`} alt="" />
            </a>
            <a
              className="text-[13px] text-[#d1ccdf] underline"
              href={links.hero.offerTerms}
            >
              T&amp;C apply. View offer details
            </a>
          </div>
        </div>
        <div
          className={`flex w-full max-w-[600px] flex-col items-center gap-3 ${
            activeCampaign >= 4 ? "pt-[104px]" : "pt-11"
          }`}
        >
          <CampaignArtwork campaign={campaign} />
          <p className="rounded-full bg-[#17182f]/80 px-3 py-1.5 text-center text-[12px]">
            {campaign.caption}
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[30px] left-5 flex items-center gap-2.5 md:left-[72px]"
        aria-label="Campaigns"
      >
        {campaigns.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`h-1 rounded-full ${
              index === activeCampaign
                ? "w-[42px] bg-[#ff008a]"
                : "w-1.5 bg-[#d1ccdf]"
            }`}
            onClick={() => setActiveCampaign(index)}
            aria-pressed={index === activeCampaign}
            aria-label={`Show campaign ${index + 1}: ${item.title}`}
          />
        ))}
      </div>
    </section>
  )
}

const shortcuts = [
  ["d50a4.svg", "MyYes App"],
  ["ce961.svg", "Switch to Yes"],
  ["23833.svg", "Check Coverage"],
  ["bfa73.svg", "Reload"],
  ["445b7.svg", "Track Order"],
  ["1adda.svg", "Verify Number(s)"],
  ["83ba1.svg", "Network Status"],
]
const plans = [
  [
    "30205.svg",
    "Prepaid",
    "Top up and go. Keep your mobile plan as flexible as your day.",
    "Explore Prepaid",
  ],
  [
    "62176.svg",
    "Postpaid",
    "A monthly mobile plan for everything you do, with or without a new phone.",
    "Explore Postpaid",
  ],
  [
    "bac40.svg",
    "Home WiFi",
    "Find a broadband connection for the people and devices at home.",
    "Explore Home WiFi",
  ],
  [
    "80d27.svg",
    "Mobile WiFi",
    "Stay connected on the move with portable broadband.",
    "Explore Mobile WiFi",
  ],
]

function Connections() {
  return (
    <>
      <div className="shortcut-grid grid grid-cols-2 gap-x-4 gap-y-7 border-b border-[#e5e7eb] bg-white px-5 py-[30px] sm:grid-cols-4 md:px-[72px] lg:grid-cols-7">
        {shortcuts.map(([icon, label]) => (
          <a
            className="min-w-0 text-center text-[12px] leading-tight"
            href={shortcutLinks[label]}
            key={label}
          >
            <span className="mx-auto mb-3 flex size-11 items-center justify-center rounded-xl bg-[#fce7ec]">
              <img
                className="size-6"
                src={`${A}/${icon}`}
                alt=""
                width={24}
                height={24}
                loading="lazy"
              />
            </span>
            {label}
          </a>
        ))}
      </div>
      <section className="connections-section section relative overflow-hidden bg-[#fff3f8]">
        <img
          className="connection-canopy absolute -right-5 -top-[120px] h-[540px] w-[510px] object-cover opacity-80"
          src={`${A}/893eb.png`}
          alt=""
        />
        <div className="connection-veil absolute inset-y-0 right-0 w-[45%] bg-gradient-to-r from-[#fff3f8] to-[#fff3f8]/20" />
        <div className="relative max-w-[760px]">
          <Eyebrow>A LITTLE HELP CHOOSING</Eyebrow>
          <h2 className="heading text-balance">Find your connection.</h2>
          <p className="subheading">
            Start with what you need. We’ll help you find your Yes.
          </p>
        </div>
        <div className="relative mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map(([icon, title, desc, link]) => (
            <article
              className="flex min-h-[252px] flex-col rounded-[20px] border border-[#e8dce6] bg-white p-[26px]"
              key={title}
            >
              <div className="flex justify-between">
                <img
                  className="size-[30px]"
                  src={`${A}/${icon}`}
                  alt=""
                  width={30}
                  height={30}
                  loading="lazy"
                />
                <img
                  className="size-5"
                  src={`${A}/75993.svg`}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </div>
              <h3 className="mt-6 text-[24px] font-semibold">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.5] text-[#6d6477]">
                {desc}
              </p>
              <a
                className="mt-auto flex items-center gap-2 pt-6 text-[14px] font-semibold text-[#ff008a]"
                href={planLinks[title]}
              >
                {link}
                <img
                  className="size-4"
                  src={`${A}/10168.svg`}
                  alt=""
                  width={16}
                  height={16}
                  loading="lazy"
                />
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3.5 text-[11px] font-bold text-[#ff008a]">{children}</p>
  )
}

const deals = [
  {
    label: "MOBILE + AI",
    title: "Yes AI Postpaid",
    price: "RM20/month",
    desc: "Your mobile plan meets Malaysia’s AI.",
    image: "deals-ai-postpaid.webp",
    imagePosition: "center 48%",
  },
  {
    label: "TRADE-IN",
    title: "Trade-in, move up.",
    price: "Over RM5,000",
    desc: "Trade-in value. Give your next phone a head start.",
    image: "deals-trade-in.webp",
    imagePosition: "center 61%",
  },
  {
    label: "PARTNER OFFER",
    title: "Exclusive with Ryt Bank",
    price: "Up to RM479 cashback",
    desc: "From RM306/month. Explore the Ryt Bank offer.",
    image: "deals-ryt-bank.webp",
    imagePosition: "center 58%",
  },
]

function Deals() {
  return (
    <section className="section relative overflow-hidden bg-[#181a34] text-white">
      <img
        className="absolute -right-16 -top-20 h-[1120px] w-[830px] object-cover"
        src={`${A}/893eb.png`}
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#181a34] via-[#181a34]/95 to-[#181a34]/40" />
      <div className="relative flex items-end justify-between gap-6">
        <div>
          <Eyebrow>GOOD THINGS, PICKED FOR YOU</Eyebrow>
          <h2 className="heading text-white">
            A little more Yes. A little less spend.
          </h2>
        </div>
        <a
          className="text-[14px] font-semibold text-[#f7afd1]"
          href={links.deals.viewAll}
        >
          View all deals &nbsp;
          <Arrow />
        </a>
      </div>
      <div className="relative mt-8 grid gap-5 lg:grid-cols-3">
        {deals.map((d) => (
          <article
            className="overflow-hidden rounded-[20px] bg-white text-[#211c35]"
            key={d.title}
          >
            <img
              className="h-[184px] w-full object-cover"
              src={`${A}/${d.image}`}
              style={{ objectPosition: d.imagePosition }}
              alt={d.title}
              loading="lazy"
            />
            <div className="space-y-3.5 p-[26px]">
              <p className="text-[10px] font-bold text-[#ff008a]">{d.label}</p>
              <h3 className="text-[24px] font-semibold">{d.title}</h3>
              <p className="text-[25px] text-[#ff008a]">{d.price}</p>
              <p className="min-h-[42px] text-[14px] leading-[1.5] text-[#6d6477]">
                {d.desc}
              </p>
              <a
                className="block text-[14px] font-semibold text-[#ff008a]"
                href="https://www.yes.my/yes-postpaid-plans/"
              >
                Explore offer &nbsp;↗
              </a>
              <p className="text-[11px] text-[#6d6477]">
                T&amp;Cs apply. View offer details.
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="relative mt-5 grid gap-5 lg:grid-cols-2">
        <article className="flex min-h-[215px] flex-col items-start gap-5 overflow-hidden rounded-[20px] bg-white p-7 text-[#211c35] sm:flex-row sm:items-center">
          <div className="flex-1 space-y-3">
            <h3 className="text-[25px] font-semibold">Latest 5G phones</h3>
            <p className="text-[26px] text-[#ff008a]">From RM0/month</p>
            <a
              className="block text-[14px] font-semibold text-[#ff008a]"
              href="https://www.yes.my/devices/"
            >
              Find your next phone &nbsp;↗
            </a>
            <p className="text-[11px] text-[#6d6477]">
              T&amp;Cs apply. View offer details.
            </p>
          </div>
          <img
            className="h-[180px] w-full rounded-xl object-cover object-[center_58%] sm:h-[142px] sm:w-[155px]"
            src={`${A}/deals-latest-phones.webp`}
            alt=""
            loading="lazy"
          />
        </article>
        <article className="flex min-h-[215px] flex-col items-start gap-6 overflow-hidden rounded-[20px] bg-[#fff3f8] p-7 text-[#211c35] sm:flex-row sm:items-center">
          <div className="flex-1 space-y-3">
            <h3 className="text-[25px] font-semibold">5G Advanced Home WiFi</h3>
            <p className="text-[14px] leading-[1.5] text-[#6d6477]">
              A connection for your home. Explore the latest broadband offer.
            </p>
            <a
              className="block text-[14px] font-semibold text-[#ff008a]"
              href="https://www.yes.my/yes-5g-broadband/"
            >
              Explore Home WiFi &nbsp;↗
            </a>
            <p className="text-[11px] text-[#6d6477]">
              View plans, offer details and T&amp;Cs.
            </p>
          </div>
          <img
            className="h-[180px] w-full rounded-xl object-cover sm:h-[142px] sm:w-[155px]"
            src={`${A}/deals-home-wifi.webp`}
            alt=""
            loading="lazy"
          />
        </article>
      </div>
    </section>
  )
}

const phones = [
  {
    brand: "Apple",
    name: "iPhone Duo",
    rrp: "RRP RM9,499",
    promo: "Comes with free gifts",
    price: "RM166",
    action: "Pre-order",
    crop: [1685.4, 3370.8, -187.1, -1447.8],
    box: "w-[179px]",
  },
  {
    brand: "Apple",
    name: "iPhone 18 Pro",
    rrp: "RRP RM5,499",
    promo: "Extra RM360 Off",
    price: "RM65",
    action: "Buy now",
    crop: [1562.5, 3125, -528.1, -1329.7],
    box: "w-[160px]",
  },
  {
    brand: "Apple",
    name: "iPhone 18 Pro Max",
    rrp: "RRP RM5,999",
    promo: "Extra RM360 Off",
    price: "RM77",
    action: "Buy now",
    crop: [1515.2, 3030.3, -840.9, -1287.9],
    box: "w-[157px]",
  },
  {
    brand: "Samsung",
    name: "Galaxy Z Flip 8",
    rrp: "RRP RM6,199",
    promo: "\u200b",
    price: "RM60",
    action: "Buy now",
    crop: [1515.2, 3030.3, -1212.1, -1289.4],
    box: "w-[99px]",
  },
]

function Devices() {
  return (
    <section className="section bg-[#fff3f8]">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Eyebrow>YOUR NEXT FAVOURITE THING</Eyebrow>
          <h2 className="heading">New phone. More possibilities.</h2>
          <p className="subheading">
            Meet the latest devices on Yes. Pick a phone, then find the plan
            that fits.
          </p>
        </div>
        <a
          className="hidden items-center gap-2 text-[14px] font-semibold text-[#ff008a] sm:flex"
          href={links.devices.shopAll}
        >
          Shop all devices
          <img
            className="size-[17px]"
            src={`${A}/e033d.svg`}
            alt=""
            width={17}
            height={17}
            loading="lazy"
          />
        </a>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {phones.map((p) => (
          <article
            className="overflow-hidden rounded-[20px] border border-[#e8dce6] bg-white"
            key={p.name}
          >
            <div className="flex h-[34px] items-center justify-center bg-[#181a34] text-[10px] text-white">
              5G Advanced-compatible
            </div>
            <div className="space-y-4 p-6">
              <div className="flex h-[200px] items-center justify-center">
                <Crop
                  className={`h-[150px] ${p.box}`}
                  width={p.crop[0]}
                  height={p.crop[1]}
                  left={p.crop[2]}
                  top={p.crop[3]}
                  alt={p.name}
                />
              </div>
              <div className="min-h-[108px] space-y-2">
                <p className="text-[12px] text-[#6d6477]">{p.brand}</p>
                <h3 className="text-[23px] leading-[1.15] font-medium">
                  {p.name}
                </h3>
                <p className="text-[13px] text-[#6d6477]">{p.rrp}</p>
              </div>
              <p className="flex h-[30px] items-center text-[12px] text-[#ff008a]">
                {p.promo}
              </p>
              <div>
                <p className="text-[12px] text-[#6d6477]">From</p>
                <p className="text-[32px] font-medium">
                  {p.price}
                  <span className="text-[12px] font-normal text-[#6d6477]">
                    {" "}
                    /month
                  </span>
                </p>
              </div>
              <a className="pill pink w-fit" href={links.devices.action}>
                {p.action}
                <img
                  className="size-4"
                  src={`${A}/d1a76.svg`}
                  alt=""
                  width={16}
                  height={16}
                  loading="lazy"
                />
              </a>
              <a
                className="block text-[11px] text-[#6d6477] underline"
                href={links.devices.planDetails}
              >
                View plan &amp; payment details
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 text-[12px] leading-[1.5] text-[#6d6477]">
        Monthly prices are shown separately from device RRP. See each device’s
        plan &amp; payment details and applicable terms.
      </p>
    </section>
  )
}

const benefits = [
  [
    "20648.svg",
    "Crisp and clear calls",
    "Stay close to the conversations that matter.",
  ],
  [
    "bf8a6.svg",
    "5G means ultra fast speeds",
    "More freedom to stream, share and get things done.",
  ],
  [
    "3ceda.svg",
    "We cut prices, not service",
    "Affordable plans, with service that matters.",
  ],
  [
    "6968d.svg",
    "Mobile data plans for all",
    "Because connectivity is a right, not a privilege.",
  ],
]

function WhyYes() {
  return (
    <section className="section relative overflow-hidden bg-[#101329] text-white">
      <img
        className="absolute inset-x-0 -top-[220px] h-[1080px] w-full object-cover"
        src={`${A}/baa3b.png`}
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#101329]/55 via-[#101329]/80 to-[#101329]" />
      <div className="relative flex items-end justify-between gap-6">
        <div>
          <Eyebrow>WHY YES</Eyebrow>
          <h2 className="heading text-white">
            Less holding back. More living.
          </h2>
        </div>
        <a
          className="text-[14px] font-semibold text-[#f7afd1]"
          href={links.whyYes.discover}
        >
          Discover why Yes &nbsp;↗
        </a>
      </div>
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet={`${A}/uncap-yourself-wide.webp`}
        />
        <img
          className="relative mt-8 w-full rounded-[20px] object-cover"
          src={`${A}/uncap-yourself-square.webp`}
          alt="Amelia Henderson — Uncap Yourself. No Data Cap, No Speed Cap."
          loading="lazy"
        />
      </picture>
      <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(([icon, title, desc]) => (
          <article
            className="rounded-[20px] border border-white/15 bg-[#25263f]/85 p-6"
            key={title}
          >
            <img
              className="size-7"
              src={`${A}/${icon}`}
              alt=""
              width={28}
              height={28}
              loading="lazy"
            />
            <h3 className="mt-[18px] min-h-12 text-[20px] leading-[1.2] font-semibold">
              {title}
            </h3>
            <p className="mt-[18px] text-[14px] leading-[1.5] text-[#c9c5db]">
              {desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

const stories = [
  [
    "d6a38.png",
    "THE NEXT CHAPTER",
    "5G Advanced",
    "Get to know 5G Advanced and explore what it means for your everyday connection.",
    "Explore 5G Advanced",
  ],
  [
    "af7b6.png",
    "MAKE TIME FOR PLAY",
    "Yes Gaming",
    "Step into the world of Yes Gaming. Find your next way to play.",
    "Discover Yes Gaming",
  ],
  [
    "12b6a.png",
    "A LITTLE HELP FROM AI",
    "ILMUchat",
    "Explore ILMUchat and the ILMUchat Pro benefit with selected Yes offers.",
    "Meet ILMUchat",
  ],
]

function Explore({ motionPaused }: { motionPaused: boolean }) {
  const [motionRef, isOnScreen] = useOnScreen<HTMLElement>()
  const motionRunning = isOnScreen && !motionPaused

  return (
    <section
      ref={motionRef}
      className={`section decorative-motion relative overflow-hidden bg-[#f1ebf7] ${
        motionRunning ? "motion-running" : ""
      }`}
    >
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-[.13]"
        src={`${A}/893eb.png`}
        alt=""
      />
      <div className="explore-petals" aria-hidden="true">
        {[
          "2c581.svg",
          "51b99.svg",
          "b13f7.svg",
          "f7b46.svg",
          "703a9.svg",
          "4c8e9.svg",
        ].map((petal) => (
          <img key={petal} src={`${A}/${petal}`} alt="" />
        ))}
      </div>
      <img
        className="relative mb-4 h-[15px] w-[92px]"
        src={`${A}/6598f.svg`}
        alt=""
        width={92}
        height={15}
        loading="lazy"
      />
      <div className="relative">
        <Eyebrow>GO BEYOND THE EVERYDAY</Eyebrow>
        <h2 className="heading">Explore more with Yes.</h2>
        <p className="subheading">
          A new connection can open up a whole new world.
        </p>
      </div>
      <div className="relative mt-8 grid gap-5 lg:grid-cols-3">
        {stories.map(([image, label, title, desc, link]) => (
          <article
            className="overflow-hidden rounded-[20px] bg-white"
            key={title}
          >
            <img
              className="h-[232px] w-full object-cover"
              src={`${A}/${image}`}
              alt={title}
              loading="lazy"
            />
            <div className="space-y-4 p-[26px]">
              <p className="text-[10px] font-bold text-[#ff008a]">{label}</p>
              <h3 className="text-[25px]">{title}</h3>
              <p className="min-h-[42px] text-[14px] leading-[1.5] text-[#6d6477]">
                {desc}
              </p>
              <a
                className="block text-w[14px] font-semibold text-[#ff008a]"
                href={storyLinks[title]}
              >
                {link} &nbsp;↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const support = [
  ["eb676.svg", "Switch to Yes ↗", "Keep your number. Start here."],
  ["6c464.svg", "Check Coverage ↗", "Find Yes in your area."],
  ["38639.svg", "MyYes App ↗", "Manage your account on the go."],
  ["4c8d6.svg", "Find a store ↗", "Let’s talk, in person."],
  ["c658a.svg", "FAQs ↗", "Find the answer you need."],
  ["a1fb9.svg", "Ask Sofia ↗", "A little help along the way."],
]

function Support() {
  return (
    <section className="section relative overflow-hidden bg-[#181a34] text-white">
      <img
        className="absolute inset-y-0 left-0 w-[600px] object-cover"
        src={`${A}/893eb.png`}
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#181a34]/80 to-[#181a34] lg:to-[60%]" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[350px_1fr] lg:gap-16">
        <div>
          <Eyebrow>HERE FOR YOU</Eyebrow>
          <h2 className="text-[44px] leading-[1.12]">
            Your next step,
            <br />
            made simple.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.5] text-[#c9c5db]">
            From your first question to your next connection. We’re here to
            help.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {support.map(([icon, title, desc]) => (
            <a
              className="support-card rounded-xl bg-white p-[22px] text-[#211c35]"
              href={supportLinks[title]}
              key={title}
            >
              <img
                className="size-6"
                src={`${A}/${icon}`}
                alt=""
                width={24}
                height={24}
                loading="lazy"
              />
              <strong className="mt-3 block text-[15px]">{title}</strong>
              <span className="mt-3 block text-[12px] leading-[1.5] text-[#6d6477]">
                {desc}
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="relative mt-7 flex justify-end">
        <a
          className="flex h-[38px] items-center gap-2 rounded-full bg-[#ff008a] px-4 text-[12px] font-semibold"
          href={links.support.askSofia}
        >
          <img
            className="size-[18px]"
            src={`${A}/180e5.svg`}
            alt=""
            width={18}
            height={18}
            loading="lazy"
          />
          Ask Sofia
        </a>
      </div>
    </section>
  )
}

const footerGroups = [
  [
    "Plans & Pricing",
    "Prepaid Plans",
    "Postpaid Plans",
    "Broadband WiFi",
    "Broadband MiFi",
    "eSIM",
  ],
  [
    "Explore",
    "Switch to Yes",
    "Roaming",
    "Dealers",
    "Courier Partner – B2B",
    "Courier Partner – B2C",
    "Trade-In",
  ],
  [
    "Tools",
    "Device Manuals",
    "Coverage",
    "Speed Test",
    "Track Order",
    "Verify Number(s)",
    "Network Status",
  ],
  ["Company", "About Us", "Newsroom", "Terms & Conditions", "Privacy Policy"],
  ["Help", "FAQ", "Ask Sofia", "Email Us", "Visit Our Store"],
]

function Footer() {
  return (
    <footer className="bg-[#101329] text-white">
      <div className="flex flex-col justify-between gap-8 border-y border-white/15 px-5 py-12 sm:flex-row sm:items-center md:px-[72px]">
        <div className="flex items-center gap-6">
          <img
            className="h-[66px] w-[88px] object-contain"
            src={`${A}/ea674.png`}
            alt="Yes"
            width={88}
            height={66}
          />
          <p className="text-[30px]">Yes, made simple.</p>
        </div>
        <div>
          <p className="mb-3.5 text-[12px]">Get the MyYes App</p>
          <div className="flex flex-wrap gap-2.5">
            {["App Store ↗", "Google Play ↗", "AppGallery ↗"].map((x) => (
              <a
                className="rounded-xl border border-white/25 px-4 py-3 text-[12px]"
                href={appStoreLinks[x]}
                key={x}
              >
                {x}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-10 px-5 py-11 sm:grid-cols-2 lg:grid-cols-5 md:px-[72px]">
        {footerGroups.map(([title, ...items]) => (
          <div key={title}>
            <h3 className="mb-[18px] text-[13px] font-semibold">{title}</h3>
            <div className="space-y-[18px] text-[12px] text-[#c9c5db]">
              {items.map((x) => (
                <a className="block" href={footerLinks[x]} key={x}>
                  {x}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8 px-5 pb-[42px] text-[12px] md:px-[72px] lg:flex-row lg:items-end">
        <div className="lg:w-[510px]">
          <p className="mb-4">Follow Yes</p>
          <div className="flex flex-wrap gap-5 text-[#c9c5db]">
            {["Facebook ↗", "Instagram ↗", "YouTube ↗", "X ↗", "TikTok ↗"].map(
              (x) => (
                <a href={socialLinks[x]} key={x}>
                  {x}
                </a>
              ),
            )}
          </div>
        </div>
        <div className="text-[#c9c5db]">
          <p>
            For unresolved complaints, contact the Communications and Multimedia
            Consumer Forum of Malaysia (CFM).
          </p>
          <a className="mt-2.5 block text-white underline" href="https://consumerinfo.my">
            complaint.cfm.my ↗
          </a>
        </div>
      </div>
      <div className="flex min-h-[107px] flex-col items-start justify-between gap-4 bg-[#ff008a] px-5 py-4 sm:flex-row sm:items-center md:px-[72px]">
        <p className="text-[11px]">
          POWERED BY YTL, YTL Communications Sdn. Bhd. (793634-V)
        </p>
        <Crop
          className="h-[75px] w-[420px] max-w-full"
          width={1500}
          height={3000}
          left={-1032}
          top={-2914.5}
          alt="Payment and security certifications"
        />
      </div>
    </footer>
  )
}

export default function App() {
  const [motionPaused, setMotionPaused] = useState(false)

  return (
    <div
      className={`motion-ui min-h-screen overflow-x-hidden bg-white text-[#211c35] ${
        motionPaused ? "motion-paused" : ""
      }`}
    >
      <Header />
      <main>
        <Hero motionPaused={motionPaused} />
        <Reveal>
          <Connections />
        </Reveal>
        <Reveal>
          <Deals />
        </Reveal>
        <Reveal>
          <Devices />
        </Reveal>
        <Reveal>
          <WhyYes />
        </Reveal>
        <Reveal>
          <Explore motionPaused={motionPaused} />
        </Reveal>
        <Reveal>
          <Support />
        </Reveal>
      </main>
      <Footer />
      <button
        type="button"
        className="motion-toggle"
        aria-pressed={motionPaused}
        onClick={() => setMotionPaused((paused) => !paused)}
      >
        {motionPaused ? "Resume motion" : "Pause motion"}
      </button>
    </div>
  )
}
