/**
 * FXENGIN Financial & Broker Auto-Translation Utility
 * Robust rule-based and phrase-matching translation engine for Forex, Brokerage, and Trading terminology.
 */

function arWord(word: string): RegExp {
  return new RegExp(`(?<=^|[\\s،,.;:•])(?:ال)?${word}(?=$|[\\s،,.;:•])`, 'gu');
}

const DICTIONARY_RULES: [RegExp, string][] = [
  // Full descriptive clauses and multi-word sentences
  [/حاصل على أرفع التراخيص العالمية/gi, 'holding top international tier-1 licenses'],
  [/حاصل على أرفع التراخيص/gi, 'holding top-tier licenses'],
  [/حاصل على تراخيص/gi, 'holding licenses from'],
  [/تنفيذ فائق السرعة بدون انزلاق سعري/gi, 'ultra-fast execution with zero slippage'],
  [/تنفيذ فائق السرعة بدون انزلاق/gi, 'ultra-fast execution with zero slippage'],
  [/بدون انزلاق سعري/gi, 'with zero slippage'],
  [/بدون انزلاق/gi, 'zero slippage'],
  [/سبريد منعدم يبدأ من 0\.0 نقطة/gi, 'raw spreads starting from 0.0 pips'],
  [/سبريد منعدم/gi, 'zero raw spread'],
  [/سبريد يبدأ من 0\.0 نقطة/gi, 'spreads starting from 0.0 pips'],
  [/سبريد يبدأ من 0\.0/gi, 'spreads from 0.0 pips'],
  [/سبريد خام يبدأ من 0\.0/gi, 'raw spreads from 0.0'],
  [/سبريد خام/gi, 'raw spreads'],
  [/سبريد منخفض جداً/gi, 'ultra-low spreads'],
  [/سبريد منخفض/gi, 'low spreads'],
  [/بدون عمولات خفية/gi, 'zero hidden fees'],
  [/بدون عمولات/gi, 'zero commissions'],
  [/بدون رسوم خفية/gi, 'no hidden fees'],
  [/بدون إعادة تسعير/gi, 'zero requotes'],

  // Badges & Regulations
  [/تراخيص ASIC و FCA/gi, 'ASIC & FCA Regulation'],
  [/تراخيص ورقابة عالمية/gi, 'Global Tier-1 Regulation'],
  [/تراخيص ورقابة دولية/gi, 'International Tier-1 Regulation'],
  [/تراخيص ورقابة/gi, 'Regulation & Licenses'],
  [/تراخيص عالمية/gi, 'Global Regulation'],
  [/تراخيص دولية/gi, 'International Licenses'],
  [/تراخيص صارمة/gi, 'Strict Regulation'],
  [/رقابة دولية/gi, 'International Regulation'],
  [/رقابة عالمية/gi, 'Global Regulation'],
  [arWord('تراخيص'), 'Regulation'],
  [arWord('رقابة'), 'Regulation'],
  [/مرخص ومنظم عالمياً/gi, 'Globally Regulated & Certified'],
  [/مرخص من كبرى الهيئات/gi, 'Regulated by Top Authorities'],

  // Protection & Balance
  [/حماية كاملة من الرصيد السالب/gi, 'full negative balance protection'],
  [/حماية من الرصيد السالب/gi, 'negative balance protection'],
  [/فصل كامل لأموال العملاء/gi, 'strict segregation of client funds'],
  [/فصل أموال العملاء/gi, 'segregated client funds'],
  [/أمان واستقرار/gi, 'security & stability'],

  // Execution
  [/تنفيذ فائق السرعة للأوامر/gi, 'ultra-fast order execution'],
  [/تنفيذ فائق السرعة/gi, 'ultra-fast execution'],
  [/تنفيذ سريع للأوامر/gi, 'fast order execution'],
  [/تنفيذ سريع/gi, 'fast execution'],
  [/سرعة تنفيذ فائقة/gi, 'high-speed execution'],
  [/سرعة التنفيذ/gi, 'execution speed'],

  // Leverage & Margin
  [/أقصى رافعة مالية/gi, 'max leverage'],
  [/رافعة مالية تصل إلى/gi, 'leverage up to'],
  [/رافعة مالية غير محدودة/gi, 'unlimited leverage'],
  [/رافعة مالية قياسية/gi, 'high leverage'],
  [/رافعة مالية فائقة/gi, 'ultra-high leverage'],
  [/رافعة مالية ديناميكية/gi, 'dynamic leverage'],
  [/رافعة مالية مرنة/gi, 'flexible leverage'],
  [/رافعة مالية/gi, 'leverage'],

  // Accounts & Islamic Swap-Free
  [/حسابات إسلامية خالية تماماً من الفوائد الربوية ورسوم التبييت/gi, 'Certified 100% Swap-Free Islamic Accounts'],
  [/حسابات إسلامية 100% Swap-Free/gi, '100% Swap-Free Islamic Accounts'],
  [/حسابات إسلامية خالية من الفوائد/gi, 'Swap-Free Islamic Accounts'],
  [/حسابات إسلامية بدون رسوم تبييت/gi, 'Swap-Free Islamic Accounts'],
  [/حسابات إسلامية/gi, 'Islamic Accounts'],
  [/حساب إسلامي/gi, 'Islamic Account'],
  [/خالية من التبييت/gi, 'Swap-Free'],
  [/بدون فوائد تبييت/gi, 'Swap-Free'],

  // Bonuses & Deposits
  [/بونص إيداع 100%/gi, '100% deposit bonus'],
  [/بونص 100%/gi, '100% bonus'],
  [/بونص 50%/gi, '50% bonus'],
  [/بونص 30%/gi, '30% bonus'],
  [/بونص إيداع/gi, 'deposit bonus'],
  [/بونص ترحيبي/gi, 'welcome bonus'],
  [arWord('بونص'), 'bonus'],
  [/الحد الأدنى للبونص/gi, 'minimum bonus deposit'],
  [/الحد الأدنى للإيداع/gi, 'minimum deposit'],
  [/إيداع من/gi, 'deposit from'],
  [/سحب وإيداع فوري/gi, 'instant deposit & withdrawal'],
  [/سحب وإيداع محلي/gi, 'local deposit & withdrawal'],
  [/خيارات سحب وإيداع/gi, 'deposit & withdrawal options'],
  [/سحب فوري/gi, 'instant withdrawal'],
  [/إيداع فوري/gi, 'instant deposit'],
  [/بالعملات المحلية/gi, 'in local currencies'],

  // Support & Service
  [/دعم عملاء متواصل 24\/7/gi, '24/7 client support'],
  [/دعم فني متواصل 24\/7/gi, '24/7 technical support'],
  [/دعم عملاء 24\/7/gi, '24/7 customer support'],
  [/دعم متواصل 24\/7/gi, '24/7 continuous support'],
  [/دعم فني/gi, 'technical support'],
  [/خدمة عملاء ممتازة/gi, 'excellent client service'],
  [/على مدار الساعة/gi, 'around the clock'],

  // Instruments & Categories
  [/وسطاء الفوركس والسلع/gi, 'Forex & Commodities'],
  [/وسطاء الفوركس/gi, 'Forex Brokers'],
  [/شركات التمويل/gi, 'Prop Trading Firms'],
  [/شركة تمويل متداولين/gi, 'Prop Trading Firm'],
  [/شركة تمويل/gi, 'Prop Trading Firm'],
  [/منصات العملات الرقمية/gi, 'Crypto Exchanges'],
  [/عملات رقمية/gi, 'Crypto'],
  [/أكثر من (\d[\d,]*)\s*أداة مالية/gi, 'over $1 financial instruments'],
  [/أكثر من (\d[\d,]*)/gi, 'over $1'],
  [/تنوع ضخم/gi, 'huge variety'],
  [/أداة مالية/gi, 'financial instruments'],
  [/أدوات مالية/gi, 'financial instruments'],
  [/المنصات/gi, 'Trading Platforms'],

  // Prop Firms & Funding
  [/حسابات تمويل فورية/gi, 'instant funded accounts'],
  [/حسابات تمويل حتى/gi, 'funded accounts up to'],
  [/حسابات تمويل/gi, 'funded accounts'],
  [/تمويل حتى/gi, 'funding up to'],
  [/تقاسم أرباح يصل إلى/gi, 'profit split up to'],
  [/تقاسم أرباح/gi, 'profit split'],
  [/تحدي التداول/gi, 'trading challenge'],
  [/بدون قيود زمنية/gi, 'no time limits'],

  // Broker Descriptions
  [/الوسيط العالمي الرائد/gi, 'Leading global broker'],
  [/وسيط عالمي رائد/gi, 'Leading global broker'],
  [/وسيط عالمي مرخص/gi, 'Licensed global broker'],
  [/وسيط عالمي/gi, 'Global broker'],
  [/وسيط رائد/gi, 'Leading broker'],
  [/إشارات وتوصيات VIP مجانية فور الإيداع/gi, 'free VIP signals upon deposit'],
  [/إشارات وتوصيات VIP مجانية/gi, 'free VIP signals'],
  [/إشارات وتوصيات VIP/gi, 'VIP signals'],
  [/قناة توصيات الـ VIP/gi, 'VIP signals channel'],
  [/كود الشريك:/gi, 'Partner Code:'],
  [/كود الوكالة:/gi, 'Agency Code:'],
  [/كود الشريك/gi, 'Partner Code'],
  [/كود الوكالة/gi, 'Agency Code'],
  [/فور الإيداع/gi, 'upon deposit'],
  [/عند الإيداع/gi, 'on deposit'],
  [/عند إيداع/gi, 'on deposit of'],
  [/فما فوق/gi, 'and above'],
  [arWord('دولار'), 'USD'],
  [arWord('المتداولين'), 'traders'],
  [arWord('المتداول'), 'trader'],
  [arWord('يوفر'), 'offers'],
  [arWord('توفر'), 'offers'],
  [arWord('تقدم'), 'provides'],
  [arWord('يقدم'), 'provides'],
  [arWord('يتميز'), 'features'],
  [arWord('تتميز'), 'features'],
  [arWord('مع'), 'with'],
  [arWord('بدون'), 'without'],
  [arWord('إلى'), 'to'],
  [arWord('من'), 'from'],
  [arWord('في'), 'in'],
  [arWord('على'), 'on'],
  [arWord('عالمياً'), 'globally'],
  [arWord('دولياً'), 'internationally'],
  [arWord('محلياً'), 'locally'],
  [arWord('مجاناً'), 'for free'],
  [arWord('مجانياً'), 'free'],
  [arWord('نقاط'), 'pips'],
  [arWord('نقطة'), 'pips'],
];

