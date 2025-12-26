import { useState, useEffect } from "react";
import {
  Check,
  DollarSign,
  Zap,
  Send,
  Phone,
  MapPin,
  Navigation,
  Search,
  Map,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "./LanguageContext";
import { formatNumber } from "../utils/formatNumber";
import { apiServiceManager } from "../services/apiService";
import type { APIServicePricing } from "../types/pricing";

// Icon mapping
const ICON_MAP: { [key: string]: any } = {
  MapPin,
  Navigation,
  Search,
  Map,
  Zap,
  DollarSign,
};

interface PricingPlansProps {
  onNavigateToWallet?: () => void;
}

export function PricingPlans({ onNavigateToWallet }: PricingPlansProps) {
  const { t, language } = useLanguage();

  // Font class based on language
  const fontClass = language === "km" ? "font-kh" : "font-en";

  // API Service Pricing - Fetched from backend
  const [apiServices, setApiServices] = useState<APIServicePricing[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Load API services from backend
  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoadingServices(true);
        const services = await apiServiceManager.getActiveAPIServicePricing();
        setApiServices(services);
      } catch (error) {
        console.error("Failed to load API services:", error);
      } finally {
        setIsLoadingServices(false);
      }
    };
    loadServices();
  }, []);

  const [requests, setRequests] = useState<{ [key: string]: number }>({});

  // Initialize requests state when services load
  useEffect(() => {
    if (apiServices.length > 0 && Object.keys(requests).length === 0) {
      const initialRequests: { [key: string]: number } = {};
      apiServices.forEach((service) => {
        initialRequests[service.serviceKey] = 10000; // Default 10K requests
      });
      setRequests(initialRequests);
    }
  }, [apiServices]);

  const calculateServiceCost = (
    serviceRequests: number,
    pricePerRequest: number
  ) => {
    return serviceRequests * pricePerRequest;
  };

  const totalCost = apiServices.reduce((sum, service) => {
    const serviceRequests = requests[service.serviceKey] || 0;
    return sum + calculateServiceCost(serviceRequests, service.pricePerRequest);
  }, 0);

  const totalRequests = Object.values(requests).reduce((a, b) => a + b, 0);

  const features = [
    t.pricing.noSetupFees,
    t.pricing.payOnlyUse,
    t.pricing.allFeaturesIncluded,
    t.pricing.realtimeTracking,
    t.pricing.prepaidWallet,
    t.pricing.automaticBilling,
  ];

  const steps = [
    { step: "1", text: t.pricing.step1Text },
    { step: "2", text: t.pricing.step2Text },
    { step: "3", text: t.pricing.step3Text },
  ];

  return (
    <div className="mx-auto space-y-10 px-[0px] max-w-[1920px] w-full py-[0px] p-[0px]">
      {/* Header Section */}
      <div className="text-center space-y-3 mt-[0px] mr-[0px] mb-[20px] ml-[0px]">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-full mb-2">
          <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className={`text-sm text-blue-600 dark:text-blue-400 font-en`}>
            {t.pricing.lowerThanGoogle}
          </span>
        </div>
        <h2
          className={`text-zinc-900 dark:text-zinc-100 text-[20px] ${fontClass}`}
        >
          {t.pricing.title}
        </h2>
        <p
          className={`text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto my-[0px] text-[16px] ${fontClass}`}
        >
          {t.pricing.subtitle}
        </p>
      </div>

      {/* Pricing Comparison Banner */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20 dark:border-green-500/20 mt-[0px] mr-[0px] mb-[10px] ml-[0px] px-[20px] py-[21px]">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="text-center">
            <p
              className={`text-sm text-zinc-600 dark:text-zinc-400 mb-1 font-en`}
            >
              Google Maps API
            </p>
            <p className="text-2xl text-zinc-400 line-through font-en">$5.00</p>
            <p className={`text-xs text-zinc-500 ${fontClass}`}>
              {t.pricing.perKGeocoding}
            </p>
          </div>
          <div className="text-4xl text-green-500">→</div>
          <div className="text-center">
            <p
              className={`text-sm text-zinc-600 dark:text-zinc-400 mb-1 font-en`}
            >
              RokTenh Map API
            </p>
            <p className="text-2xl text-green-500 dark:text-green-400 font-en">
              $2.50
            </p>
            <p className={`text-xs text-green-600 dark:text-green-400 font-en`}>
              {t.pricing.save50Percent}
            </p>
          </div>
        </div>
      </Card>

      {/* API Services Pricing Grid */}
      <div className="space-y-6">
        <div>
          <h3 className={`text-zinc-900 dark:text-zinc-100 mb-2 ${fontClass}`}>
            {t.pricing.apiServicesPricing}
          </h3>
          <p
            className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
          >
            {t.pricing.allPricesLower}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {apiServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const serviceCost = calculateServiceCost(
              requests[service.serviceKey] || 0,
              service.pricePerRequest
            );

            return (
              <Card
                key={service.nameKey}
                className="p-6 bg-white dark:bg-card border-zinc-200 dark:border-zinc-800"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${service.bgColor}`}>
                        <Icon className={`w-5 h-5 ${service.color}`} />
                      </div>
                      <div>
                        <h4
                          className={`text-zinc-900 dark:text-zinc-100 font-en`}
                        >
                          {t.pricing[service.nameKey]}
                        </h4>
                        <p
                          className={`text-sm text-zinc-600 dark:text-zinc-400 mt-1 ${fontClass}`}
                        >
                          {t.pricing[service.descKey]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                    <span className="text-2xl text-zinc-900 dark:text-zinc-100 font-en">
                      ${service.pricePerThousand.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                    >
                      {t.pricing.perThousandRequests}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label
                      className={`text-xs text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                    >
                      {t.pricing.monthlyRequests}
                    </Label>
                    <Input
                      type="number"
                      value={requests[service.serviceKey] || 0}
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          parseInt(e.target.value) || 0
                        );
                        setRequests({
                          ...requests,
                          [service.serviceKey]: value,
                        });
                      }}
                      className="bg-zinc-900 dark:bg-zinc-900 border-zinc-700 dark:border-zinc-700 text-zinc-100 font-en"
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}
                      >
                        {t.pricing.estimatedCost}
                      </span>
                      <span className="text-lg text-zinc-900 dark:text-zinc-100 font-en">
                        ${serviceCost.toFixed(2)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500 dark:text-zinc-500 font-en">
                        Google Maps API: $
                        {(
                          requests[service.serviceKey] ||
                          (0 * service.googlePrice) / 1000
                        ).toFixed(2)}
                        /mo
                      </span>
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 font-en">
                        {t.pricing.save50Percent}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Total Cost Summary */}
      <Card className="bg-gradient-to-br from-purple-600 to-violet-600 border-0 relative overflow-hidden mt-[0px] mr-[0px] mb-[20px] ml-[0px] px-[24px] py-[20px] p-[20px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-white text-xl ${fontClass}`}>
                  {t.pricing.totalMonthlyCost}
                </h3>
                <Badge
                  className={`bg-white/20 text-white border-white/30 text-xs ${fontClass}`}
                >
                  {t.pricing.estimated}
                </Badge>
              </div>
              <p className={`text-purple-100 text-sm ${fontClass}`}>
                {t.pricing.basedOnRequests.replace(
                  "{count}",
                  formatNumber(totalRequests, {
                    locale: "en",
                    unitSpace: language === "km",
                  })
                )}
              </p>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl text-white font-en">
                  ${totalCost.toFixed(2)}
                </span>
                <span className={`text-lg text-purple-100 ${fontClass}`}>
                  {t.pricing.perMonth}
                </span>
              </div>
              <p className="text-sm text-purple-100 mt-2 font-en">
                {t.pricing.averagePerRequest.replace(
                  "{cost}",
                  totalRequests > 0
                    ? ((totalCost / totalRequests) * 1000).toFixed(3)
                    : "0.000"
                )}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={`text-purple-100 mb-1 ${fontClass}`}>
                  {t.pricing.rokTenhTotal}
                </p>
                <p className="text-white text-lg font-en">
                  ${totalCost.toFixed(2)}
                </p>
              </div>
              <div>
                <p className={`text-purple-100 mb-1 ${fontClass}`}>
                  {t.pricing.googleEquivalent}
                </p>
                <p className="text-white/60 text-lg line-through font-en">
                  ${(totalCost * 2).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Features List */}

      {/* Contact Section */}
      <Card className="p-8 bg-zinc-900/30 dark:bg-zinc-900/30 border-zinc-800 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h3 className={`text-zinc-100 dark:text-zinc-100 ${fontClass}`}>
              {t.pricing.needEnterprise}
            </h3>
            <p
              className={`text-sm text-zinc-400 dark:text-zinc-400 ${fontClass}`}
            >
              {t.pricing.enterpriseDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800 font-en cursor-pointer"
              onClick={() => (window.location.href = "tel:+85561498889")}
            >
              <Phone className="w-4 h-4 mr-2" />
              +855 614 98889
            </Button>
            <Button
              className={`w-full sm:w-auto bg-[#0088cc] hover:bg-[#0077b3] cursor-pointer ${fontClass}`}
              onClick={() =>
                window.open("https://t.me/RokTenh_Sales", "_blank")
              }
            >
              <Send className="w-4 h-4 mr-2" />
              {t.pricing.chatTelegram}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-en">{t.pricing.available247}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
