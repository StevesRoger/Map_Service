import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Route,
  Search,
  Map,
  Zap,
  Shield,
  Code,
  Clock,
  ArrowRight,
  CheckCircle2,
  Globe,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  BarChart3,
  Check,
  ChevronUp,
  Menu,
  X,
  Eye,
  Download,
  DollarSign,
  Navigation,
  Calendar as CalendarIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "./LanguageContext";
import { apiServiceManager } from "../services/apiService";
import type { PricingTier } from "../types/api";

// ============================================================================
// Types & Constants
// ============================================================================

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

interface Benefit {
  text: string;
  icon: LucideIcon;
}

interface BenefitCard {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
}

interface UsageTier {
  requests: number;
  label: string;
  description: string;
}

interface APIEndpoint {
  name: string;
  path: string;
  method: string;
  description: string;
  category: string;
  price: number;
}

// Usage tier configuration (translations accessed in component)
const USAGE_TIER_CONFIG = [
  {
    requests: 10000,
    label: "10K",
    descKey: "smallProjects" as const,
  },
  {
    requests: 100000,
    label: "100K",
    descKey: "growingBusiness" as const,
  },
  {
    requests: 1000000,
    label: "1M",
    descKey: "enterpriseScale" as const,
  },
];

// Feature icons and styling (translations accessed in component)
const FEATURE_CONFIG = [
  {
    icon: MapPin,
    titleKey: "feature1Title" as const,
    descKey: "feature1Desc" as const,
    color: "bg-blue-500/10 text-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Route,
    titleKey: "feature2Title" as const,
    descKey: "feature2Desc" as const,
    color: "bg-green-500/10 text-green-500",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Search,
    titleKey: "feature3Title" as const,
    descKey: "feature3Desc" as const,
    color: "bg-purple-500/10 text-purple-500",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Map,
    titleKey: "feature4Title" as const,
    descKey: "feature4Desc" as const,
    color: "bg-orange-500/10 text-orange-500",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

// Benefit keys (translations accessed in component)
const BENEFIT_KEYS = [
  "benefit1" as const,
  "benefit2" as const,
  "benefit3" as const,
  "benefit4" as const,
  "benefit5" as const,
  "benefit6" as const,
];

// Benefit card config (translations accessed in component)
const BENEFIT_CARD_CONFIG = [
  {
    icon: Zap,
    color: "blue",
    titleKey: "benefitCard1Title" as const,
    descKey: "benefitCard1Desc" as const,
  },
  {
    icon: Shield,
    color: "green",
    titleKey: "benefitCard2Title" as const,
    descKey: "benefitCard2Desc" as const,
  },
  {
    icon: Code,
    color: "purple",
    titleKey: "benefitCard3Title" as const,
    descKey: "benefitCard3Desc" as const,
  },
];

// API endpoint configuration (translations accessed in component)
const API_ENDPOINT_CONFIG = [
  {
    nameKey: "geocodeEndpoint" as const,
    descKey: "geocodeDesc" as const,
    path: "/api/v1/geocode",
    method: "GET",
    category: "geocoding",
    price: 0.005,
  },
  {
    nameKey: "reverseGeocodeEndpoint" as const,
    descKey: "reverseGeocodeDesc" as const,
    path: "/api/v1/reverse-geocode",
    method: "GET",
    category: "geocoding",
    price: 0.005,
  },
  {
    nameKey: "placeSearchEndpoint" as const,
    descKey: "placeSearchDesc" as const,
    path: "/api/v1/places/search",
    method: "GET",
    category: "places",
    price: 0.017,
  },
  {
    nameKey: "placeDetailsEndpoint" as const,
    descKey: "placeDetailsDesc" as const,
    path: "/api/v1/places/details",
    method: "GET",
    category: "places",
    price: 0.017,
  },
  {
    nameKey: "nearbySearchEndpoint" as const,
    descKey: "nearbySearchDesc" as const,
    path: "/api/v1/places/nearby",
    method: "GET",
    category: "places",
    price: 0.017,
  },
  {
    nameKey: "directionsEndpoint" as const,
    descKey: "directionsDesc" as const,
    path: "/api/v1/directions",
    method: "GET",
    category: "routing",
    price: 0.005,
  },
  {
    nameKey: "distanceMatrixEndpoint" as const,
    descKey: "distanceMatrixDesc" as const,
    path: "/api/v1/distance-matrix",
    method: "GET",
    category: "routing",
    price: 0.01,
  },
  {
    nameKey: "staticMapEndpoint" as const,
    descKey: "staticMapDesc" as const,
    path: "/api/v1/maps/static",
    method: "GET",
    category: "maps",
    price: 0.002,
  },
  {
    nameKey: "tileServerEndpoint" as const,
    descKey: "tileServerDesc" as const,
    path: "/api/v1/maps/tiles/{z}/{x}/{y}",
    method: "GET",
    category: "maps",
    price: 0.002,
  },
];

const API_CATEGORIES = ["geocoding", "places", "routing", "maps"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  geocoding: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  routing: "bg-green-500/10 text-green-400 border-green-500/30",
  places: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  maps: "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

// ============================================================================
// Reusable Components
// ============================================================================

/** Simple code block display component */
const CodeBlockSimple = memo(({ code }: { code: string }) => (
  <pre className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-4 rounded text-sm text-zinc-300 overflow-x-auto">
    <code>{code}</code>
  </pre>
));
CodeBlockSimple.displayName = "CodeBlockSimple";

/** Animated background grid - simplified on mobile */
const AnimatedGrid = memo(
  ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => (
    <div className="fixed inset-0 opacity-20 pointer-events-none">
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(27,91,165,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(27,91,165,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"
        style={{
          transform: `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)`,
        }}
      />
    </div>
  )
);
AnimatedGrid.displayName = "AnimatedGrid";

/** Floating gradient orbs background - hidden on mobile for performance */
const FloatingOrbs = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block">
    <motion.div
      className="absolute top-0 right-0 w-96 h-96 bg-[#1b5ba5] rounded-full blur-3xl opacity-20"
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10"
      animate={{
        x: [0, -100, 0],
        y: [0, 50, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"
      animate={{
        x: [0, 50, 0],
        y: [0, -100, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
));
FloatingOrbs.displayName = "FloatingOrbs";

/** Floating map elements for hero section - reduced on mobile */
const FloatingMapElements = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 md:opacity-100">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute hidden md:block"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + (i % 3) * 20}%`,
        }}
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      >
        {i % 3 === 0 ? (
          <MapPin className="w-8 h-8 text-[#1b5ba5]" />
        ) : i % 3 === 1 ? (
          <Globe className="w-8 h-8 text-cyan-500" />
        ) : (
          <Navigation className="w-8 h-8 text-purple-500" />
        )}
      </motion.div>
    ))}
  </div>
));
FloatingMapElements.displayName = "FloatingMapElements";

/** Feature card component - optimized animations */
const FeatureCard = memo(
  ({
    feature,
    index,
    fontClass,
  }: {
    feature: Feature;
    index: number;
    fontClass: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="md:hover:-translate-y-1 transition-transform duration-300"
    >
      <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 hover:border-[#1b5ba5]/50 transition-all duration-300 group relative overflow-hidden h-full">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block`}
        />
        <div className="relative z-10">
          <div
            className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 transition-transform md:group-hover:scale-110 md:group-hover:rotate-6 duration-300`}
          >
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className={`text-xl mb-2 ${fontClass}`}>{feature.title}</h3>
          <p className={`text-zinc-400 ${fontClass}`}>{feature.description}</p>
        </div>
      </Card>
    </motion.div>
  )
);
FeatureCard.displayName = "FeatureCard";

/** Benefit item component */
const BenefitItem = memo(
  ({
    benefit,
    index,
    fontClass,
  }: {
    benefit: Benefit;
    index: number;
    fontClass: string;
  }) => (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="w-5 h-5 rounded-full bg-[#1b5ba5]/20 flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-[#1b5ba5]" />
      </div>
      <span className={`text-zinc-300 ${fontClass}`}>{benefit.text}</span>
    </motion.div>
  )
);
BenefitItem.displayName = "BenefitItem";

/** Benefit card component - simplified mobile animations */
const BenefitCardItem = memo(
  ({
    item,
    index,
    fontClass,
  }: {
    item: BenefitCard;
    index: number;
    fontClass: string;
  }) => (
    <div className="md:hover:translate-x-1 transition-transform duration-300">
      <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 hover:border-[#1b5ba5]/50 transition-all">
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-lg bg-${item.color}-500/10 flex items-center justify-center flex-shrink-0`}
          >
            <item.icon className={`w-5 h-5 text-${item.color}-500`} />
          </div>
          <div>
            <h4 className={`text-lg mb-2 ${fontClass}`}>{item.title}</h4>
            <p className={`text-zinc-400 text-sm ${fontClass}`}>{item.desc}</p>
          </div>
        </div>
      </Card>
    </div>
  )
);
BenefitCardItem.displayName = "BenefitCardItem";

/** Pricing card component */
const PricingCard = memo(
  ({
    usage,
    index,
    isActive,
    fontClass,
    onGetStarted,
    t,
  }: {
    usage: UsageTier;
    index: number;
    isActive: boolean;
    fontClass: string;
    onGetStarted: () => void;
    t: any;
  }) => {
    const isPopular = index === 1;
    const roktenhCost = (usage.requests / 1000) * 4.0;
    const googleCost = roktenhCost * 2;
    const savings = googleCost - roktenhCost;
    const savingsPercent = 50;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex-shrink-0 w-[70vw] md:w-auto snap-center md:snap-align-none md:hover:-translate-y-2 transition-transform duration-300 overflow-visible"
        animate={{
          scale: isActive ? 1 : 0.85,
          opacity: isActive ? 1 : 0.6,
        }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <Card
          className={`p-8 h-full overflow-visible ${
            isPopular
              ? "bg-[#1b5ba5]/10 border-[#1b5ba5] shadow-lg shadow-[#1b5ba5]/20"
              : "bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm"
          } ${isActive ? "md:border-zinc-800/50" : ""} relative group`}
        >
          {isPopular && (
            <>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span
                  className={`bg-[#1b5ba5] text-white text-xs px-3 py-1 rounded-full ${fontClass}`}
                >
                  {t.landing.mostCommon}
                </span>
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#1b5ba5]/20 to-cyan-500/20 opacity-0 transition-opacity"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </>
          )}

          <div className="relative z-10">
            <div className="mb-6">
              <h3 className="text-2xl mb-2 font-en">{usage.label} Requests</h3>
              <p className={`text-zinc-400 text-sm ${fontClass}`}>
                {usage.description}
              </p>
              <p className="text-zinc-500 text-xs mt-1 font-en">per month</p>
            </div>

            <div className="mb-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400 font-en">
                  {t.landing.googleMaps}
                </span>
                <span className="text-lg line-through text-zinc-500 font-en">
                  ${googleCost.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#1b5ba5] font-en">
                  {t.landing.rokTenhMap}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl text-[#1b5ba5]">$</span>
                  <span className="text-4xl text-[#1b5ba5] font-en">
                    {roktenhCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400 font-en">
                  {t.landing.youSave}
                </span>
                <div className="text-right">
                  <div className="text-2xl text-green-400 font-en">
                    ${savings.toFixed(2)}
                  </div>
                  <div className="text-xs text-green-500 font-en">
                    {savingsPercent}% {t.landing.savings}
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                t.landing.pricingFeature1,
                t.landing.pricingFeature2,
                t.landing.pricingFeature3,
                t.landing.pricingFeature4,
              ].map((text, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Check className="w-5 h-5 text-[#1b5ba5] flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm font-en">{text}</span>
                </motion.li>
              ))}
            </ul>

            <Button
              onClick={onGetStarted}
              className={`w-full ${
                isPopular
                  ? "bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white"
              } ${fontClass} relative overflow-hidden group`}
            >
              <span className="relative z-10">{t.landing.startSavingNow}</span>
              {isPopular && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1b5ba5] to-cyan-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }
);
PricingCard.displayName = "PricingCard";

/** API Endpoint card component */
const APIEndpointCard = memo(
  ({
    endpoint,
    index,
    fontClass,
    t,
  }: {
    endpoint: APIEndpoint;
    index: number;
    fontClass: string;
    t: any;
  }) => {
    const getCategoryColor = useCallback(
      (category: string) =>
        CATEGORY_COLORS[category] ||
        "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
      []
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex-shrink-0 w-[85vw] md:w-auto snap-center md:snap-align-none"
      >
        <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 hover:border-[#1b5ba5]/50 transition-all group h-full">
          <div className="space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className={`text-lg text-white ${fontClass}`}>
                  {endpoint.name}
                </h3>
                <Badge className={getCategoryColor(endpoint.category)}>
                  {endpoint.category}
                </Badge>
              </div>
              <p className={`text-sm text-zinc-400 ${fontClass}`}>
                {endpoint.description}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                {endpoint.method}
              </Badge>
              <code className="text-sm bg-zinc-800/50 border border-zinc-700 px-3 py-1 rounded text-zinc-300 break-all font-en flex-1">
                {endpoint.path}
              </code>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 font-en">
                ${endpoint.price.toFixed(3)}/req
              </Badge>
            </div>

            <div className="space-y-2">
              <p className={`text-sm text-zinc-300 ${fontClass}`}>
                {t.landing.exampleRequest}
              </p>
              <CodeBlockSimple
                code={`curl -X ${endpoint.method} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.roktenh.io${endpoint.path}`}
              />
            </div>

            <div className="space-y-2">
              <p className={`text-sm text-zinc-300 ${fontClass}`}>
                {t.landing.exampleResponse}
              </p>
              <CodeBlockSimple
                code={`{
  "status": "success",
  "data": {
    // Response data here
  }
}`}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }
);
APIEndpointCard.displayName = "APIEndpointCard";

/** API Endpoints display with category filtering */
const APIEndpointsDisplay = memo(
  ({ fontClass, t }: { fontClass: string; t: any }) => {
    const [activeCategory, setActiveCategory] =
      useState<(typeof API_CATEGORIES)[number]>("geocoding");

    const filteredEndpoints = API_ENDPOINT_CONFIG.filter(
      (e) => e.category === activeCategory
    );

    const handleCategoryChange = useCallback(
      (category: (typeof API_CATEGORIES)[number]) => {
        setActiveCategory(category);
      },
      []
    );

    const getCategoryColor = useCallback(
      (category: string) =>
        CATEGORY_COLORS[category] ||
        "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
      []
    );

    return (
      <>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {API_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg border capitalize transition-all cursor-pointer ${fontClass} ${
                activeCategory === category
                  ? getCategoryColor(category)
                  : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700"
              }`}
              aria-label={`Filter by ${category} APIs`}
              aria-pressed={activeCategory === category}
            >
              {t.landing[category as keyof typeof t.landing]}
            </button>
          ))}
        </div>

        <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-x-visible pb-4 snap-x snap-mandatory md:snap-none scrollbar-hide px-[10vw] md:px-0 scroll-smooth">
          {filteredEndpoints.map((config, index) => (
            <APIEndpointCard
              key={config.path}
              endpoint={{
                name: t.landing[config.nameKey],
                path: config.path,
                method: config.method,
                description: t.landing[config.descKey],
                category: config.category,
                price: config.price,
              }}
              index={index}
              fontClass={fontClass}
              t={t}
            />
          ))}
        </div>
      </>
    );
  }
);
APIEndpointsDisplay.displayName = "APIEndpointsDisplay";

// ============================================================================
// Main Component
// ============================================================================

interface LandingPageProps {
  onGetStarted: () => void;
}

/**
 * Landing page component for RokTenh Map API platform
 * Features modern AI-style animations, pricing calculator, and comprehensive API documentation
 */
export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { t, language, setLanguage } = useLanguage();
  const fontClass = language === "km" ? "font-kh" : "font-en";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const pricingCarouselRef = useRef<HTMLDivElement>(null);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll position for "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch pricing tiers from backend
  useEffect(() => {
    const fetchPricingTiers = async () => {
      try {
        const tiers = await apiServiceManager.getPricingTiers();
        setPricingTiers(tiers);
      } catch (error) {
        console.error("Failed to fetch pricing tiers:", error);
      }
    };
    fetchPricingTiers();
  }, []);

  // Track active card in pricing carousel
  useEffect(() => {
    const carousel = pricingCarouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.scrollWidth / 3;
      const activeIndex = Math.round(scrollLeft / cardWidth);
      setActiveCardIndex(activeIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    []
  );

  // Mouse drag handlers for pricing carousel
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const carousel = pricingCarouselRef.current;
    if (!carousel) return;

    setIsDragging(true);
    setStartX(e.pageX - carousel.offsetLeft);
    setScrollLeft(carousel.scrollLeft);
    carousel.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();

      const carousel = pricingCarouselRef.current;
      if (!carousel) return;

      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    const carousel = pricingCarouselRef.current;
    if (carousel) {
      carousel.style.cursor = "grab";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      const carousel = pricingCarouselRef.current;
      if (carousel) {
        carousel.style.cursor = "grab";
      }
    }
  }, [isDragging]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedGrid mouseX={mousePosition.x} mouseY={mousePosition.y} />
      <FloatingOrbs />

      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-black/30 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <g clipPath="url(#clip0_55_5566)">
                  <g filter="url(#filter0_dd_55_5566)">
                    <rect
                      width="40"
                      height="40"
                      rx="5"
                      fill="url(#paint0_linear_55_5566)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.7902 15.1211L27.8408 19.7402C27.4318 20.5285 26.8841 21.2685 26.1976 21.9225L20.0029 27.8393L13.8083 21.9225C12.4821 20.6558 11.6731 19.0777 11.3794 17.4289L9.28929 16.8937C8.95415 17.2035 8.49649 17.3945 7.99378 17.3945C6.96314 17.3945 6.12891 16.596 6.12891 15.6133C6.12891 14.6306 6.96495 13.832 7.99378 13.832C8.84604 13.832 9.56497 14.3776 9.7884 15.1228L9.7902 15.1211ZM7.99559 14.8061C8.46226 14.8061 8.84064 15.1675 8.84064 15.6133C8.84064 16.059 8.46226 16.4204 7.99559 16.4204C7.52892 16.4204 7.15053 16.059 7.15053 15.6133C7.15053 15.1675 7.52892 14.8061 7.99559 14.8061Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M26.1957 10.0914C27.9435 11.7608 28.7939 13.974 28.7489 16.1735L30.839 16.7087C31.1741 16.3989 31.6318 16.2079 32.1345 16.2079C33.1651 16.2079 33.9994 17.0064 33.9994 17.9891C33.9994 18.9718 33.1633 19.7704 32.1345 19.7704C31.2822 19.7704 30.5633 19.2248 30.3399 18.4796L11.5938 13.6815C13.4172 7.59425 21.4731 5.57896 26.1957 10.0897V10.0914ZM32.1345 17.1837C32.6012 17.1837 32.9795 17.5451 32.9795 17.9909C32.9795 18.4366 32.6012 18.798 32.1345 18.798C31.6678 18.798 31.2894 18.4366 31.2894 17.9909C31.2894 17.5451 31.6678 17.1837 32.1345 17.1837Z"
                      fill="white"
                    />
                    <path
                      d="M27.2136 29.1811C27.1614 29.0492 27.0934 28.938 27.021 28.8427C26.8753 28.6519 26.716 28.5205 26.5596 28.4094C26.4028 28.2982 26.244 28.2142 26.0867 28.1381C25.9289 28.0625 25.772 27.9993 25.6152 27.9425C25.301 27.8288 24.9874 27.7448 24.6741 27.6742C24.3609 27.604 24.0482 27.5482 23.7355 27.5032C23.4233 27.4553 23.111 27.4197 22.7993 27.3891C22.4875 27.3585 22.1762 27.3343 21.865 27.3135C21.7327 27.3051 21.6 27.2972 21.4673 27.2903C21.392 27.5116 21.3177 27.7364 21.2443 27.9647C22.0348 28.019 22.8195 28.1352 23.5806 28.3254C24.1578 28.4721 24.7267 28.6544 25.2378 28.8975C25.4912 29.0176 25.732 29.1589 25.9134 29.311C26.0042 29.3856 26.0766 29.4647 26.1132 29.5269C26.1321 29.5581 26.1408 29.5833 26.1436 29.5981C26.1461 29.6139 26.1427 29.6173 26.1403 29.6198C26.1364 29.6218 26.134 29.6233 26.1272 29.6346C26.12 29.6455 26.107 29.6658 26.0853 29.6905C26.0418 29.7414 25.9656 29.8081 25.8724 29.8698C25.6837 29.9953 25.4366 30.1025 25.1804 30.1929C24.9222 30.2833 24.6481 30.3555 24.3691 30.4167C24.0897 30.4775 23.8045 30.5274 23.5164 30.5669C23.2288 30.6099 22.9383 30.6425 22.6463 30.6697C22.3548 30.6979 22.0619 30.7201 21.768 30.7394C21.1806 30.7764 20.5904 30.7982 19.9993 30.8051C19.7039 30.8095 19.4081 30.8085 19.1127 30.8006C18.8179 30.7932 18.523 30.7828 18.2286 30.7641C17.6408 30.728 17.0549 30.6697 16.4802 30.5793C15.9073 30.4879 15.3384 30.3673 14.8215 30.185C14.5652 30.0941 14.3191 29.9859 14.1309 29.8629C14.0368 29.8021 13.9601 29.7374 13.9161 29.688C13.8939 29.6633 13.88 29.644 13.8727 29.6337C13.865 29.6228 13.8616 29.6213 13.8573 29.6193C13.8544 29.6173 13.85 29.6129 13.8524 29.5971C13.8539 29.5813 13.8626 29.5556 13.8809 29.5245C13.9171 29.4607 13.9895 29.3797 14.0793 29.3036C14.2602 29.15 14.5025 29.0087 14.7563 28.8896C15.0126 28.7695 15.2843 28.6648 15.5632 28.5744C15.8427 28.484 16.1288 28.4039 16.4194 28.3367C17.1833 28.1584 17.9685 28.0457 18.7599 27.9855C18.6823 27.7424 18.6031 27.5032 18.523 27.2676C18.3922 27.273 18.2614 27.2804 18.1306 27.2888C17.5076 27.3279 16.8841 27.3906 16.2606 27.4904C15.6361 27.5927 15.0126 27.7241 14.3862 27.9499C14.0735 28.0665 13.7583 28.2004 13.4432 28.4163C13.2864 28.5255 13.1266 28.6559 12.9804 28.8446C12.9075 28.9395 12.839 29.0507 12.7859 29.1816C12.7343 29.3125 12.6995 29.4642 12.6957 29.6193C12.6918 29.7745 12.7198 29.9291 12.7666 30.065C12.8134 30.2008 12.8776 30.3184 12.9461 30.4202C13.0846 30.6233 13.24 30.7695 13.3925 30.894C13.5465 31.019 13.7009 31.1198 13.8563 31.2112C14.0112 31.3016 14.1666 31.3807 14.3225 31.4528C14.6338 31.5956 14.9455 31.7127 15.2592 31.8125C15.5724 31.9118 15.8861 31.9987 16.2012 32.0704C17.4598 32.3599 18.73 32.4819 19.9997 32.4992C21.2694 32.5121 22.544 32.3905 23.8006 32.0827C24.1148 32.0047 24.428 31.9152 24.7403 31.812C25.0525 31.7082 25.3633 31.5892 25.6741 31.4449C25.9849 31.2991 26.2942 31.1321 26.6021 30.8881C26.7556 30.7646 26.9105 30.6198 27.05 30.4182C27.119 30.3174 27.1836 30.2003 27.2309 30.0645C27.2787 29.9296 27.3067 29.775 27.3038 29.6198C27.3009 29.4647 27.2671 29.313 27.2145 29.1816L27.2136 29.1811Z"
                      fill="url(#paint1_linear_55_5566)"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_dd_55_5566"
                    x="-12"
                    y="-2"
                    width="64"
                    height="64"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="4"
                      operator="erode"
                      in="SourceAlpha"
                      result="effect1_dropShadow_55_5566"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_55_5566"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="3"
                      operator="erode"
                      in="SourceAlpha"
                      result="effect2_dropShadow_55_5566"
                    />
                    <feOffset dy="10" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_dropShadow_55_5566"
                      result="effect2_dropShadow_55_5566"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_55_5566"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_55_5566"
                    x1="0"
                    y1="0"
                    x2="40"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#51A2FF" />
                    <stop offset="1" stopColor="#091B51" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_55_5566"
                    x1="19.9993"
                    y1="27.4118"
                    x2="19.9993"
                    y2="31.9612"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.6" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                  <clipPath id="clip0_55_5566">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>
                <h1 className="text-white text-base font-en">RokTenh Map</h1>
                <p className="text-xs text-zinc-400 font-en">
                  Map Service Platform
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, "features")}
                className={`text-zinc-300 hover:text-white transition-colors ${fontClass}`}
              >
                {t.landing.features}
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleSmoothScroll(e, "pricing")}
                className={`text-zinc-300 hover:text-white transition-colors ${fontClass}`}
              >
                {t.landing.pricing}
              </a>
              <a
                href="#docs"
                onClick={(e) => handleSmoothScroll(e, "docs")}
                className={`text-zinc-300 hover:text-white transition-colors ${fontClass}`}
              >
                {t.landing.docs}
              </a>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "km" : "en")}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer"
                aria-label="Change language"
              >
                {language === "en" ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z"
                      fill="#41479b"
                    ></path>
                    <path
                      d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z"
                      fill="#f5f5f5"
                    ></path>
                    <path
                      d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z"
                      fill="#ff4b55"
                    ></path>
                    <path
                      d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z"
                      fill="#ff4b55"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M473.654 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.309c21.177 0 38.345 17.167 38.345 38.345v258.758c0 21.178-17.168 38.345-38.345 38.345z"
                      fill="#41479b"
                    ></path>
                    <path d="M0 167.721h512v176.55H0z" fill="#ff4b55"></path>
                    <path
                      d="M372.816 322.933v-12.516h-4.172v-8.344h-4.173v-8.344h-4.172v-8.344h-12.516v-25.031h-.001l4.173-4.173v-12.516h-4.172v-8.343h-4.172v-12.517h-4.171v-8.344h-4.172v-8.344h-4.172v-4.171h-8.345v4.171h-4.172v8.344h-4.172v8.344h-4.171v12.517h-4.172v8.343h-25.033V231.15h-4.171v-12.517h-4.172v-12.516h-4.172v-8.343h-4.172v-8.344h-4.172v-4.173h-2.086v-4.172h-4.172v4.172h-2.087v4.173h-4.171v8.344h-4.172v8.343h-4.172v12.516h-4.172v12.517h-4.172v12.515h-25.032v-8.343h-4.172v-12.517h-4.172v-8.344h-4.172v-8.344h-4.172v-4.171h-8.344v4.171h-4.172v8.344h-4.172v8.344h-4.172v12.517h-4.172v8.343h-4.172v12.516l4.17 4.173h.002v25.031h-12.515v8.344h-4.172v8.344h-4.173v8.344h-4.172v12.516h-4.172v12.516h241.975v-12.516z"
                      fill="#f5f5f5"
                    ></path>
                  </svg>
                )}
                <span className="text-sm font-en">
                  {language === "en" ? "EN" : "ខ្មែរ"}
                </span>
              </button>

              <Button
                onClick={onGetStarted}
                className={`bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white relative overflow-hidden group ${fontClass} cursor-pointer`}
              >
                <span className="relative z-10">{t.landing.getStarted}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1b5ba5] to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-zinc-800 py-4 space-y-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <a
                href="#features"
                onClick={(e) => {
                  handleSmoothScroll(e, "features");
                  closeMobileMenu();
                }}
                className={`block text-zinc-300 hover:text-white transition-colors ${fontClass}`}
              >
                {t.landing.features}
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  handleSmoothScroll(e, "pricing");
                  closeMobileMenu();
                }}
                className={`block text-zinc-300 hover:text-white transition-colors ${fontClass}`}
              >
                {t.landing.pricing}
              </a>
              <a
                href="#docs"
                onClick={(e) => {
                  handleSmoothScroll(e, "docs");
                  closeMobileMenu();
                }}
                className={`block text-zinc-300 hover:text-white transition-colors ${fontClass}`}
              >
                {t.landing.docs}
              </a>

              {/* Language Switcher - Mobile */}
              <button
                onClick={() => {
                  setLanguage(language === "en" ? "km" : "en");
                }}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800/50 w-full"
                aria-label="Change language"
              >
                {language === "en" ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z"
                      fill="#41479b"
                    ></path>
                    <path
                      d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z"
                      fill="#f5f5f5"
                    ></path>
                    <path
                      d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z"
                      fill="#ff4b55"
                    ></path>
                    <path
                      d="m24.793 421.252 186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z"
                      fill="#ff4b55"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M473.654 423.724H38.345C17.167 423.724 0 406.557 0 385.379V126.621c0-21.177 17.167-38.345 38.345-38.345h435.309c21.177 0 38.345 17.167 38.345 38.345v258.758c0 21.178-17.168 38.345-38.345 38.345z"
                      fill="#41479b"
                    ></path>
                    <path d="M0 167.721h512v176.55H0z" fill="#ff4b55"></path>
                    <path
                      d="M372.816 322.933v-12.516h-4.172v-8.344h-4.173v-8.344h-4.172v-8.344h-12.516v-25.031h-.001l4.173-4.173v-12.516h-4.172v-8.343h-4.172v-12.517h-4.171v-8.344h-4.172v-8.344h-4.172v-4.171h-8.345v4.171h-4.172v8.344h-4.172v8.344h-4.171v12.517h-4.172v8.343h-25.033V231.15h-4.171v-12.517h-4.172v-12.516h-4.172v-8.343h-4.172v-8.344h-4.172v-4.173h-2.086v-4.172h-4.172v4.172h-2.087v4.173h-4.171v8.344h-4.172v8.343h-4.172v12.516h-4.172v12.517h-4.172v12.515h-25.032v-8.343h-4.172v-12.517h-4.172v-8.344h-4.172v-8.344h-4.172v-4.171h-8.344v4.171h-4.172v8.344h-4.172v8.344h-4.172v12.517h-4.172v8.343h-4.172v12.516l4.17 4.173h.002v25.031h-12.515v8.344h-4.172v8.344h-4.173v8.344h-4.172v12.516h-4.172v12.516h241.975v-12.516z"
                      fill="#f5f5f5"
                    ></path>
                  </svg>
                )}
                <span className="text-sm font-en">
                  {language === "en"
                    ? "Switch to Khmer (ខ្មែរ)"
                    : "Switch to English (EN)"}
                </span>
              </button>

              <Button
                onClick={() => {
                  onGetStarted();
                  closeMobileMenu();
                }}
                className={`w-full bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white ${fontClass}`}
              >
                {t.landing.getStarted}
              </Button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center py-10 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800/50 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-4 h-4 text-[#1b5ba5]" />
              <span className={`text-sm text-zinc-300 ${fontClass}`}>
                {t.landing.badge}
              </span>
            </motion.div>

            <motion.h1
              className={`text-4xl sm:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight ${fontClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.landing.heroTitle}{" "}
              <span className="relative inline-block">
                <span className="text-[#1b5ba5] relative z-10">
                  {t.landing.heroTitleHighlight}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1b5ba5]/20 to-cyan-500/20 blur-xl hidden md:block" />
              </span>
            </motion.h1>

            <motion.p
              className={`text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto ${fontClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.landing.heroSubtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className={`bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white h-12 px-8 relative overflow-hidden group ${fontClass} cursor-pointer`}
              >
                <span className="relative z-10 flex items-center">
                  {t.landing.startBuilding}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1b5ba5] to-cyan-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("docs");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className={`border-zinc-700 text-white hover:bg-zinc-900 h-12 px-8 ${fontClass} cursor-pointer`}
              >
                <Code className="w-5 h-5 mr-2" />
                {t.landing.viewDocs}
              </Button>
            </motion.div>

            {/* Animated Map Visualization */}
            <motion.div
              className="mt-16 max-w-4xl mx-auto relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1b5ba5] to-cyan-500 rounded-2xl blur opacity-30" />

                <Card className="bg-zinc-900/80 border-zinc-800/50 p-4 sm:p-6 lg:p-8 text-left backdrop-blur-xl relative overflow-hidden">
                  {/* Animated map pins */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 sm:gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#1b5ba5]" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] sm:text-xs text-zinc-500 ml-1 sm:ml-2">
                      example.js
                    </span>
                  </div>
                  <pre className="text-xs sm:text-sm text-zinc-300 overflow-x-auto">
                    <code>{`// Initialize RokTenh Map API
const roktenhMap = new RokTenhAPI({
  apiKey: 'your_api_key_here'
});

// Geocode an address
const result = await roktenhMap.geocode({
  address: 'Phnom Penh, Cambodia'
});

console.log(result.coordinates);
// Output: { lat: 11.5564, lng: 104.9282 }`}</code>
                  </pre>

                  {/* Animated route line */}
                  <svg
                    className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-24 h-12 sm:w-32 sm:h-16 opacity-30"
                    viewBox="0 0 100 50"
                  >
                    <motion.path
                      d="M 0 25 Q 25 0, 50 25 T 100 25"
                      stroke="#1b5ba5"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </svg>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>

        <FloatingMapElements />
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-[20px] py-[30px] px-[0px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl sm:text-5xl mb-4 ${fontClass}`}>
              {t.landing.everythingYouNeed}
            </h2>
            <p
              className={`text-lg text-zinc-400 max-w-2xl mx-auto ${fontClass}`}
            >
              {t.landing.everythingSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_CONFIG.map((config, index) => (
              <FeatureCard
                key={config.titleKey}
                feature={{
                  icon: config.icon,
                  title: t.landing[config.titleKey],
                  description: t.landing[config.descKey],
                  color: config.color,
                  gradient: config.gradient,
                }}
                index={index}
                fontClass={fontClass}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-zinc-950/50 relative py-[30px] px-[0px] py-[20px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className={`text-3xl sm:text-5xl mb-6 text-center ${fontClass}`}
              >
                {t.landing.whyChoose}
              </h2>
              <p className={`text-lg text-zinc-400 mb-8 ${fontClass}`}>
                {t.landing.whyChooseDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BENEFIT_KEYS.map((key, index) => (
                  <BenefitItem
                    key={key}
                    benefit={{
                      text: t.landing[key],
                      icon: Check,
                    }}
                    index={index}
                    fontClass={fontClass}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {BENEFIT_CARD_CONFIG.map((config, index) => (
                <BenefitCardItem
                  key={config.titleKey}
                  item={{
                    icon: config.icon,
                    color: config.color,
                    title: t.landing[config.titleKey],
                    desc: t.landing[config.descKey],
                  }}
                  index={index}
                  fontClass={fontClass}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-[50px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl sm:text-5xl mb-4 ${fontClass}`}>
              {t.landing.pricingTitle}
            </h2>
            <p
              className={`text-lg text-zinc-400 max-w-2xl mx-auto ${fontClass}`}
            >
              {t.landing.pricingSubtitle}
            </p>
          </motion.div>

          <div
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible overflow-y-visible pb-4 pt-6 snap-x snap-mandatory md:snap-none scrollbar-hide px-[10vw] md:px-0 cursor-grab active:cursor-grabbing scroll-smooth"
            ref={pricingCarouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {USAGE_TIER_CONFIG.map((config, index) => (
              <PricingCard
                key={config.label}
                usage={{
                  requests: config.requests,
                  label: config.label,
                  description: t.landing[config.descKey],
                }}
                index={index}
                isActive={activeCardIndex === index}
                fontClass={fontClass}
                onGetStarted={onGetStarted}
                t={t}
              />
            ))}
          </div>

          <motion.p
            className={`text-center text-xs text-zinc-500 mt-8 ${fontClass}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {t.landing.pricingDisclaimer}
          </motion.p>
        </div>
      </section>

      {/* API Documentation Section */}
      <section
        id="docs"
        className="bg-zinc-950/50 relative py-[30px] px-[0px] py-[20px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl sm:text-5xl mb-4 ${fontClass}`}>
              {t.landing.apiDocumentation}
            </h2>
            <p
              className={`text-lg text-zinc-400 max-w-2xl mx-auto ${fontClass}`}
            >
              {t.landing.apiDocSubtitle}
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#1b5ba5]" />
                <h3 className={`text-xl ${fontClass}`}>
                  {t.landing.quickStart}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm text-zinc-300 mb-2 ${fontClass}`}>
                    {t.landing.quickStartStep1}
                  </p>
                  <CodeBlockSimple
                    code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.roktenh.io/v1/geocode?address=New+York`}
                  />
                </div>
                <div>
                  <p className={`text-sm text-zinc-300 mb-2 ${fontClass}`}>
                    {t.landing.quickStartStep2}
                  </p>
                  <CodeBlockSimple
                    code={`https://api.roktenh.io/v1/geocode?address=New+York&key=YOUR_API_KEY`}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <APIEndpointsDisplay fontClass={fontClass} t={t} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950/50 relative overflow-hidden mb-[30px] py-[30px] px-[0px] py-[20px]">
        <motion.div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#1b5ba5_1px,transparent_1px)] bg-[length:50px_50px]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className={`text-3xl sm:text-5xl mb-6 ${fontClass}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.landing.readyToStart}
          </motion.h2>
          <motion.p
            className={`text-lg text-zinc-400 mb-8 ${fontClass}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.landing.readyToStartDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className={`bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white h-12 px-8 relative overflow-hidden group ${fontClass} cursor-pointer`}
            >
              <span className="relative z-10 flex items-center">
                {t.landing.createFreeAccount}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1b5ba5] to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-[20px] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={fontClass}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-zinc-400">
                © 2014-{new Date().getFullYear()} {t.landing.footerCopyright}
              </p>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-xs text-zinc-400">
                  {t.landing.footerWeAccept}
                </span>
                <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded font-en">
                  KHQR
                </span>
                <span className="text-xs text-zinc-400">
                  {t.landing.footerVersion}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 bg-[#1b5ba5] hover:bg-[#1b5ba5]/90 text-white p-3 rounded-full shadow-lg shadow-[#1b5ba5]/50 backdrop-blur-sm border border-[#1b5ba5]/30 transition-all hover:scale-110"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
