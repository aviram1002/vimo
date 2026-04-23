const stats = [
  { value: '+10K', label: 'אירועים מנוהלים' },
  { value: '98%',  label: 'שביעות רצון' },
  { value: '1.2M', label: 'הזמנות שנשלחו' },
  { value: '3 דק׳', label: 'זמן יצירת הזמנה' },
]

export function NumbersSection() {
  return (
    <section className="py-16" style={{ background: 'linear-gradient(135deg,#6C3BFF 0%,#4a90d9 50%,#3BD1C6 100%)' }}>
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                {s.value}
              </div>
              <div className="text-sm text-white/70 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
