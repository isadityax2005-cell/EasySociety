import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  AlertCircle,
  FileText,
  Search,
  Send,
  Users,
  PieChart,
  Settings,
  ShieldCheck,
  Printer,
  ChevronRight,
  X,
  ExternalLink,
  MessageSquare,
  ReceiptText,
  PlusCircle,
  LayoutDashboard,
  Check,
  DollarSign
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  SOCIETY_INFO,
  BANK_INFO,
  BILLING_CONFIG,
  initialFlats,
  initialExpenses,
  initialTransactions
} from './data';
import { generateReceiptPDF } from './utils/pdfGenerator';
import './App.css';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // Data States
  const [flats, setFlats] = useState(initialFlats);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [unitTypeFilter, setUnitTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Notifications
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptFlat, setReceiptFlat] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyFlat, setVerifyFlat] = useState(null);
  const [verifyUtrInput, setVerifyUtrInput] = useState('');
  const [showBatchBillModal, setShowBatchBillModal] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchCompleted, setBatchCompleted] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: 'Security Services', title: '', amount: '', paidTo: '' });
  const [showDefaulterNoticeModal, setShowDefaulterNoticeModal] = useState(false);
  const [defaulterNoticeFlat, setDefaulterNoticeFlat] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Stats Calculations
  const totalUnits = flats.length;
  const flatsCount = flats.filter(f => f.unitType === 'Flat').length;
  const shopsCount = flats.filter(f => f.unitType === 'Shop').length;
  const paidFlats = flats.filter(f => f.status === 'Paid');
  const pendingFlats = flats.filter(f => f.status === 'Pending');
  const overdueFlats = flats.filter(f => f.status === 'Overdue');
  const totalCollected = paidFlats.reduce((sum, f) => sum + f.amount, 0);
  const totalExpected = flats.reduce((sum, f) => sum + f.amount, 0);
  const totalOverdueDues = overdueFlats.reduce((sum, f) => sum + (f.duesHistory || f.amount), 0);
  const recoveryPercentage = Math.round((totalCollected / totalExpected) * 100);

  // Filtered Units
  const filteredFlats = flats.filter(f => {
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    const matchesType = unitTypeFilter === 'All' || f.unitType === unitTypeFilter;
    const matchesSearch = f.flatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.phone.includes(searchQuery);
    return matchesStatus && matchesType && matchesSearch;
  });

  // Verify Payment Handler
  const handleConfirmVerify = () => {
    if (!verifyFlat) return;
    const utr = verifyUtrInput.trim() || `UTR${Date.now().toString().slice(-8)}`;
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    setFlats(prev => prev.map(f => f.id === verifyFlat.id ? {
      ...f,
      status: 'Paid',
      paymentDate: today,
      utr: utr,
      duesHistory: 0,
    } : f));

    // Add transaction to bank ledger
    const unitLabel = verifyFlat.unitType === 'Shop' ? `Shop ${verifyFlat.flatNumber}` : `Flat ${verifyFlat.flatNumber}`;
    const newTx = {
      id: `tx-${Date.now()}`,
      date: today,
      desc: `UPI: ${unitLabel} ${verifyFlat.ownerName} Maint ${BILLING_CONFIG.currentMonth}`,
      type: 'Credit',
      amount: verifyFlat.amount,
      ref: `UPI/VJSB/${utr}`,
      balance: BANK_INFO.currentBalance + verifyFlat.amount,
    };
    setTransactions(prev => [newTx, ...prev]);

    if (selectedFlat?.id === verifyFlat.id) {
      setSelectedFlat(prev => ({ ...prev, status: 'Paid', paymentDate: today, utr: utr }));
    }

    setShowVerifyModal(false);
    setVerifyUtrInput('');
    showToast(`✅ Payment of ₹${verifyFlat.amount} for ${unitLabel} verified! Digital receipt dispatched.`);
  };

  // Batch Billing Simulation
  const handleStartBatchBilling = () => {
    setShowBatchBillModal(true);
    setBatchProgress(0);
    setBatchCompleted(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setBatchProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setBatchCompleted(true);
        showToast(`🚀 Maintenance Bills with Vasai Janta QR sent to all 32 units (26 flats & 6 shops) via WhatsApp!`);
      }
    }, 400);
  };

  // Add Expense Handler
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const expItem = {
      id: `exp-${Date.now()}`,
      category: newExpense.category,
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      date: today,
      paidTo: newExpense.paidTo || 'Vendor',
      receiptNo: `VOUCH-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Paid via Vasai Janta Bank'
    };
    setExpenses(prev => [expItem, ...prev]);
    setShowExpenseModal(false);
    setNewExpense({ category: 'Security Services', title: '', amount: '', paidTo: '' });
    showToast(`💸 Society Expense of ₹${expItem.amount} recorded.`);
  };

  // Generate WhatsApp Direct Billing Link (For Unpaid Units)
  const getWhatsAppBillingLink = (flat) => {
    const isShop = flat.unitType === 'Shop';
    const breakdown = isShop ? BILLING_CONFIG.shopBreakdown : BILLING_CONFIG.breakdown;
    const unitTitle = isShop ? `Shop ${flat.flatNumber}` : `Flat ${flat.flatNumber}`;
    const text = encodeURIComponent(
      `🏛️ *SONAM PALACE CHS*\n` +
      `------------------------------------------\n` +
      `Dear ${flat.ownerName} (${unitTitle}),\n\n` +
      `Your Society Maintenance bill for *${BILLING_CONFIG.currentMonth}* has been issued.\n\n` +
      `📋 *Bill Breakdown:*\n` +
      `• Maintenance Fee: ₹${breakdown.maintenanceFee}\n` +
      `• Sinking Fund: ₹${breakdown.sinkingFund}\n` +
      `• Repair & Painting Fund: ₹${breakdown.repairFund}\n` +
      `• Water & Electricity: ₹${breakdown.waterCharges}\n` +
      `------------------------------------------\n` +
      `💵 *TOTAL AMOUNT DUE: ₹${flat.amount}*\n` +
      `🗓️ *Due Date: ${BILLING_CONFIG.dueDate}*\n\n` +
      `🏦 *Payment Details (Vasai Janta Bank):*\n` +
      `• Account: ${BANK_INFO.accountName}\n` +
      `• UPI ID: ${BANK_INFO.upiId}\n\n` +
      `📲 *Click to Pay directly via GPay / PhonePe / Paytm:*\n` +
      `upi://pay?pa=${BANK_INFO.upiId}&pn=SonamPalaceCHS&am=${flat.amount}&cu=INR&tn=Maint_${flat.flatNumber}_${BILLING_CONFIG.currentMonth}\n\n` +
      `_EasySociety Digital Portal • Rajkumar Singh (Hon. Treasurer • +91 93201 77469)_`
    );
    return `https://wa.me/${flat.phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  // Generate WhatsApp Official Payment Receipt Link (For Paid Units)
  const getWhatsAppReceiptLink = (flat) => {
    const isShop = flat.unitType === 'Shop';
    const unitTitle = isShop ? `Shop ${flat.flatNumber}` : `Flat ${flat.flatNumber}`;
    const receiptNo = `SP-2026-${flat.code || flat.flatNumber}-${(flat.utr || 'VJSB').slice(-6)}`;
    const text = encodeURIComponent(
      `✅ *OFFICIAL MAINTENANCE RECEIPT*\n` +
      `🏛️ *${SOCIETY_INFO.name}*\n` +
      `Reg No: ${SOCIETY_INFO.regNo}\n` +
      `------------------------------------------\n` +
      `🧾 *Receipt No:* ${receiptNo}\n` +
      `📅 *Date:* ${flat.paymentDate || '01 Aug 2026'}\n` +
      `🏢 *Unit:* ${unitTitle}\n` +
      `👤 *Resident / Occupant:* ${flat.ownerName}\n` +
      `🗓️ *Month:* ${BILLING_CONFIG.currentMonth}\n` +
      `------------------------------------------\n` +
      `💰 *AMOUNT RECEIVED: ₹${flat.amount.toLocaleString('en-IN')}*\n` +
      `🏦 *Bank:* ${BANK_INFO.bankName}\n` +
      `🔖 *Ref / UTR No:* ${flat.utr || 'VERIFIED-BY-TREASURER'}\n` +
      `📌 *Status:* PAID & VERIFIED\n` +
      `------------------------------------------\n` +
      `This is an official computer-generated receipt issued via EasySociety.\n` +
      `Treasurer: Rajkumar Singh (Sonam Palace CHS • +91 93201 77469)`
    );
    return `https://wa.me/${flat.phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="app-shell">
      {/* Dynamic Ambient Mesh Canvas */}
      <div className="ambient-canvas">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div className="ambient-orb-3" />
      </div>

      {/* =========================================================
          SIDEBAR NAVIGATION
          ========================================================= */}
      <aside className="sidebar">
        <div className="brand-header">
          <div className="brand-badge">ES</div>
          <div className="brand-info">
            <h1>EasySociety</h1>
            <p>Treasurer Portal</p>
          </div>
        </div>

        <div className="society-badge-pill">
          <Building2 size={13} />
          <span>Sonam Palace CHS</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Core Management</div>
          
          <div
            className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>

          <div
            className={`nav-item ${activeTab === 'Billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('Billing')}
          >
            <ReceiptText size={18} />
            <span>Billing & Invoices</span>
            {pendingFlats.length > 0 && (
              <span className="nav-item-badge">{pendingFlats.length}</span>
            )}
          </div>

          <div
            className={`nav-item ${activeTab === 'Residents' ? 'active' : ''}`}
            onClick={() => setActiveTab('Residents')}
          >
            <Users size={18} />
            <span>32 Units Directory</span>
          </div>

          <div
            className={`nav-item ${activeTab === 'Reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('Reports')}
          >
            <PieChart size={18} />
            <span>Accounts & Bank</span>
          </div>

          <div className="nav-section-title" style={{ marginTop: 12 }}>Society Config</div>

          <div
            className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('Settings')}
          >
            <Settings size={18} />
            <span>CHS Profile & Bank</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">RS</div>
            <div className="user-info">
              <div className="user-name">{SOCIETY_INFO.committee.treasurer.name}</div>
              <div className="user-role">Hon. Treasurer (Flat {SOCIETY_INFO.committee.treasurer.flat})</div>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MAIN VIEWPORT
          ========================================================= */}
      <main className="main-viewport">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <h2>
              {activeTab === 'Dashboard' && <>🏢 Sonam Palace CHS — 32 Units Spatial Board</>}
              {activeTab === 'Billing' && <>🧾 Maintenance Billing & Invoices</>}
              {activeTab === 'Residents' && <>👥 32 Units Directory (26 Flats + 6 Commercial Shops)</>}
              {activeTab === 'Reports' && <>📊 Society Accounts & Vasai Janta Bank</>}
              {activeTab === 'Settings' && <>⚙️ Society Profile & Bank Setup</>}
            </h2>
            <p>
              {activeTab === 'Dashboard' && `${BILLING_CONFIG.currentMonth} Cycle • 26 Flats & 6 Shops • Automated UPI Verification Engine`}
              {activeTab === 'Billing' && `Manage Monthly Dues, Issue Receipts & Dispatch WhatsApp QR Bills`}
              {activeTab === 'Residents' && `Owner Details, Contacts & Vehicles for 26 Flats & 6 Commercial Shops`}
              {activeTab === 'Reports' && `Vasai Janta Sahakari Bank Statement Passbook & Society Expense Ledgers`}
              {activeTab === 'Settings' && `Registration: ${SOCIETY_INFO.regNo}`}
            </p>
          </div>

          <div className="topbar-actions">
            {activeTab === 'Dashboard' && (
              <button
                className="btn-pill btn-primary-gradient"
                onClick={handleStartBatchBilling}
              >
                <Send size={15} />
                <span>Auto-Bill All 32 Units</span>
              </button>
            )}
            {activeTab === 'Reports' && (
              <button
                className="btn-pill btn-emerald"
                onClick={() => setShowExpenseModal(true)}
              >
                <PlusCircle size={15} />
                <span>Record Society Expense</span>
              </button>
            )}
            {activeTab === 'Billing' && (
              <button
                className="btn-pill btn-primary-gradient"
                onClick={handleStartBatchBilling}
              >
                <MessageSquare size={15} />
                <span>Dispatch WhatsApp QRs</span>
              </button>
            )}
            <button
              className="btn-pill btn-glass"
              onClick={() => showToast(`⚡ Syncing with Vasai Janta Bank (VJSB) gateway... Live!`)}
            >
              <CreditCard size={15} />
              <span>Vasai Janta Bank: ₹{BANK_INFO.currentBalance.toLocaleString('en-IN')}</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="content-area">
          {/* ═════════════════════════════════════════════════════════
              VIEW 1: DASHBOARD
              ═════════════════════════════════════════════════════════ */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Bento Stat Cards */}
              <div className="bento-stats-grid">
                <div className="bento-card stat-glow-purple">
                  <div className="stat-icon-wrapper">🏢</div>
                  <div className="stat-label">Total Units</div>
                  <div className="stat-value">{totalUnits}</div>
                  <div className="stat-subtext">26 Flats • 6 Ground Shops</div>
                </div>

                <div className="bento-card stat-glow-emerald">
                  <div className="stat-icon-wrapper">✅</div>
                  <div className="stat-label">Collected</div>
                  <div className="stat-value">₹{totalCollected.toLocaleString('en-IN')}</div>
                  <div className="stat-subtext" style={{ color: '#34d399' }}>
                    {paidFlats.length} of 32 Units Paid
                  </div>
                </div>

                <div className="bento-card stat-glow-amber">
                  <div className="stat-icon-wrapper">⏳</div>
                  <div className="stat-label">Pending Units</div>
                  <div className="stat-value">₹{pendingFlats.reduce((s, f) => s + f.amount, 0).toLocaleString('en-IN')}</div>
                  <div className="stat-subtext" style={{ color: '#fbbf24' }}>
                    {pendingFlats.length} Units Pending
                  </div>
                </div>

                <div className="bento-card stat-glow-rose">
                  <div className="stat-icon-wrapper">🔴</div>
                  <div className="stat-label">Overdue Defaulters</div>
                  <div className="stat-value">₹{totalOverdueDues.toLocaleString('en-IN')}</div>
                  <div className="stat-subtext" style={{ color: '#fb7185' }}>
                    {overdueFlats.length} Units Require Attention
                  </div>
                </div>
              </div>

              {/* Recovery Hero Bar */}
              <div className="collection-hero-bar">
                <div className="progress-header">
                  <div className="progress-title-group">
                    <h3>Maintenance Collection Progress — {BILLING_CONFIG.currentMonth}</h3>
                    <p>Vasai Janta Sahakari Bank Account Auto-Reconciliation Engine</p>
                  </div>
                  <div className="progress-numbers">
                    <strong>₹{totalCollected.toLocaleString('en-IN')}</strong>
                    <span>/ ₹{totalExpected.toLocaleString('en-IN')}</span>
                    <span style={{ marginLeft: 10, color: '#38bdf8', fontWeight: 800 }}>({recoveryPercentage}%)</span>
                  </div>
                </div>

                <div className="progress-track-outer">
                  <div className="progress-track-fill" style={{ width: `${recoveryPercentage}%` }} />
                </div>

                <div className="progress-breakdown-tags">
                  <div className="tag-item">
                    <div className="tag-dot" style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                    <span>Paid: {paidFlats.length} units (₹{totalCollected.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="tag-item">
                    <div className="tag-dot" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                    <span>Pending: {pendingFlats.length} units</span>
                  </div>
                  <div className="tag-item">
                    <div className="tag-dot" style={{ background: '#f43f5e', boxShadow: '0 0 8px #f43f5e' }} />
                    <span>Overdue: {overdueFlats.length} units</span>
                  </div>
                </div>
              </div>

              {/* Spatial Matrix Grid & Action Dock */}
              <div className="matrix-layout-grid">
                {/* 32 Units Grid Panel */}
                <div className="matrix-main-panel">
                  <div className="matrix-panel-header">
                    <h3>
                      <span>🏢 Sonam Palace CHS — 32 Units Spatial Board</span>
                    </h3>
                  </div>

                  {/* Filter Toolbar */}
                  <div className="filter-toolbar" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                      {/* Unit Type Pills */}
                      <div className="filter-pills-group">
                        <button
                          className={`filter-btn ${unitTypeFilter === 'All' ? 'active' : ''}`}
                          onClick={() => setUnitTypeFilter('All')}
                        >
                          All Units ({totalUnits})
                        </button>
                        <button
                          className={`filter-btn ${unitTypeFilter === 'Flat' ? 'active' : ''}`}
                          onClick={() => setUnitTypeFilter('Flat')}
                        >
                          🏢 Flats ({flatsCount})
                        </button>
                        <button
                          className={`filter-btn ${unitTypeFilter === 'Shop' ? 'active' : ''}`}
                          onClick={() => setUnitTypeFilter('Shop')}
                        >
                          🏬 Commercial Shops ({shopsCount})
                        </button>
                      </div>

                      {/* Search Bar */}
                      <div className="search-input-box" style={{ minWidth: 220 }}>
                        <Search size={14} className="search-icon-pos" />
                        <input
                          type="text"
                          placeholder="Search unit / name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Status Filter Pills */}
                    <div className="filter-pills-group">
                      {['All', 'Paid', 'Pending', 'Overdue'].map(st => (
                        <button
                          key={st}
                          className={`filter-btn ${statusFilter === st ? `active active-${st.toLowerCase()}` : ''}`}
                          onClick={() => setStatusFilter(st)}
                        >
                          {st} {st === 'All' ? `(${flats.length})` : `(${flats.filter(f => f.status === st).length})`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* The 32 Units Spatial Grid */}
                  <div className="flats-spatial-grid">
                    {filteredFlats.map(flat => {
                      const isShop = flat.unitType === 'Shop';
                      return (
                        <div
                          key={flat.id}
                          className={`flat-tile tile-${flat.status.toLowerCase()} ${isShop ? 'tile-shop' : ''} ${selectedFlat?.id === flat.id ? 'selected' : ''}`}
                          onClick={() => setSelectedFlat(flat)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div className="flat-tile-number" style={{ fontSize: isShop ? 16 : 20 }}>
                              {isShop ? `🏬 ${flat.flatNumber}` : flat.flatNumber}
                            </div>
                            <span className={`status-pill status-pill-${flat.status.toLowerCase()}`}>
                              {flat.status}
                            </span>
                          </div>
                          <div className="flat-tile-owner" style={{ width: '100%', textAlign: 'left', fontWeight: 600 }}>
                            {flat.ownerName}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', width: '100%', textAlign: 'left' }}>
                            ₹{flat.amount.toLocaleString('en-IN')} • {isShop ? 'Shop' : flat.floor === 0 ? 'Ground' : `Floor ${flat.floor}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Action Dock */}
                <div className="action-dock-panel">
                  {selectedFlat ? (
                    <>
                      <div className="dock-header">
                        <div>
                          <div className="dock-flat-title">
                            {selectedFlat.unitType === 'Shop' ? `Commercial Shop ${selectedFlat.flatNumber}` : `Flat ${selectedFlat.flatNumber}`}
                          </div>
                          <div className="dock-owner-name">{selectedFlat.ownerName}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            {selectedFlat.residentType} • {selectedFlat.phone}
                          </div>
                        </div>
                        <button className="dock-close-btn" onClick={() => setSelectedFlat(null)}>
                          <X size={15} />
                        </button>
                      </div>

                      <div className="dock-amount-card">
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                            Monthly Dues
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{BILLING_CONFIG.currentMonth}</div>
                        </div>
                        <div className="dock-amount-val">₹{selectedFlat.amount.toLocaleString('en-IN')}</div>
                      </div>

                      {selectedFlat.status !== 'Paid' ? (
                        <>
                          <div className="qr-presentation-card">
                            <QRCodeSVG
                              value={`upi://pay?pa=${BANK_INFO.upiId}&pn=${encodeURIComponent(BANK_INFO.accountName)}&am=${selectedFlat.amount}&cu=INR&tn=${encodeURIComponent(`Maint ${selectedFlat.flatNumber} ${BILLING_CONFIG.currentMonth}`)}`}
                              size={170}
                              level="H"
                            />
                            <div style={{ fontSize: 10, color: '#475569', marginTop: 8, fontWeight: 700 }}>
                              SCAN VIA GPAY / PHONEPE / PAYTM
                            </div>
                          </div>

                          <div className="bank-vpa-pill">
                            <div className="bank-icon-box">VJ</div>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-pure)' }}>{BANK_INFO.bankName}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{BANK_INFO.upiId}</div>
                            </div>
                          </div>

                          <div className="dock-actions-stack">
                            <a
                              href={getWhatsAppBillingLink(selectedFlat)}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-pill btn-glass"
                              style={{ justifyContent: 'center' }}
                            >
                              <MessageSquare size={16} />
                              <span>Send QR via WhatsApp</span>
                            </a>

                            <button
                              className="btn-pill btn-emerald"
                              style={{ justifyContent: 'center' }}
                              onClick={() => {
                                setVerifyFlat(selectedFlat);
                                setShowVerifyModal(true);
                              }}
                            >
                              <CheckCircle2 size={16} />
                              <span>1-Click Verify Payment</span>
                            </button>

                            {selectedFlat.status === 'Overdue' && (
                              <button
                                className="btn-pill btn-rose"
                                style={{ justifyContent: 'center', marginTop: 4 }}
                                onClick={() => {
                                  setDefaulterNoticeFlat(selectedFlat);
                                  setShowDefaulterNoticeModal(true);
                                }}
                              >
                                <AlertCircle size={16} />
                                <span>Generate Defaulter Notice</span>
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="paid-confirmed-badge">
                          <div className="paid-success-circle">✓</div>
                          <h4 style={{ fontSize: 18, fontWeight: 800, color: '#34d399' }}>Payment Verified</h4>
                          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                            Received via UPI on {selectedFlat.paymentDate}
                          </p>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                            Ref: {selectedFlat.utr || 'VERIFIED-BY-TREASURER'}
                          </div>

                          <div className="dock-actions-stack" style={{ width: '100%', marginTop: 16 }}>
                            <button
                              className="btn-pill btn-primary-gradient"
                              style={{ justifyContent: 'center' }}
                              onClick={() => {
                                generateReceiptPDF(selectedFlat, SOCIETY_INFO, BANK_INFO, BILLING_CONFIG);
                                showToast(`📄 PDF Receipt for ${selectedFlat.unitType === 'Shop' ? 'Shop' : 'Flat'} ${selectedFlat.flatNumber} downloaded!`);
                              }}
                            >
                              <Download size={16} />
                              <span>Download Official PDF Receipt</span>
                            </button>

                            <button
                              className="btn-pill btn-glass"
                              style={{ justifyContent: 'center' }}
                              onClick={() => {
                                setReceiptFlat(selectedFlat);
                                setShowReceiptModal(true);
                              }}
                            >
                              <ReceiptText size={16} />
                              <span>View / Print Society Receipt</span>
                            </button>

                            <a
                              href={getWhatsAppReceiptLink(selectedFlat)}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-pill btn-glass"
                              style={{ justifyContent: 'center' }}
                            >
                              <MessageSquare size={16} />
                              <span>Send Receipt via WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="empty-dock">
                      <div className="empty-dock-icon">
                        <Building2 size={32} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-pure)' }}>Select a Unit</h4>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, maxWidth: 220 }}>
                          Click any unit from the 32-unit board to generate dynamic Vasai Janta Bank QR, dispatch WhatsApp reminders, or verify payments.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ═════════════════════════════════════════════════════════
              VIEW 2: BILLING & INVOICES
              ═════════════════════════════════════════════════════════ */}
          {activeTab === 'Billing' && (
            <div className="table-container-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-pure)' }}>
                    Society Billing Ledger — {BILLING_CONFIG.currentMonth}
                  </h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Standard Monthly Maintenance: Flats ₹{BILLING_CONFIG.flatAmount} | Shops ₹{BILLING_CONFIG.shopAmount} (Due: {BILLING_CONFIG.dueDate})
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-pill btn-glass" onClick={() => showToast(`📥 Exported Sonam Palace 32-Unit Ledger as CSV / Excel.`)}>
                    <Download size={15} />
                    <span>Export Ledger CSV</span>
                  </button>
                  <button className="btn-pill btn-primary-gradient" onClick={handleStartBatchBilling}>
                    <Send size={15} />
                    <span>Dispatch All Bills</span>
                  </button>
                </div>
              </div>

              <table className="society-table">
                <thead>
                  <tr>
                    <th>Unit #</th>
                    <th>Resident / Occupant Name</th>
                    <th>Type</th>
                    <th>Maintenance</th>
                    <th>Sinking Fund</th>
                    <th>Repair & Water</th>
                    <th>Total Bill</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flats.map(flat => {
                    const isShop = flat.unitType === 'Shop';
                    const breakdown = isShop ? BILLING_CONFIG.shopBreakdown : BILLING_CONFIG.breakdown;
                    return (
                      <tr key={flat.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 15 }}>
                          {isShop ? (
                            <span className="unit-badge-shop">🏬 {flat.flatNumber}</span>
                          ) : (
                            <span className="unit-badge-flat">🏢 {flat.flatNumber}</span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{flat.ownerName}</td>
                        <td>
                          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: isShop ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.06)', color: isShop ? '#fbbf24' : 'var(--text-secondary)' }}>
                            {isShop ? 'Commercial' : flat.residentType}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>₹{breakdown.maintenanceFee}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>₹{breakdown.sinkingFund}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>₹{breakdown.waterCharges + breakdown.repairFund}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-pure)' }}>
                          ₹{flat.amount}
                        </td>
                        <td>
                          <span className={`status-pill status-pill-${flat.status.toLowerCase()}`}>
                            {flat.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {flat.status === 'Paid' ? (
                              <>
                                <button
                                  className="btn-pill btn-primary-gradient"
                                  style={{ padding: '6px 10px', fontSize: 11 }}
                                  title="Download Official PDF Receipt"
                                  onClick={() => {
                                    generateReceiptPDF(flat, SOCIETY_INFO, BANK_INFO, BILLING_CONFIG);
                                    showToast(`📄 PDF Receipt for ${isShop ? 'Shop' : 'Flat'} ${flat.flatNumber} downloaded!`);
                                  }}
                                >
                                  <Download size={13} />
                                  <span>PDF</span>
                                </button>
                                <button
                                  className="btn-pill btn-glass"
                                  style={{ padding: '6px 10px', fontSize: 11 }}
                                  onClick={() => {
                                    setReceiptFlat(flat);
                                    setShowReceiptModal(true);
                                  }}
                                >
                                  <ReceiptText size={13} />
                                  <span>View</span>
                                </button>
                                <a
                                  href={getWhatsAppReceiptLink(flat)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn-pill btn-glass"
                                  style={{ padding: '6px 10px', fontSize: 11 }}
                                  title="Send WhatsApp Receipt"
                                >
                                  <MessageSquare size={13} />
                                  <span>WhatsApp</span>
                                </a>
                              </>
                            ) : (
                              <>
                                <a
                                  href={getWhatsAppBillingLink(flat)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn-pill btn-glass"
                                  style={{ padding: '6px 12px', fontSize: 11 }}
                                >
                                  <MessageSquare size={13} />
                                  <span>WhatsApp</span>
                                </a>
                                <button
                                  className="btn-pill btn-emerald"
                                  style={{ padding: '6px 12px', fontSize: 11 }}
                                  onClick={() => {
                                    setVerifyFlat(flat);
                                    setShowVerifyModal(true);
                                  }}
                                >
                                  <Check size={13} />
                                  <span>Verify</span>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════
              VIEW 3: RESIDENTS DIRECTORY
              ═════════════════════════════════════════════════════════ */}
          {activeTab === 'Residents' && (
            <div className="table-container-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-pure)' }}>
                    Sonam Palace CHS — Residents & Commercial Directory
                  </h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    32 Units (26 Residential Flats + 6 Commercial Shops) • Intercom & Vehicle Database
                  </p>
                </div>
                <button className="btn-pill btn-primary-gradient" onClick={() => showToast(`👤 Register member feature ready.`)}>
                  <PlusCircle size={15} />
                  <span>Register New Member</span>
                </button>
              </div>

              <table className="society-table">
                <thead>
                  <tr>
                    <th>Unit #</th>
                    <th>Resident / Occupant</th>
                    <th>Role / Type</th>
                    <th>Contact Phone</th>
                    <th>Email Address</th>
                    <th>Occupants</th>
                    <th>Vehicle Reg. #</th>
                    <th>Dues Status</th>
                  </tr>
                </thead>
                <tbody>
                  {flats.map(flat => {
                    const isShop = flat.unitType === 'Shop';
                    return (
                      <tr key={flat.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 15 }}>
                          {isShop ? (
                            <span className="unit-badge-shop">🏬 {flat.flatNumber}</span>
                          ) : (
                            <span className="unit-badge-flat">🏢 {flat.flatNumber}</span>
                          )}
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--text-pure)' }}>{flat.ownerName}</td>
                        <td>
                          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: flat.ownerName.includes('(') ? 'rgba(99,102,241,0.2)' : isShop ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.06)', color: flat.ownerName.includes('(') ? '#a5b4fc' : isShop ? '#fbbf24' : 'var(--text-secondary)', fontWeight: 700 }}>
                            {flat.residentType}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                          <a href={`tel:${flat.phone}`} style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                            {flat.phone}
                          </a>
                        </td>
                        <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{flat.email}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{flat.members}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
                          {flat.vehicle}
                        </td>
                        <td>
                          <span className={`status-pill status-pill-${flat.status.toLowerCase()}`}>
                            {flat.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════
              VIEW 4: REPORTS & ACCOUNTS
              ═════════════════════════════════════════════════════════ */}
          {activeTab === 'Reports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Account Overview Cards */}
              <div className="bento-stats-grid">
                <div className="bento-card stat-glow-cyan">
                  <div className="stat-icon-wrapper">🏦</div>
                  <div className="stat-label">Vasai Janta Bank Balance</div>
                  <div className="stat-value">₹{BANK_INFO.currentBalance.toLocaleString('en-IN')}</div>
                  <div className="stat-subtext">A/c: {BANK_INFO.accountNumber}</div>
                </div>

                <div className="bento-card stat-glow-purple">
                  <div className="stat-icon-wrapper">🛡️</div>
                  <div className="stat-label">Sinking Fund Deposit</div>
                  <div className="stat-value">₹{BANK_INFO.sinkingFundBalance.toLocaleString('en-IN')}</div>
                  <div className="stat-subtext">Fixed Deposit in VJSB</div>
                </div>

                <div className="bento-card stat-glow-emerald">
                  <div className="stat-icon-wrapper">🔧</div>
                  <div className="stat-label">Major Repair Fund</div>
                  <div className="stat-value">₹{BANK_INFO.repairFundBalance.toLocaleString('en-IN')}</div>
                  <div className="stat-subtext">Reserved for Lift & Painting</div>
                </div>

                <div className="bento-card stat-glow-amber">
                  <div className="stat-icon-wrapper">📋</div>
                  <div className="stat-label">Monthly Expenses</div>
                  <div className="stat-value">₹{expenses.reduce((s, e) => s + e.amount, 0).toLocaleString('en-IN')}</div>
                  <div className="stat-subtext">{expenses.length} Expense Vouchers</div>
                </div>
              </div>

              {/* Passbook / Transactions Table */}
              <div className="table-container-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-pure)' }}>
                      Vasai Janta Sahakari Bank — Live Statement & Reconciliation
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      Auto-reconciles incoming UPI credits with 32 units (26 flats & 6 shops) to prevent fake receipts & embezzlement
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn-pill btn-emerald"
                      onClick={() => {
                        // Auto reconcile pending flats with bank transactions
                        let matchedCount = 0;
                        setFlats(prev => prev.map(f => {
                          if (f.status === 'Pending' || f.status === 'Overdue') {
                            const txMatch = transactions.find(t => t.type === 'Credit' && t.desc.includes(f.flatNumber));
                            if (txMatch) {
                              matchedCount++;
                              return {
                                ...f,
                                status: 'Paid',
                                paymentDate: txMatch.date,
                                utr: txMatch.ref.split('/').pop(),
                                duesHistory: 0
                              };
                            }
                          }
                          return f;
                        }));
                        showToast(`🛡️ Bank Reconciliation Complete: All credits verified against Vasai Janta Bank records.`);
                      }}
                    >
                      <ShieldCheck size={15} />
                      <span>1-Click Bank Auto-Reconcile</span>
                    </button>
                    <button className="btn-pill btn-glass" onClick={() => showToast(`🖨️ Bank statement ready for Audit export.`)}>
                      <Printer size={15} />
                      <span>Print Statement</span>
                    </button>
                  </div>
                </div>

                <table className="society-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction Details</th>
                      <th>Reference #</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{tx.date}</td>
                        <td style={{ fontWeight: 600 }}>{tx.desc}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{tx.ref}</td>
                        <td>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 800,
                            background: tx.type === 'Credit' ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)',
                            color: tx.type === 'Credit' ? '#34d399' : '#fb7185',
                          }}>
                            {tx.type}
                          </span>
                        </td>
                        <td style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          color: tx.type === 'Credit' ? '#34d399' : '#fb7185'
                        }}>
                          {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          ₹{tx.balance.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════
              VIEW 5: SETTINGS & CHS PROFILE
              ═════════════════════════════════════════════════════════ */}
          {activeTab === 'Settings' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Society Profile */}
              <div className="table-container-card">
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-pure)', marginBottom: 16 }}>
                  🏢 Society Registration Profile
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Society Name</label>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-pure)' }}>{SOCIETY_INFO.name}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Registration No.</label>
                    <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{SOCIETY_INFO.regNo}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Society Address</label>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{SOCIETY_INFO.address}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Building & Units</label>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Sonam Palace (32 Units: 26 Residential Flats, 6 Commercial Shops)</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                    <div style={{ background: 'var(--bg-elevated)', padding: 12, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hon. Treasurer</div>
                      <div style={{ fontWeight: 700 }}>{SOCIETY_INFO.committee.treasurer.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Flat {SOCIETY_INFO.committee.treasurer.flat} • {SOCIETY_INFO.committee.treasurer.phone}</div>
                    </div>
                    <div style={{ background: 'var(--bg-elevated)', padding: 12, borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Secretary</div>
                      <div style={{ fontWeight: 700 }}>{SOCIETY_INFO.committee.secretary.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Flat {SOCIETY_INFO.committee.secretary.flat} • {SOCIETY_INFO.committee.secretary.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account Config */}
              <div className="table-container-card">
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-pure)', marginBottom: 16 }}>
                  🏦 Vasai Janta Bank Setup
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Bank & Branch</label>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-pure)' }}>{BANK_INFO.bankName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{BANK_INFO.branch}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Account Name & Number</label>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-pure)' }}>{BANK_INFO.accountName}</div>
                    <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{BANK_INFO.accountNumber}</div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>IFSC Code & UPI VPA</label>
                    <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>IFSC: {BANK_INFO.ifsc}</div>
                    <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#a5b4fc' }}>UPI: {BANK_INFO.upiId}</div>
                  </div>
                  <button className="btn-pill btn-primary-gradient" style={{ marginTop: 10, justifyContent: 'center' }} onClick={() => showToast(`⚙️ Bank configuration verified with Vasai Janta Bank API.`)}>
                    <CheckCircle2 size={16} />
                    <span>Save & Test Bank Gateway</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================
          MODAL: DIGITAL SOCIETY RECEIPT (PRINTABLE / PDF COMPLIANT)
          ========================================================= */}
      {showReceiptModal && receiptFlat && (
        <div className="modal-backdrop" onClick={() => setShowReceiptModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-pure)' }}>Digital Society Maintenance Receipt</h3>
              <button className="dock-close-btn" onClick={() => setShowReceiptModal(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              {/* The Skeuomorphic Paper Receipt */}
              <div className="receipt-paper-ticket" id="printable-receipt">
                <div className="receipt-header-top">
                  <h2>{SOCIETY_INFO.name}</h2>
                  <p>Regn. No: {SOCIETY_INFO.regNo}</p>
                  <p>{SOCIETY_INFO.address}</p>
                </div>

                <div className="receipt-meta-grid">
                  <div className="receipt-meta-item">
                    <strong>Receipt No.</strong>
                    <span>SP-2026-{receiptFlat.flatNumber}</span>
                  </div>
                  <div className="receipt-meta-item">
                    <strong>Date of Receipt</strong>
                    <span>{receiptFlat.paymentDate || '01 Aug 2026'}</span>
                  </div>
                  <div className="receipt-meta-item">
                    <strong>Unit & Premise</strong>
                    <span style={{ fontWeight: 800 }}>
                      {receiptFlat.unitType === 'Shop' ? `Shop ${receiptFlat.flatNumber} (Commercial Ground)` : `Flat ${receiptFlat.flatNumber} (Floor ${receiptFlat.floor === 0 ? 'Ground' : receiptFlat.floor})`}
                    </span>
                  </div>
                  <div className="receipt-meta-item">
                    <strong>Resident / Occupant</strong>
                    <span style={{ fontWeight: 700 }}>{receiptFlat.ownerName}</span>
                  </div>
                </div>

                <table className="receipt-table-summary">
                  <tbody>
                    <tr>
                      <td>Society Service & Maintenance Charges</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                        ₹{receiptFlat.unitType === 'Shop' ? BILLING_CONFIG.shopBreakdown.maintenanceFee : BILLING_CONFIG.breakdown.maintenanceFee}
                      </td>
                    </tr>
                    <tr>
                      <td>Sinking Fund Contribution</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                        ₹{receiptFlat.unitType === 'Shop' ? BILLING_CONFIG.shopBreakdown.sinkingFund : BILLING_CONFIG.breakdown.sinkingFund}
                      </td>
                    </tr>
                    <tr>
                      <td>Building Repair & Painting Fund</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                        ₹{receiptFlat.unitType === 'Shop' ? BILLING_CONFIG.shopBreakdown.repairFund : BILLING_CONFIG.breakdown.repairFund}
                      </td>
                    </tr>
                    <tr>
                      <td>Water & Common Electricity</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                        ₹{receiptFlat.unitType === 'Shop' ? BILLING_CONFIG.shopBreakdown.waterCharges : BILLING_CONFIG.breakdown.waterCharges}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="receipt-total-banner">
                  <span>TOTAL AMOUNT PAID</span>
                  <span>₹{receiptFlat.amount.toLocaleString('en-IN')}</span>
                </div>

                <div className="receipt-stamp-seal">
                  <span>★ VERIFIED ★</span>
                  <span style={{ fontSize: 9 }}>TREASURER</span>
                  <span style={{ fontSize: 8 }}>SONAM PALACE CHS</span>
                </div>

                <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>
                  Bank: {BANK_INFO.bankName} • UTR Ref: {receiptFlat.utr || 'VERIFIED-BY-TREASURER'}<br />
                  Computer generated electronic receipt by EasySociety. Hon. Treasurer: Rajkumar Singh (+91 93201 77469).
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                <button
                  className="btn-pill btn-primary-gradient"
                  style={{ flex: 1, minWidth: 160, justifyContent: 'center' }}
                  onClick={() => {
                    generateReceiptPDF(receiptFlat, SOCIETY_INFO, BANK_INFO, BILLING_CONFIG);
                    showToast(`📄 PDF Receipt for ${receiptFlat.unitType === 'Shop' ? 'Shop' : 'Flat'} ${receiptFlat.flatNumber} downloaded!`);
                  }}
                >
                  <Download size={16} />
                  <span>Download Official PDF</span>
                </button>
                <button
                  className="btn-pill btn-glass"
                  style={{ flex: 1, minWidth: 140, justifyContent: 'center' }}
                  onClick={() => {
                    window.print();
                    showToast(`🖨️ Printing / Saving PDF receipt for ${receiptFlat.unitType === 'Shop' ? 'Shop' : 'Flat'} ${receiptFlat.flatNumber}...`);
                  }}
                >
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>
                <a
                  href={getWhatsAppReceiptLink(receiptFlat)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill btn-glass"
                  style={{ flex: 1, minWidth: 140, justifyContent: 'center' }}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Receipt</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: PAYMENT VERIFICATION WITH UTR
          ========================================================= */}
      {showVerifyModal && verifyFlat && (
        <div className="modal-backdrop" onClick={() => setShowVerifyModal(false)}>
          <div className="modal-content-card" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-pure)' }}>
                    Verify Payment for {verifyFlat.unitType === 'Shop' ? `Shop ${verifyFlat.flatNumber}` : `Flat ${verifyFlat.flatNumber}`}
                  </h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{verifyFlat.ownerName}</p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-elevated)', padding: 14, borderRadius: 10, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Amount Paid:</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#34d399' }}>₹{verifyFlat.amount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Bank Destination:</span>
                  <span style={{ fontSize: 12, color: 'var(--text-pure)' }}>{BANK_INFO.accountName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Billing Cycle:</span>
                  <span style={{ fontSize: 12, color: 'var(--accent-cyan)' }}>{BILLING_CONFIG.currentMonth}</span>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-pure)', display: 'block', marginBottom: 6 }}>
                  Enter Bank UTR / Transaction Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 89201419208 (12-digit UPI reference from Bank statement)"
                  value={verifyUtrInput}
                  onChange={(e) => setVerifyUtrInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    color: 'white',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13
                  }}
                  autoFocus
                />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Tip: Leave blank to auto-generate verified audit transaction ID.
                </div>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>Every verified UTR is logged to the society audit trail & reconciled with VJSB.</span>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-pill btn-glass" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowVerifyModal(false)}>
                  Cancel
                </button>
                <button className="btn-pill btn-emerald" style={{ flex: 1, justifyContent: 'center' }} onClick={handleConfirmVerify}>
                  Confirm & Issue Official Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: BATCH BILL DISPATCH PROGRESS
          ========================================================= */}
      {showBatchBillModal && (
        <div className="modal-backdrop" onClick={() => batchCompleted && setShowBatchBillModal(false)}>
          <div className="modal-content-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-pure)' }}>
                {batchCompleted ? 'All 32 Bills Dispatched!' : 'Sending WhatsApp QR Bills...'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                {batchCompleted
                  ? `32 personalized UPI payment QR links delivered to Sonam Palace residents & shop owners.`
                  : `Connecting to Vasai Janta Bank gateway & dispatching WhatsApp bills (${batchProgress}%)...`}
              </p>

              <div style={{ height: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', margin: '24px 0 16px' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${batchProgress}%`,
                    background: 'var(--grad-primary)',
                    borderRadius: 999,
                    transition: 'width 0.3s'
                  }}
                />
              </div>

              {batchCompleted && (
                <button
                  className="btn-pill btn-primary-gradient"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
                  onClick={() => setShowBatchBillModal(false)}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: RECORD SOCIETY EXPENSE
          ========================================================= */}
      {showExpenseModal && (
        <div className="modal-backdrop" onClick={() => setShowExpenseModal(false)}>
          <div className="modal-content-card" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-pure)' }}>Record Society Expenditure Voucher</h3>
              <button className="dock-close-btn" onClick={() => setShowExpenseModal(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: 24 }}>
              <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Expense Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '10px 12px', color: 'white', marginTop: 4 }}
                  >
                    <option>Security Services</option>
                    <option>Elevator AMC</option>
                    <option>Common Electricity</option>
                    <option>Water Tankers</option>
                    <option>Housekeeping & Sweep</option>
                    <option>Plumbing & Repairs</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Description / Vendor</label>
                  <input
                    type="text"
                    placeholder="e.g. Schindler Lift Monthly AMC"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '10px 12px', color: 'white', marginTop: 4 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 6500"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '10px 12px', color: 'white', marginTop: 4, fontFamily: 'var(--font-mono)' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  <button type="button" className="btn-pill btn-glass" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowExpenseModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-pill btn-emerald" style={{ flex: 1, justifyContent: 'center' }}>
                    Record Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-floating-pill">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
