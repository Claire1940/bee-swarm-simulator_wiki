"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock,
  Coins,
  Compass,
  Copy,
  Crown,
  Droplet,
  ExternalLink,
  Flame,
  FlaskConical,
  Gift,
  Hammer,
  Heart,
  Home,
  Layers,
  Lightbulb,
  MessageCircle,
  Package,
  PawPrint,
  RefreshCw,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Store,
  Sword,
  ToyBrick,
  TrendingUp,
  Trophy,
  Wand2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// 模块头部：眉头 chip + 图标 + 标题 + 介绍（统一 8 模块样式，避免重复）
function ModuleHeader({
  icon: Icon,
  eyebrow,
  title,
  intro,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-10 md:mb-14 scroll-reveal text-center">
      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-5 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
        <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-wide">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
        {intro}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

// 模块内部卡片图标的取色（统一主题色）
const cardIconWrap =
  "flex h-10 w-10 md:h-11 md:w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]";

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.bee-swarm-simulator.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Bee Swarm Simulator Wiki",
        description:
          "Complete Bee Swarm Simulator Wiki covering codes, bees, hive builds, quests, items, fields, events, stickers, and beginner guides for the Roblox bee collecting game.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Bee Swarm Simulator - Roblox Bee Collecting Game",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Bee Swarm Simulator Wiki",
        alternateName: "Bee Swarm Simulator",
        url: siteUrl,
        description:
          "Complete Bee Swarm Simulator Wiki resource hub for codes, bees, hive builds, quests, items, fields, events, and stickers",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Bee Swarm Simulator Wiki - Roblox Bee Collecting Game",
        },
        sameAs: [
          "https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator",
          "https://discord.com/invite/bee",
          "https://www.reddit.com/r/BeeSwarmSimulator/",
          "https://www.youtube.com/channel/UCKevc-tX3tpddHg6NbTjrPQ",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Bee Swarm Simulator",
        gamePlatform: ["PC", "Mac", "Mobile", "Roblox"],
        applicationCategory: "Game",
        genre: ["Simulation", "Adventure", "Collecting"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 6,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "0",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator",
        },
      },
      {
        "@type": "VideoObject",
        name: "Noob to Pro in Bee Swarm Simulator - The PERFECT START! (Episode 1)",
        description:
          "Bee Swarm Simulator gameplay showcase covering the perfect start: collecting pollen, hatching bees, completing bear quests, and building your first hive on Roblox.",
        uploadDate: "2025-08-09",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/dbzWAawMC-o",
        url: "https://www.youtube.com/watch?v=dbzWAawMC-o",
      },
    ],
  };

  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid 卡片 → section 锚点映射（8 张卡片一一对应 8 个模块）
  const toolsSectionIds = [
    "codes-and-rewards",
    "beginner-guide",
    "progression-and-gear-order",
    "bee-tier-list",
    "hive-builds-and-colors",
    "quests-and-bears-guide",
    "gamepasses-and-store-guide",
    "beesmas-events-and-trading",
  ];

  // 进度阶段图标（5 个，互不相同）
  const stageIcons: LucideIcon[] = [Sprout, Compass, Hammer, Wand2, Crown];
  // Hive 配置图标（4 个，互不相同）
  const buildIcons: LucideIcon[] = [Layers, Droplet, Flame, Sparkles];
  // Bear 任务图标（8 个，互不相同）
  const bearIcons: LucideIcon[] = [
    PawPrint,
    RefreshCw,
    Heart,
    Sword,
    FlaskConical,
    Sparkles,
    Bot,
    Gift,
  ];
  // 商店物品图标（8 个，互不相同）
  const storeIcons: LucideIcon[] = [
    PawPrint,
    Zap,
    Sprout,
    Heart,
    Coins,
    Package,
    ToyBrick,
    Shirt,
  ];

  const copyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
  };

  // tier 徽章配色（语义化 Tailwind 色，无硬编码 hex）
  const tierBadgeClass = (tier: string) => {
    const lower = tier.toLowerCase();
    if (tier === "S" || lower.includes("top"))
      return "bg-[hsl(var(--nav-theme)/0.15)] text-[hsl(var(--nav-theme-light))] border-[hsl(var(--nav-theme)/0.4)]";
    if (tier === "A" || lower.includes("strong"))
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (tier === "B" || lower.includes("blue"))
      return "bg-sky-500/10 text-sky-400 border-sky-500/30";
    if (tier === "C" || lower.includes("later"))
      return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    if (lower.includes("red"))
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    if (lower.includes("white"))
      return "bg-zinc-500/10 text-zinc-300 border-zinc-500/30";
    return "bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))] border-[hsl(var(--nav-theme)/0.3)]";
  };

  const codes = t.modules.codesAndRewards;
  const beginner = t.modules.bssBeginnerGuide;
  const progression = t.modules.progressionAndGearOrder;
  const tierList = t.modules.beeTierList;
  const hives = t.modules.hiveBuildsAndColors;
  const quests = t.modules.questsAndBearsGuide;
  const store = t.modules.gamepassesAndStoreGuide;
  const events = t.modules.beesmasEventsAndTrading;

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* ============ Hero Section ============ */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                          bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes-and-rewards")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* ============ Video Section ============ */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="dbzWAawMC-o"
              title="Noob to Pro in Bee Swarm Simulator - The PERFECT START! (Episode 1)"
            />
          </div>
        </div>
      </section>

      {/* ============ Tools Grid - 8 Navigation Cards ============ */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = toolsSectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center
                                group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先方形，桌面端横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ============ Latest Updates Section（保留，禁止删除）============ */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* ============ Module 1: Codes and Rewards ============ */}
      <section id="codes-and-rewards" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Gift}
            eyebrow={t.tools.cards[0].title}
            title={codes.title}
            intro={codes.intro}
          />
          {/* Active codes */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
            {codes.activeCodes.map((c: any, i: number) => (
              <div
                key={i}
                className="p-4 md:p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <button
                  onClick={() => copyCode(c.code)}
                  title="Click to copy"
                  className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.35)] font-mono text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {c.code}
                </button>
                <p className="text-sm text-muted-foreground">{c.reward}</p>
              </div>
            ))}
          </div>
          {/* How to Redeem */}
          <div className="scroll-reveal mb-8 p-5 md:p-6 bg-white/5 border border-border rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardCheck className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">How to Redeem</h3>
            </div>
            <ol className="space-y-3">
              {codes.redeemSteps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.15)] text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {/* DLC note */}
          <div className="scroll-reveal p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl mb-8">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
              <p className="text-sm md:text-base text-muted-foreground">
                {codes.dlcNote}
              </p>
            </div>
          </div>
          {/* Expired codes */}
          <div className="scroll-reveal">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Expired Codes
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {codes.expiredCodes.map((code: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-border text-xs font-mono text-muted-foreground line-through"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* ============ Module 2: Beginner Guide ============ */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={BookOpen}
            eyebrow={t.tools.cards[1].title}
            title={beginner.title}
            intro={beginner.intro}
          />
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {beginner.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-1.5">
                    {step.description}
                  </p>
                  <p className="text-xs md:text-sm text-[hsl(var(--nav-theme-light))] flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    {step.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Check className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {beginner.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ Module 3: Progression and Gear Order ============ */}
      <section
        id="progression-and-gear-order"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={TrendingUp}
            eyebrow={t.tools.cards[2].title}
            title={progression.title}
            intro={progression.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progression.stages.map((stage: any, index: number) => {
              const StageIcon = stageIcons[index % stageIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cardIconWrap}>
                      <StageIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold leading-tight">{stage.stage}</h3>
                      <span className="text-xs text-muted-foreground">
                        {stage.beeRange}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[hsl(var(--nav-theme-light))] font-medium mb-3">
                    {stage.goal}
                  </p>
                  <ul className="space-y-1.5 mb-3">
                    {stage.priorities.map((p: string, pi: number) => (
                      <li key={pi} className="flex items-start gap-2 text-sm">
                        <Star className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1.5">
                    {stage.tasks.map((task: string, ti: number) => (
                      <li key={ti} className="flex items-start gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Module 4: Bee Tier List ============ */}
      <section
        id="bee-tier-list"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Trophy}
            eyebrow={t.tools.cards[3].title}
            title={tierList.title}
            intro={tierList.intro}
          />
          <div className="scroll-reveal space-y-8">
            {tierList.groups.map((group: any, gi: number) => (
              <div key={gi}>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  {group.stage}
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {group.tiers.map((tier: any, ti: number) => (
                    <div
                      key={ti}
                      className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 bg-white/5 border border-border rounded-xl"
                    >
                      <span
                        className={`inline-flex items-center justify-center min-w-[3.5rem] px-3 py-1.5 rounded-lg text-sm font-bold border ${tierBadgeClass(
                          tier.tier,
                        )}`}
                      >
                        {tier.tier}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {tier.bees.map((bee: string, bi: number) => (
                            <span
                              key={bi}
                              className="px-2.5 py-1 rounded-md bg-white/5 border border-border text-xs md:text-sm"
                            >
                              {bee}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{tier.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* ============ Module 5: Hive Builds and Colors ============ */}
      <section
        id="hive-builds-and-colors"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Home}
            eyebrow={t.tools.cards[4].title}
            title={hives.title}
            intro={hives.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {hives.builds.map((build: any, index: number) => {
              const BuildIcon = buildIcons[index % buildIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cardIconWrap}>
                      <BuildIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg">{build.build}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-muted-foreground">
                        {build.stage}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {build.playstyle}
                  </p>
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Core Bees
                    </p>
                    <ul className="space-y-1">
                      {build.coreBees.map((bee: string, bi: number) => (
                        <li key={bi} className="flex items-start gap-2 text-sm">
                          <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{bee}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                      Gear Focus
                    </p>
                    <ul className="space-y-1">
                      {build.gearFocus.map((gear: string, gi: number) => (
                        <li key={gi} className="flex items-start gap-2 text-sm">
                          <Hammer className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{gear}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-[hsl(var(--nav-theme-light))]">
                    {build.bestFor}
                  </p>
                  {build.decisionNote && (
                    <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/60">
                      <Lightbulb className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground italic">{build.decisionNote}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Module 6: Quests and Bears Guide ============ */}
      <section
        id="quests-and-bears-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={ClipboardCheck}
            eyebrow={t.tools.cards[5].title}
            title={quests.title}
            intro={quests.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quests.bears.map((bear: any, index: number) => {
              const BearIcon = bearIcons[index % bearIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cardIconWrap}>
                      <BearIcon className="w-5 h-5" />
                    </span>
                    <h3 className="font-bold">{bear.name}</h3>
                  </div>
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-3">
                    {bear.priority}
                  </span>
                  <p className="text-sm font-medium mb-3">{bear.role}</p>
                  <ul className="space-y-1 mb-3">
                    {bear.focus.map((f: string, fi: number) => (
                      <li key={fi} className="flex items-start gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {bear.rewards.map((r: string, ri: number) => (
                      <span
                        key={ri}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-border text-xs text-muted-foreground"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  {bear.routeNote && (
                    <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/60">
                      <Lightbulb className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground italic">{bear.routeNote}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Module 7: Gamepasses and Store Guide ============ */}
      <section
        id="gamepasses-and-store-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={ShoppingBag}
            eyebrow={t.tools.cards[6].title}
            title={store.title}
            intro={store.intro}
          />
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.items.map((item: any, index: number) => {
              const ItemIcon = storeIcons[index % storeIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cardIconWrap}>
                      <ItemIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {item.type}
                      </span>
                      {item.storeArea && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Store className="w-3 h-3" />
                          {item.storeArea}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.what}
                  </p>
                  <p className="text-xs text-[hsl(var(--nav-theme-light))] font-medium mb-2">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Best for: </span>
                    {item.bestFor}
                  </p>
                  {item.buyingNote && (
                    <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/60">
                      <Lightbulb className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground italic">{item.buyingNote}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Module 8: Beesmas Events and Trading ============ */}
      <section
        id="beesmas-events-and-trading"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={CalendarDays}
            eyebrow={t.tools.cards[7].title}
            title={events.title}
            intro={events.intro}
          />
          <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6">
            {events.events.map((event: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.65rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.period}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{event.name}</h3>
                  <ul className="space-y-1 mb-3">
                    {event.content.map((c: string, ci: number) => (
                      <li key={ci} className="flex items-start gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {event.rewards.map((r: string, ri: number) => (
                      <span
                        key={ri}
                        className="px-2 py-0.5 rounded-md bg-[hsl(var(--nav-theme)/0.08)] border border-[hsl(var(--nav-theme)/0.25)] text-xs"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event.action}
                  </p>
                  <span className="inline-block text-xs px-2 py-0.5 rounded bg-white/5 border border-border text-muted-foreground">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ Section ============ */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* ============ CTA Section ============ */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ============ Footer ============ */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/bee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/BeeSwarmSimulator/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCKevc-tX3tpddHg6NbTjrPQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1.5"
                  >
                    {t.footer.roblox}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
