import { AdBanner } from "@/components/ads/ad-banner";

type InlineAdProps = {
  label?: string;
};

export function InlineAd({
  label = "Inline advertisement",
}: InlineAdProps) {
  return <AdBanner label={label} variant="inline" />;
}
