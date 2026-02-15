import { useState, useEffect } from 'react';

interface PricingInfo {
    price: string;
    currency: string;
    countryCode: string;
    loading: boolean;
}

const PRICING_TIERS: Record<string, { price: string; currency: string }> = {
    IN: { price: '₹1000', currency: 'INR' },
    US: { price: '$29', currency: 'USD' },
    CA: { price: '$39', currency: 'CAD' },
    GB: { price: '£25', currency: 'GBP' },
    EU: { price: '€25', currency: 'EUR' },
    AU: { price: '$45', currency: 'AUD' },
    // Default fallback is handled in logic
};

const DEFAULT_PRICING = { price: '$19', currency: 'USD' };

export function usePPPPrice(): PricingInfo {
    const [info, setInfo] = useState<PricingInfo>({
        price: '',
        currency: '',
        countryCode: '',
        loading: true
    });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // Using ipapi.co as it offers a free tier without API key for reasonable usage
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const countryCode = data.country_code; // e.g., "IN", "US"

                const tier = PRICING_TIERS[countryCode] || (
                    // Logic to handle EU countries if not explicitly listed?
                    // ipapi returns currency too, but let's stick to our reliable tiers first.
                    // If currency is EUR, use EU tier
                    data.currency === 'EUR' ? PRICING_TIERS.EU : DEFAULT_PRICING
                );

                setInfo({
                    price: tier.price,
                    currency: tier.currency,
                    countryCode,
                    loading: false
                });
            } catch (error) {
                console.error("Failed to fetch location for PPP pricing:", error);
                // Fallback to US pricing on error
                setInfo({
                    price: DEFAULT_PRICING.price,
                    currency: DEFAULT_PRICING.currency,
                    countryCode: 'US',
                    loading: false
                });
            }
        };

        fetchLocation();
    }, []);

    return info;
}