export function autoTranslateText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (!trimmed) return '';

  // If text is already English/Latin without Arabic, return as is
  const arabicChars = (trimmed.match(/[\u0600-\u06FF]/g) || []).length;
  if (arabicChars === 0) {
    return trimmed;
  }

  let result = trimmed;

  for (const [pattern, replacement] of DICTIONARY_RULES) {
    result = result.replace(pattern, replacement);
  }

  // Handle remaining Arabic conjunctions and punctuation cleanly
  result = result
    .replace(/\s+و(?=[a-zA-Z])/g, ' and ')
    .replace(/\s+و\s+/g, ' and ')
    .replace(/^و\s+/g, '')
    .replace(/\s*،\s*/g, ', ')
    .replace(/\s*•\s*/g, ' • ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  // Capitalize first character if needed
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

export function getCategoryNames(category: string): { ar: string; en: string } {
  const cat = (category || 'forex').toLowerCase().trim();
  switch (cat) {
    case 'prop':
      return { ar: 'شركات التمويل', en: 'Prop Trading Firms' };
    case 'crypto':
      return { ar: 'منصات العملات الرقمية', en: 'Crypto Exchanges' };
    case 'forex':
    default:
      return { ar: 'وسطاء الفوركس والسلع', en: 'Forex & Commodities' };
  }
}
