export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="page-header section-padding">
      <div className="cp-container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8 reveal">
            {eyebrow && <span className="eyebrow mb-3"><span className="pulse-dot" /> {eyebrow}</span>}
            <h1 className="display-5 fw-bold mt-3 mb-3" style={{ letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            {subtitle && <p className="lead" style={{ color: '#435d50', maxWidth: 680, fontSize: 18 }}>{subtitle}</p>}
          </div>
          {children && (
            <div className="col-12 col-lg-4 reveal delay-1">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
