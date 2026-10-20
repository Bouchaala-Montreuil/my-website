import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';

// Sticky order bar for phones: price + one-tap order.
// Hides itself while the order section is on screen.
export default function MobileCtaBar() {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const order = document.getElementById('order');
    if (!order) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(order);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 md:hidden bg-charcoal/95 backdrop-blur-lg border-t border-white/10 px-4 pt-3 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div>
          <span className="display-md text-cream">€195</span>
          <span className="body-sm text-cream/50">{t('pricing.permonth')}</span>
        </div>
        <a href="#order" className="btn btn-coral" data-cursor="Order">
          {t('pricing.cta')}
        </a>
      </div>
    </div>
  );
}
