import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { mockFlats, MONTH, MAINTENANCE_AMOUNT, BANK } from './data';
import './index.css';

// ─────────────────────────────────────────
// ICONS (simple SVG components)
// ─────────────────────────────────────────
const Icon = ({ d, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  dashboard: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  billing:   'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  residents: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  reports:   'M18 20V10 M12 20V4 M6 20v-6',
  settings:  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  send:      'M22 2L11 13 M22 2L15 22 8 13 2 10z',
  check:     'M20 6L9 17l-5-5',
  receipt:   'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 18v-6 M9 15h6',
  bell:      'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
  qr:        'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h3v3h-3z M17 17h3v3h-3z',
  close:     'M18 6L6 18 M6 6l12 12',
  download:  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  whatsapp:  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z',
};

// ─────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="toast">
      <span className="toast-icon">✓</span>
      <span>{message}</span>
    </div>
  );
}

// ─────────────────────────────────────────
// RECEIPT MODAL
// ─────────────────────────────────────────
function ReceiptModal({ flat, onClose }) {
  const receiptId = `ES-${flat.flatNumber}-${Date.now().toString(36).toUpperCase()}`;
  const today = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className="modal-overlay" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="receipt-modal">
        <div className="receipt-header">
          <div className="receipt-header-logo">🏢 EasySociety</div>
          <p>Golden Nest Phase 1 Co-operative Housing Society</p>
          <p>Mira Road (E), Thane — 401107</p>
          <div className="receipt-id">RECEIPT # {receiptId}</div>
        </div>

        <div className="receipt-body">
          {[
            ['Date', today],
            ['Flat No.', `Flat ${flat.flatNumber}`],
            ['Resident', flat.ownerName],
            ['Mobile', flat.phone],
            ['Month', MONTH],
            ['Bank', BANK.name],
            ['UTR / Ref No.', flat.utrNumber || 'VERIFIED BY TREASURER'],
            ['Payment Mode', 'UPI / QR Code'],
          ].map(([label, value]) => (
            <div className="receipt-row" key={label}>
              <span className="receipt-row-label">{label}</span>
              <span className="receipt-row-value">{value}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 28px' }}>
          <div className="receipt-total-row">
            <span className="receipt-total-label">Total Paid</span>
            <span className="receipt-total-value">₹{flat.maintenanceAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="receipt-footer">
          <div className="receipt-status-badge">✓ &nbsp;Payment Verified & Received</div>
          <p className="receipt-disclaimer">
            This is a computer-generated receipt by EasySociety.<br />
            For queries, contact your Society Treasurer.
          </p>
          <button className="receipt-close-btn" onClick={onClose}>Close Receipt</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────
function Sidebar() {
  const [active, setActive] = useState('Dashboard');
  const navItems = [
    { label: 'Dashboard',  icon: Icons.dashboard,  section: 'main' },
    { label: 'Billing',    icon: Icons.billing,    section: 'main' },
    { label: 'Residents',  icon: Icons.residents,  section: 'main' },
    { label: 'Reports',    icon: Icons.reports,    section: 'main' },
    { label: 'Settings',   icon: Icons.settings,   section: 'bottom' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">ES</div>
        <div className="sidebar-logo-text">
          <strong>EasySociety</strong>
          <span>Treasurer Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>
        {navItems.filter(n => n.section === 'main').map(item => (
          <div
            key={item.label}
            className={`sidebar-nav-item ${active === item.label ? 'active' : ''}`}
            onClick={() => setActive(item.label)}
          >
            <span className="sidebar-nav-icon"><Icon d={item.icon} size={17} /></span>
            {item.label}
          </div>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: 16 }}>System</div>
        {navItems.filter(n => n.section === 'bottom').map(item => (
          <div
            key={item.label}
            className={`sidebar-nav-item ${active === item.label ? 'active' : ''}`}
            onClick={() => setActive(item.label)}
          >
            <span className="sidebar-nav-icon"><Icon d={item.icon} size={17} /></span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">RD</div>
          <div className="sidebar-user-info">
            <strong>Ramesh Das</strong>
            <span>Treasurer, Building A</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────
// ACTION PANEL (Right panel)
// ─────────────────────────────────────────
function ActionPanel({ flat, onVerify, onClose }) {
  const [showReceipt, setShowReceipt] = useState(false);

  const upiString = `upi://pay?pa=${BANK.upiId}&pn=${encodeURIComponent(BANK.account)}&am=${flat.maintenanceAmount}&cu=INR&tn=${encodeURIComponent(`Maintenance ${flat.flatNumber} ${MONTH}`)}`;

  if (!flat) {
    return (
      <div className="action-panel">
        <div className="action-panel-empty">
          <div className="action-panel-empty-icon">🏠</div>
          <p>Select any flat from the grid to manage billing, generate QR codes, and verify payments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="action-panel">
      {showReceipt && <ReceiptModal flat={flat} onClose={() => setShowReceipt(false)} />}

      <div className="flat-detail-header">
        <div className="flat-detail-title">
          <h2>Flat {flat.flatNumber}</h2>
          <p>{flat.ownerName}</p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{flat.phone}</p>
        </div>
        <button className="flat-close-btn" onClick={onClose}>
          <Icon d={Icons.close} size={14} />
        </button>
      </div>

      {/* Amount */}
      <div className="amount-display">
        <div>
          <div className="amount-label">Maintenance Due</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{MONTH}</div>
        </div>
        <div className="amount-value">
          <span className="amount-currency">₹</span>
          {flat.maintenanceAmount.toLocaleString('en-IN')}
        </div>
      </div>

      {flat.status !== 'Paid' ? (
        <>
          {/* QR Code */}
          <div className="qr-container">
            <div className="qr-frame">
              <QRCodeSVG
                value={upiString}
                size={160}
                fgColor="#1a1a2e"
                bgColor="#ffffff"
                level="H"
              />
            </div>
            <div className="qr-bank-badge">
              <div className="qr-bank-icon">VJ</div>
              <div className="qr-bank-info">
                <strong>{BANK.name}</strong>
                <span>{BANK.upiId} · ₹{flat.maintenanceAmount}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button className="action-btn btn-secondary">
              <Icon d={Icons.whatsapp} size={16} />
              Send QR via WhatsApp
            </button>
            <button
              className="action-btn btn-success"
              onClick={() => onVerify(flat.id)}
            >
              <Icon d={Icons.check} size={16} />
              Verify Payment Received
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="paid-state">
            <div className="paid-checkmark">✓</div>
            <h3>Payment Verified</h3>
            <p>Maintenance collected for {MONTH}</p>
            <div className="paid-date">Paid on {flat.lastPaymentDate}</div>
          </div>
          <div className="action-buttons" style={{ marginTop: 24 }}>
            <button
              className="action-btn btn-primary"
              onClick={() => setShowReceipt(true)}
            >
              <Icon d={Icons.receipt} size={16} />
              View Digital Receipt
            </button>
            <button className="action-btn btn-secondary">
              <Icon d={Icons.download} size={16} />
              Download PDF Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────
export default function App() {
  const [flats, setFlats] = useState(mockFlats);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState(null);

  const stats = {
    total:     flats.length,
    paid:      flats.filter(f => f.status === 'Paid').length,
    pending:   flats.filter(f => f.status === 'Pending').length,
    overdue:   flats.filter(f => f.status === 'Overdue').length,
    collected: flats.filter(f => f.status === 'Paid').reduce((a,c) => a + c.maintenanceAmount, 0),
    expected:  flats.reduce((a,c) => a + c.maintenanceAmount, 0),
  };
  const pct = Math.round((stats.collected / stats.expected) * 100);

  const filteredFlats = filter === 'All'
    ? flats
    : flats.filter(f => f.status === filter);

  const handleVerify = (id) => {
    setFlats(prev => prev.map(f =>
      f.id === id ? {
        ...f,
        status: 'Paid',
        lastPaymentDate: new Date().toISOString().split('T')[0],
        utrNumber: `UTR${Date.now().toString().slice(-10)}`,
      } : f
    ));
    const updated = flats.find(f => f.id === id);
    setSelected(prev => prev?.id === id ? { ...prev, status: 'Paid', lastPaymentDate: new Date().toISOString().split('T')[0] } : prev);
    setToast(`✅ Flat ${updated?.flatNumber} marked as paid! Receipt generated.`);
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-greeting">
            <h1>Maintenance Dashboard</h1>
            <p>Golden Nest Phase 1 · Building A · {MONTH}</p>
          </div>
          <div className="topbar-date">{today}</div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: 'Total Flats',   value: stats.total,     sub: 'Building A',          icon: '🏠', cls: 'stat-card-primary' },
            { label: 'Paid',          value: stats.paid,      sub: `₹${stats.collected.toLocaleString('en-IN')} collected`, icon: '✅', cls: 'stat-card-success' },
            { label: 'Pending',       value: stats.pending,   sub: `₹${(stats.pending * MAINTENANCE_AMOUNT).toLocaleString('en-IN')} due`, icon: '⏳', cls: 'stat-card-warning' },
            { label: 'Overdue',       value: stats.overdue,   sub: 'Requires attention',  icon: '🔴', cls: 'stat-card-danger'  },
          ].map(s => (
            <div className={`stat-card ${s.cls}`} key={s.label}>
              <div className="stat-card-icon" style={{ fontSize: 20 }}>{s.icon}</div>
              <div className="stat-card-label">{s.label}</div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Collection Progress */}
        <div className="collection-bar-wrap">
          <div className="collection-header">
            <h2>Collection Progress — {MONTH}</h2>
            <div className="collection-amounts">
              <strong>₹{stats.collected.toLocaleString('en-IN')}</strong>
              <span style={{ color: 'var(--text-muted)' }}> / ₹{stats.expected.toLocaleString('en-IN')}</span>
              <span style={{ marginLeft: 12, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {pct}%
              </span>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="collection-segments">
            {[
              { color: 'var(--paid-color)',    label: `Paid (${stats.paid})` },
              { color: 'var(--pending-color)', label: `Pending (${stats.pending})` },
              { color: 'var(--overdue-color)', label: `Overdue (${stats.overdue})` },
            ].map(seg => (
              <div className="segment" key={seg.label}>
                <div className="segment-dot" style={{ background: seg.color, boxShadow: `0 0 6px ${seg.color}` }} />
                {seg.label}
              </div>
            ))}
          </div>
        </div>

        {/* Flats + Action Panel */}
        <div className="dashboard-grid">
          {/* Flat Grid */}
          <div className="flat-panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-title-icon">🏗️</div>
                Building A — All Flats
              </div>
              <button className="bill-all-btn">
                <Icon d={Icons.send} size={15} />
                Send Bills to All
              </button>
            </div>

            {/* Filters */}
            <div className="filter-pills">
              {['All','Paid','Pending','Overdue'].map(f => (
                <button
                  key={f}
                  className={`filter-pill ${filter === f ? `active-${f.toLowerCase()}` : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f} {f !== 'All' && `(${flats.filter(x => x.status === f).length})`}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="flats-grid">
              {filteredFlats.map(flat => (
                <div
                  key={flat.id}
                  className={`flat-card ${flat.status.toLowerCase()} ${selected?.id === flat.id ? 'selected' : ''}`}
                  onClick={() => setSelected(flat)}
                >
                  <div className="flat-number">{flat.flatNumber}</div>
                  <span className={`status-badge badge-${flat.status.toLowerCase()}`}>
                    {flat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Panel */}
          <ActionPanel
            flat={selected}
            onVerify={handleVerify}
            onClose={() => setSelected(null)}
          />
        </div>
      </main>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
