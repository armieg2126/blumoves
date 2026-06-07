"use client";
import { useEffect, useState } from "react";

const PHONE = "973-216-0926";
const PHONE_TEL = "9732160926";

export default function Home() {
  const [quote, setQuote] = useState({ from: "", to: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleQuoteSubmit = () => {
    if (!quote.from.trim() || !quote.to.trim() || !quote.phone.trim()) {
      setError("Please fill in all three fields.");
      return;
    }
    setError("");
    // TODO: send to /api/quote (wire up real email delivery here later)
    setSubmitted(true);
  };

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a href="#top" className="nav-brand">
          <span className="blu">BLU</span>MOVES
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#why">Why us</a>
          <a href={`tel:${PHONE_TEL}`} className="nav-call">Call Now</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-grid" />
        <span className="hero-tag"><span className="dot" /> Serving Northern NJ &amp; Morris County</span>
        <h1>
          Moving day,<br />
          <span className="fill">made easy.</span><br />
          <span className="stroke">Done right.</span>
        </h1>
        <p className="hero-sub">
          BluMoves is your local crew for fast, careful, no-stress moves. Apartments, homes,
          offices — we lift, load, and deliver so you don&apos;t have to. Easy &amp; done.
        </p>
        <div className="hero-cta">
          <a href={`tel:${PHONE_TEL}`} className="btn-primary">
            📞 Call {PHONE}
          </a>
          <a href="#how" className="btn-ghost">See how it works →</a>
        </div>

        <div className="quote-card">
          {submitted ? (
            <div className="quote-success">
              <span className="quote-success-ic">✓</span>
              <p>Thanks! We got it — we&apos;ll call you shortly with your quote.</p>
            </div>
          ) : (
            <>
              <h2 className="quote-head">Get your free quote in minutes.</h2>
              <div className="quote-fields">
                <input
                  className="quote-input"
                  type="text"
                  placeholder="Moving from (ZIP or town)"
                  value={quote.from}
                  onChange={(e) => setQuote({ ...quote, from: e.target.value })}
                />
                <input
                  className="quote-input"
                  type="text"
                  placeholder="Moving to (ZIP or town)"
                  value={quote.to}
                  onChange={(e) => setQuote({ ...quote, to: e.target.value })}
                />
                <input
                  className="quote-input"
                  type="tel"
                  placeholder="Your phone number"
                  value={quote.phone}
                  onChange={(e) => setQuote({ ...quote, phone: e.target.value })}
                />
              </div>
              {error && <p className="quote-error">{error}</p>}
              <button type="button" className="quote-btn" onClick={handleQuoteSubmit}>
                GET MY QUOTE →
              </button>
              <a href={`tel:${PHONE_TEL}`} className="quote-call">
                📞 Or call {PHONE}
              </a>
            </>
          )}
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array(2).fill(0).map((_, i) => (
            <span key={i}>
              50+ MOVES COMPLETED <span className="star">✦</span> FULLY INSURED CREW{" "}
              <span className="star">✦</span> NO HIDDEN FEES <span className="star">✦</span>{" "}
              LOCAL &amp; PROUD OF IT <span className="star">✦</span> EASY &amp; DONE{" "}
              <span className="star">✦</span>{" "}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="section stats">
        <p className="eyebrow reveal">The receipts</p>
        <h2 className="reveal">Real moves. Real results.</h2>
        <div className="stats-grid">
          <div className="stat reveal">
            <div className="num">50<span className="u">+</span></div>
            <div className="lbl">Moves completed across Northern NJ</div>
          </div>
          <div className="stat reveal">
            <div className="num">$50<span className="u">K+</span></div>
            <div className="lbl">In moves delivered for happy clients</div>
          </div>
          <div className="stat reveal">
            <div className="num">5<span className="u">★</span></div>
            <div className="lbl">The standard we move to, every single job</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services" id="services">
        <p className="eyebrow reveal">What we move</p>
        <h2 className="reveal">Whatever it is, we&apos;ve got it.</h2>
        <div className="svc-grid">
          {[
            ["🏠", "Home & Apartment Moves", "Studios to full houses. We pack the truck like a puzzle and treat your stuff like ours."],
            ["📦", "Loading & Unloading", "Got the truck but not the muscle? Our crew loads, unloads, and stacks it tight."],
            ["🪑", "Furniture & Heavy Lifting", "Couches, beds, dressers, that one impossible armoire — wrapped, hauled, no scratches."],
            ["🏢", "Office & Commercial", "Move your business with minimal downtime. Evenings and weekends available."],
          ].map(([ic, t, d]) => (
            <div className="svc reveal" key={t}>
              <div className="svc-ic">{ic}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section pricing" id="pricing">
        <p className="eyebrow reveal">Pricing</p>
        <h2 className="reveal">Simple, honest pricing.</h2>
        <p className="pricing-sub reveal">
          No hidden fees. No surprises. You know the price before we lift a thing —
          just a clear, upfront quote and a crew that sticks to it.
        </p>

        <div className="price-card reveal">
          <div className="price-rate">
            <span className="price-label">Your rate</span>
            <span className="price-placeholder">[ Your rate here ]</span>
          </div>
          <div className="price-divider" />
          <div className="price-included">
            <span className="price-label">What&apos;s included</span>
            <span className="price-placeholder">[ what&apos;s included ]</span>
          </div>
        </div>

        <div className="price-trust reveal">
          <div className="trust-item">
            <span className="trust-check">✓</span> Upfront quote
          </div>
          <div className="trust-item">
            <span className="trust-check">✓</span> No hidden fees
          </div>
          <div className="trust-item">
            <span className="trust-check">✓</span> No deposit to book
          </div>
        </div>

        <div className="pricing-cta reveal">
          <div className="phone-line">Call for your free quote</div>
          <a href={`tel:${PHONE_TEL}`} className="btn-primary btn-lg">📞 Call {PHONE}</a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section steps" id="how">
        <p className="eyebrow reveal">How it works</p>
        <h2 className="reveal">Three steps. Then it&apos;s done.</h2>
        <div className="steps-grid">
          {[
            ["01", "Call for a free quote", "Tell us what you're moving and where. We give you a straight, honest price — no surprises."],
            ["02", "We show up ready", "On time, fully equipped, blankets and straps loaded. You point, we lift."],
            ["03", "Easy & done", "Everything lands safe in its new home. You unpack a coffee, not a moving truck."],
          ].map(([n, t, d]) => (
            <div className="step reveal" key={n}>
              <div className="n">{n}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section services" id="why">
        <p className="eyebrow reveal">Why BluMoves</p>
        <h2 className="reveal">Movers you&apos;d actually recommend.</h2>
        <div className="svc-grid">
          {[
            ["⚡", "Fast & on time", "We respect your schedule. Booked windows we actually hit."],
            ["🛡️", "Careful with your stuff", "Padding, wrapping, and a crew that gives a damn about your things."],
            ["💸", "Honest pricing", "Clear quotes up front. No mystery fees stacked on at the end."],
            ["📍", "Local crew", "We know Morris County and Northern NJ — the roads, the buildings, the shortcuts."],
          ].map(([ic, t, d]) => (
            <div className="svc reveal" key={t}>
              <div className="svc-ic">{ic}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta" id="quote">
        <h2 className="reveal">Ready to move?<br />Let&apos;s make it easy.</h2>
        <p className="reveal">
          Free quotes, friendly crew, zero stress. Call now and let&apos;s get your move
          on the calendar.
        </p>
        <div className="phone reveal">{PHONE}</div>
        <div className="cta-actions reveal" style={{ marginTop: 30 }}>
          <a href={`tel:${PHONE_TEL}`} className="btn-primary">📞 Call Now</a>
          <a href={`sms:${PHONE_TEL}`} className="btn-ghost">💬 Text Us</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="brand"><span className="blu">BLU</span>MOVES</div>
            <div className="tag">Easy &amp; Done</div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#services">Services</a>
              <a href="#how">How it works</a>
              <a href="#why">Why us</a>
            </div>
            <div className="footer-col">
              <h4>Service Area</h4>
              <p>Northern New Jersey</p>
              <p>Morris County</p>
            </div>
            <div className="footer-col">
              <h4>Get in touch</h4>
              <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
              <a href={`sms:${PHONE_TEL}`}>Text us</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BluMoves. All rights reserved.</span>
          <span>Local movers · Northern NJ &amp; Morris County</span>
        </div>
      </footer>

      {/* STICKY MOBILE CALL BAR */}
      <a href={`tel:${PHONE_TEL}`} className="call-bar">
        <span className="call-bar-icon">📞</span>
        <span className="call-bar-text">
          Call Now <span className="call-bar-num">{PHONE}</span>
        </span>
      </a>
    </>
  );
}
