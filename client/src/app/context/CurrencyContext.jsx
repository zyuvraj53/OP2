"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({ code: "INR", symbol: "₹" });
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 }); // Initialize with INR fallback

  // Comprehensive country-to-currency mapping
  const currencyMap = {
    AE: { code: "AED", symbol: "د.إ" }, // United Arab Emirates
    AF: { code: "AFN", symbol: "؋" }, // Afghanistan
    AL: { code: "ALL", symbol: "L" }, // Albania
    AM: { code: "AMD", symbol: "֏" }, // Armenia
    AN: { code: "ANG", symbol: "ƒ" }, // Netherlands Antilles (Curaçao/Sint Maarten)
    AO: { code: "AOA", symbol: "Kz" }, // Angola
    AR: { code: "ARS", symbol: "$" }, // Argentina
    AU: { code: "AUD", symbol: "$" }, // Australia
    AW: { code: "AWG", symbol: "ƒ" }, // Aruba
    AZ: { code: "AZN", symbol: "₼" }, // Azerbaijan
    BA: { code: "BAM", symbol: "KM" }, // Bosnia and Herzegovina
    BB: { code: "BBD", symbol: "$" }, // Barbados
    BD: { code: "BDT", symbol: "৳" }, // Bangladesh
    BG: { code: "BGN", symbol: "лв" }, // Bulgaria
    BH: { code: "BHD", symbol: ".د.ب" }, // Bahrain
    BI: { code: "BIF", symbol: "FBu" }, // Burundi
    BM: { code: "BMD", symbol: "$" }, // Bermuda
    BN: { code: "BND", symbol: "$" }, // Brunei
    BO: { code: "BOB", symbol: "Bs." }, // Bolivia
    BR: { code: "BRL", symbol: "R$" }, // Brazil
    BS: { code: "BSD", symbol: "$" }, // Bahamas
    BT: { code: "BTN", symbol: "Nu." }, // Bhutan
    BW: { code: "BWP", symbol: "P" }, // Botswana
    BY: { code: "BYN", symbol: "Br" }, // Belarus
    BZ: { code: "BZD", symbol: "$" }, // Belize
    CA: { code: "CAD", symbol: "$" }, // Canada
    CD: { code: "CDF", symbol: "FC" }, // Democratic Republic of the Congo
    CH: { code: "CHF", symbol: "CHF" }, // Switzerland
    CL: { code: "CLP", symbol: "$" }, // Chile
    CN: { code: "CNY", symbol: "¥" }, // China
    CO: { code: "COP", symbol: "$" }, // Colombia
    CR: { code: "CRC", symbol: "₡" }, // Costa Rica
    CU: { code: "CUP", symbol: "$" }, // Cuba
    CV: { code: "CVE", symbol: "$" }, // Cape Verde
    CZ: { code: "CZK", symbol: "Kč" }, // Czech Republic
    DJ: { code: "DJF", symbol: "Fdj" }, // Djibouti
    DK: { code: "DKK", symbol: "kr" }, // Denmark
    DO: { code: "DOP", symbol: "RD$" }, // Dominican Republic
    DZ: { code: "DZD", symbol: "د.ج" }, // Algeria
    EG: { code: "EGP", symbol: "£" }, // Egypt
    ER: { code: "ERN", symbol: "Nfk" }, // Eritrea
    ET: { code: "ETB", symbol: "Br" }, // Ethiopia
    AT: { code: "EUR", symbol: "€" }, // Austria
    BE: { code: "EUR", symbol: "€" }, // Belgium
    CY: { code: "EUR", symbol: "€" }, // Cyprus
    EE: { code: "EUR", symbol: "€" }, // Estonia
    FI: { code: "EUR", symbol: "€" }, // Finland
    FR: { code: "EUR", symbol: "€" }, // France
    DE: { code: "EUR", symbol: "€" }, // Germany
    GR: { code: "EUR", symbol: "€" }, // Greece
    IE: { code: "EUR", symbol: "€" }, // Ireland
    IT: { code: "EUR", symbol: "€" }, // Italy
    LV: { code: "EUR", symbol: "€" }, // Latvia
    LT: { code: "EUR", symbol: "€" }, // Lithuania
    LU: { code: "EUR", symbol: "€" }, // Luxembourg
    MT: { code: "EUR", symbol: "€" }, // Malta
    NL: { code: "EUR", symbol: "€" }, // Netherlands
    PT: { code: "EUR", symbol: "€" }, // Portugal
    SK: { code: "EUR", symbol: "€" }, // Slovakia
    SI: { code: "EUR", symbol: "€" }, // Slovenia
    ES: { code: "EUR", symbol: "€" }, // Spain
    HR: { code: "EUR", symbol: "€" }, // Croatia
    FJ: { code: "FJD", symbol: "$" }, // Fiji
    FK: { code: "FKP", symbol: "£" }, // Falkland Islands
    FO: { code: "FOK", symbol: "kr" }, // Faroe Islands
    GB: { code: "GBP", symbol: "£" }, // United Kingdom
    GE: { code: "GEL", symbol: "₾" }, // Georgia
    GG: { code: "GGP", symbol: "£" }, // Guernsey
    GH: { code: "GHS", symbol: "₵" }, // Ghana
    GI: { code: "GIP", symbol: "£" }, // Gibraltar
    GM: { code: "GMD", symbol: "D" }, // Gambia
    GN: { code: "GNF", symbol: "FG" }, // Guinea
    GT: { code: "GTQ", symbol: "Q" }, // Guatemala
    GY: { code: "GYD", symbol: "$" }, // Guyana
    HK: { code: "HKD", symbol: "$" }, // Hong Kong
    HN: { code: "HNL", symbol: "L" }, // Honduras
    HT: { code: "HTG", symbol: "G" }, // Haiti
    HU: { code: "HUF", symbol: "Ft" }, // Hungary
    ID: { code: "IDR", symbol: "Rp" }, // Indonesia
    IL: { code: "ILS", symbol: "₪" }, // Israel
    IM: { code: "IMP", symbol: "£" }, // Isle of Man
    IQ: { code: "IQD", symbol: "ع.د" }, // Iraq
    IR: { code: "IRR", symbol: "﷼" }, // Iran
    IS: { code: "ISK", symbol: "kr" }, // Iceland
    JE: { code: "JEP", symbol: "£" }, // Jersey
    JM: { code: "JMD", symbol: "$" }, // Jamaica
    JO: { code: "JOD", symbol: "د.ا" }, // Jordan
    JP: { code: "JPY", symbol: "¥" }, // Japan
    KE: { code: "KES", symbol: "KSh" }, // Kenya
    KG: { code: "KGS", symbol: "с" }, // Kyrgyzstan
    KH: { code: "KHR", symbol: "៛" }, // Cambodia
    KI: { code: "KID", symbol: "$" }, // Kiribati
    KM: { code: "KMF", symbol: "CF" }, // Comoros
    KR: { code: "KRW", symbol: "₩" }, // South Korea
    KW: { code: "KWD", symbol: "د.ك" }, // Kuwait
    KY: { code: "KYD", symbol: "$" }, // Cayman Islands
    KZ: { code: "KZT", symbol: "₸" }, // Kazakhstan
    LA: { code: "LAK", symbol: "₭" }, // Laos
    LB: { code: "LBP", symbol: "ل.ل" }, // Lebanon
    LK: { code: "LKR", symbol: "₨" }, // Sri Lanka
    LR: { code: "LRD", symbol: "$" }, // Liberia
    LS: { code: "LSL", symbol: "L" }, // Lesotho
    LY: { code: "LYD", symbol: "ل.د" }, // Libya
    MA: { code: "MAD", symbol: "د.م." }, // Morocco
    MD: { code: "MDL", symbol: "L" }, // Moldova
    MG: { code: "MGA", symbol: "Ar" }, // Madagascar
    MK: { code: "MKD", symbol: "ден" }, // North Macedonia
    MM: { code: "MMK", symbol: "K" }, // Myanmar
    MN: { code: "MNT", symbol: "₮" }, // Mongolia
    MO: { code: "MOP", symbol: "$" }, // Macau
    MR: { code: "MRU", symbol: "UM" }, // Mauritania
    MU: { code: "MUR", symbol: "₨" }, // Mauritius
    MV: { code: "MVR", symbol: "Rf" }, // Maldives
    MW: { code: "MWK", symbol: "MK" }, // Malawi
    MX: { code: "MXN", symbol: "$" }, // Mexico
    MY: { code: "MYR", symbol: "RM" }, // Malaysia
    MZ: { code: "MZN", symbol: "MT" }, // Mozambique
    NA: { code: "NAD", symbol: "$" }, // Namibia
    NG: { code: "NGN", symbol: "₦" }, // Nigeria
    NI: { code: "NIO", symbol: "C$" }, // Nicaragua
    NO: { code: "NOK", symbol: "kr" }, // Norway
    NP: { code: "N Cocoa Bean", symbol: "₨" }, // Nepal
    NZ: { code: "NZD", symbol: "$" }, // New Zealand
    OM: { code: "OMR", symbol: "ر.ع." }, // Oman
    PA: { code: "PAB", symbol: "B/." }, // Panama
    PE: { code: "PEN", symbol: "S/" }, // Peru
    PG: { code: "PGK", symbol: "K" }, // Papua New Guinea
    PH: { code: "PHP", symbol: "₱" }, // Philippines
    PK: { code: "PKR", symbol: "₨" }, // Pakistan
    PL: { code: "PLN", symbol: "zł" }, // Poland
    PY: { code: "PYG", symbol: "₲" }, // Paraguay
    QA: { code: "QAR", symbol: "ر.ق" }, // Qatar
    RO: { code: "RON", symbol: "lei" }, // Romania
    RS: { code: "RSD", symbol: "дин" }, // Serbia
    RU: { code: "RUB", symbol: "₽" }, // Russia
    RW: { code: "RWF", symbol: "FRw" }, // Rwanda
    SA: { code: "SAR", symbol: "ر.س" }, // Saudi Arabia
    SB: { code: "SBD", symbol: "$" }, // Solomon Islands
    SC: { code: "SCR", symbol: "₨" }, // Seychelles
    SD: { code: "SDG", symbol: "£" }, // Sudan
    SE: { code: "SEK", symbol: "kr" }, // Sweden
    SG: { code: "SGD", symbol: "$" }, // Singapore
    SH: { code: "SHP", symbol: "£" }, // Saint Helena
    SL: { code: "SLE", symbol: "Le" }, // Sierra Leone
    SO: { code: "SOS", symbol: "Sh" }, // Somalia
    SR: { code: "SRD", symbol: "$" }, // Suriname
    SS: { code: "SSP", symbol: "£" }, // South Sudan
    ST: { code: "STN", symbol: "Db" }, // São Tomé and Príncipe
    SY: { code: "SYP", symbol: "£" }, // Syria
    SZ: { code: "SZL", symbol: "E" }, // Eswatini
    TH: { code: "THB", symbol: "฿" }, // Thailand
    TJ: { code: "TJS", symbol: "SM" }, // Tajikistan
    TM: { code: "TMT", symbol: "m" }, // Turkmenistan
    TN: { code: "TND", symbol: "د.ت" }, // Tunisia
    TO: { code: "TOP", symbol: "T$" }, // Tonga
    TR: { code: "TRY", symbol: "₺" }, // Turkey
    TT: { code: "TTD", symbol: "$" }, // Trinidad and Tobago
    TV: { code: "TVD", symbol: "$" }, // Tuvalu
    TW: { code: "TWD", symbol: "NT$" }, // Taiwan
    TZ: { code: "TZS", symbol: "TSh" }, // Tanzania
    UA: { code: "UAH", symbol: "₴" }, // Ukraine
    UG: { code: "UGX", symbol: "USh" }, // Uganda
    US: { code: "USD", symbol: "$" }, // United States
    UY: { code: "UYU", symbol: "$" }, // Uruguay
    UZ: { code: "UZS", symbol: "so'm" }, // Uzbekistan
    VE: { code: "VES", symbol: "Bs." }, // Venezuela
    VN: { code: "VND", symbol: "₫" }, // Vietnam
    VU: { code: "VUV", symbol: "VT" }, // Vanuatu
    WS: { code: "WST", symbol: "T" }, // Samoa
    CM: { code: "XAF", symbol: "FCFA" }, // Central African CFA franc (Cameroon, etc.)
    AG: { code: "XCD", symbol: "$" }, // East Caribbean Dollar (Antigua, etc.)
    CG: { code: "XCG", symbol: "" }, // Placeholder (not standard)
    BF: { code: "XOF", symbol: "CFA" }, // West African CFA franc (Burkina Faso, etc.)
    PF: { code: "XPF", symbol: "₣" }, // CFP Franc (French Polynesia)
    YE: { code: "YER", symbol: "﷼" }, // Yemen
    ZA: { code: "ZAR", symbol: "R" }, // South Africa
    ZM: { code: "ZMW", symbol: "ZK" }, // Zambia
    ZW: { code: "ZWL", symbol: "$" }, // Zimbabwe
    IN: { code: "INR", symbol: "₹" }, // India (default)
  };

  useEffect(() => {
    // Fetch user's country and currency
    const detectCurrency = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error("Failed to fetch geolocation");
        }
        const data = await response.json();
        const countryCode = data.country_code;

        const detectedCurrency = currencyMap[countryCode] || {
          code: "INR",
          symbol: "₹",
        };
        setCurrency(detectedCurrency);
      } catch (error) {
        console.error("Failed to detect currency:", error);
        setCurrency({ code: "INR", symbol: "₹" }); // Fallback to INR
      }
    };

    // Fetch exchange rates from ExchangeRate-API
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/INR`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setExchangeRates(data.rates);
        localStorage.setItem("exchangeRates", JSON.stringify(data.rates));
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Fallback to INR
        setExchangeRates({ INR: 1 });
        setCurrency({ code: "INR", symbol: "₹" }); // Ensure INR currency
        localStorage.setItem("exchangeRates", JSON.stringify({ INR: 1 }));
      }
    };

    // Check for cached rates
    const cachedRates = localStorage.getItem("exchangeRates");
    if (cachedRates) {
      const rates = JSON.parse(cachedRates);
      setExchangeRates(rates);
      // If cached rates are INR-only, ensure currency is INR
      if (Object.keys(rates).length === 1 && rates.INR === 1) {
        setCurrency({ code: "INR", symbol: "₹" });
      }
    } else {
      fetchExchangeRates();
    }

    detectCurrency();
  }, []);

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  // Provide all currencies for manual selection
  const availableCurrencies = Object.keys(currencyMap)
    .map((countryCode) => ({
      code: currencyMap[countryCode].code,
      symbol: currencyMap[countryCode].symbol,
      country: countryCode,
    }))
    // Remove duplicates by currency code
    .filter(
      (c, index, self) =>
        index === self.findIndex((t) => t.code === c.code)
    )
    .sort((a, b) => a.code.localeCompare(b.code)); // Sort alphabetically

  return (
    <CurrencyContext.Provider
      value={{ currency, exchangeRates, updateCurrency, availableCurrencies }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);