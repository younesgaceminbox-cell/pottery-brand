'use client';

export default function ArabicCalligraphy() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Arabic Calligraphy */}
      <div className="text-center">
        <div
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '0.05em',
            direction: 'rtl',
            fontStyle: 'italic',
            fontWeight: 700,
          }}
        >
          <span className="text-clay inline-block">ثقافة ولا أصل</span>
        </div>
        <div
          className="text-5xl md:text-6xl font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '0.05em',
            direction: 'rtl',
            fontStyle: 'italic',
            fontWeight: 700,
          }}
        >
          <span className="text-terracotta inline-block">الفخار ديما حاضر</span>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center gap-4 mt-4">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-clay"></div>
        <div className="w-2 h-2 rounded-full bg-clay"></div>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-clay"></div>
      </div>

      {/* English Translation */}
      <p className="text-center text-gray-600 dark:text-gray-400 text-lg italic max-w-2xl">
        "Culture and heritage, pottery is always present"
      </p>
    </div>
  );
}
