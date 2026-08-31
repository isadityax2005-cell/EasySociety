// Golden Nest Phase 1 CHS — Comprehensive Data Engine
// Structure: 25 Flats (5 Floors x 5 Flats per floor: 101-105, 201-205, 301-305, 401-405, 501-505)

export const SOCIETY_INFO = {
  name: 'Golden Nest Phase 1 Co-operative Housing Society Ltd.',
  regNo: 'TNA/MRA/HSG/(TC)/14892/2004',
  address: 'Golden Nest Phase 1, Near Flyover, Mira-Bhayandar Road, Mira Road (E), Thane - 401107',
  buildingsCount: 11,
  totalFlatsInSociety: 500,
  currentBuilding: 'Building A (Wing 1)',
  buildingFlatsCount: 25,
  committee: {
    treasurer: { name: 'Ramesh Das', flat: 'A-201', phone: '+91 98201 44521', role: 'Building Treasurer' },
    secretary: { name: 'Mahesh K. Roy', flat: 'A-104', phone: '+91 98192 33140', role: 'Building Secretary' },
    chairman: { name: 'J.P. Sharma', flat: 'A-302', phone: '+91 98330 99812', role: 'Building Chairman' },
  }
};

export const BANK_INFO = {
  bankName: 'Vasai Janta Sahakari Bank Ltd.',
  branch: 'Mira Road (East) Branch',
  accountName: 'GOLDEN NEST PH 1 BLDG A CHS',
  accountNumber: '004210100049281',
  ifsc: 'VJSB0000042',
  upiId: 'goldennest.bldgA@vjsb',
  currentBalance: 384500,
  sinkingFundBalance: 850000,
  repairFundBalance: 420000,
};

export const BILLING_CONFIG = {
  currentMonth: 'August 2026',
  billDate: '01 Aug 2026',
  dueDate: '15 Aug 2026',
  breakdown: {
    maintenanceFee: 1800,
    sinkingFund: 250,
    repairFund: 200,
    waterCharges: 150,
    festivalAdvance: 100,
  },
  totalAmount: 2500,
  lateFeePerMonth: 100,
};

export const initialFlats = [
  // 1st Floor
  { id: '101', flatNumber: '101', floor: 1, wing: 'A', ownerName: 'Rameshwar Sharma', residentType: 'Owner', phone: '+91 98201 11201', email: 'r.sharma101@gmail.com', members: 4, vehicle: 'MH-04-AB-2101', status: 'Paid', paymentDate: '04 Aug 2026', utr: 'UTR89201419201', amount: 2500, duesHistory: 0 },
  { id: '102', flatNumber: '102', floor: 1, wing: 'A', ownerName: 'Priya Nilesh Mehta', residentType: 'Owner', phone: '+91 98190 22102', email: 'pmehta102@yahoo.co.in', members: 3, vehicle: 'MH-04-CD-5542', status: 'Paid', paymentDate: '02 Aug 2026', utr: 'UTR89201419202', amount: 2500, duesHistory: 0 },
  { id: '103', flatNumber: '103', floor: 1, wing: 'A', ownerName: 'Suresh V. Patel', residentType: 'Owner', phone: '+91 98205 33103', email: 'patel.suresh@gmail.com', members: 5, vehicle: 'MH-04-EF-9012', status: 'Paid', paymentDate: '06 Aug 2026', utr: 'UTR89201419203', amount: 2500, duesHistory: 0 },
  { id: '104', flatNumber: '104', floor: 1, wing: 'A', ownerName: 'Mahesh K. Roy (Sec)', residentType: 'Owner', phone: '+91 98192 33140', email: 'roy.mahesh@rediffmail.com', members: 3, vehicle: 'MH-04-GH-1104', status: 'Pending', paymentDate: null, utr: null, amount: 2500, duesHistory: 0 },
  { id: '105', flatNumber: '105', floor: 1, wing: 'A', ownerName: 'Vikram Aditya Singh', residentType: 'Tenant', phone: '+91 98331 55105', email: 'vikram.singh@outlook.com', members: 2, vehicle: 'MH-04-JK-4415', status: 'Overdue', paymentDate: null, utr: null, amount: 2500, duesHistory: 5000 },

  // 2nd Floor
  { id: '201', flatNumber: '201', floor: 2, wing: 'A', ownerName: 'Ramesh Das (Treasurer)', residentType: 'Owner', phone: '+91 98201 44521', email: 'ramesh.das.treasurer@gmail.com', members: 4, vehicle: 'MH-04-LM-9921', status: 'Paid', paymentDate: '01 Aug 2026', utr: 'UTR89201419206', amount: 2500, duesHistory: 0 },
  { id: '202', flatNumber: '202', floor: 2, wing: 'A', ownerName: 'Rekha Surendra Nair', residentType: 'Owner', phone: '+91 98211 77202', email: 'rekha.nair@gmail.com', members: 3, vehicle: 'MH-04-NP-3322', status: 'Paid', paymentDate: '05 Aug 2026', utr: 'UTR89201419207', amount: 2500, duesHistory: 0 },
  { id: '203', flatNumber: '203', floor: 2, wing: 'A', ownerName: 'Arun B. Kapoor', residentType: 'Owner', phone: '+91 98920 88203', email: 'arunkapoor@hotmail.com', members: 4, vehicle: 'MH-04-QR-8823', status: 'Paid', paymentDate: '07 Aug 2026', utr: 'UTR89201419208', amount: 2500, duesHistory: 0 },
  { id: '204', flatNumber: '204', floor: 2, wing: 'A', ownerName: 'Sunita S. Gupta', residentType: 'Owner', phone: '+91 98334 11204', email: 'sunita.gupta@gmail.com', members: 2, vehicle: 'MH-04-ST-7724', status: 'Pending', paymentDate: null, utr: null, amount: 2500, duesHistory: 0 },
  { id: '205', flatNumber: '205', floor: 2, wing: 'A', ownerName: 'Manoj Kumar Yadav', residentType: 'Tenant', phone: '+91 98198 22205', email: 'manoj.yadav@tcs.com', members: 3, vehicle: 'MH-04-UV-6625', status: 'Overdue', paymentDate: null, utr: null, amount: 2500, duesHistory: 2500 },

  // 3rd Floor
  { id: '301', flatNumber: '301', floor: 3, wing: 'A', ownerName: 'Geeta R. Verma', residentType: 'Owner', phone: '+91 98200 44301', email: 'geeta.verma@gmail.com', members: 4, vehicle: 'MH-04-WX-1231', status: 'Paid', paymentDate: '03 Aug 2026', utr: 'UTR89201419211', amount: 2500, duesHistory: 0 },
  { id: '302', flatNumber: '302', floor: 3, wing: 'A', ownerName: 'J.P. Sharma (Chairman)', residentType: 'Owner', phone: '+91 98330 99812', email: 'jpsharma.chairman@gmail.com', members: 5, vehicle: 'MH-04-YZ-5532', status: 'Paid', paymentDate: '01 Aug 2026', utr: 'UTR89201419212', amount: 2500, duesHistory: 0 },
  { id: '303', flatNumber: '303', floor: 3, wing: 'A', ownerName: 'Kavita Anand Pandey', residentType: 'Owner', phone: '+91 98214 66303', email: 'kavita.pandey@gmail.com', members: 3, vehicle: 'MH-04-AA-9933', status: 'Paid', paymentDate: '08 Aug 2026', utr: 'UTR89201419213', amount: 2500, duesHistory: 0 },
  { id: '304', flatNumber: '304', floor: 3, wing: 'A', ownerName: 'Sanjay H. Kumar', residentType: 'Owner', phone: '+91 98199 88304', email: 'sanjay.k@infosys.com', members: 4, vehicle: 'MH-04-BB-4434', status: 'Paid', paymentDate: '10 Aug 2026', utr: 'UTR89201419214', amount: 2500, duesHistory: 0 },
  { id: '305', flatNumber: '305', floor: 3, wing: 'A', ownerName: 'Pooja Nitin Tiwari', residentType: 'Tenant', phone: '+91 98925 33305', email: 'pooja.tiwari@gmail.com', members: 2, vehicle: 'MH-04-CC-2235', status: 'Overdue', paymentDate: null, utr: null, amount: 2500, duesHistory: 7500 },

  // 4th Floor
  { id: '401', flatNumber: '401', floor: 4, wing: 'A', ownerName: 'Rohit K. Shah', residentType: 'Owner', phone: '+91 98202 11401', email: 'rohit.shah401@gmail.com', members: 3, vehicle: 'MH-04-DD-8841', status: 'Paid', paymentDate: '02 Aug 2026', utr: 'UTR89201419216', amount: 2500, duesHistory: 0 },
  { id: '402', flatNumber: '402', floor: 4, wing: 'A', ownerName: 'Meena K. Pillai', residentType: 'Owner', phone: '+91 98336 55402', email: 'meena.pillai@gmail.com', members: 2, vehicle: 'MH-04-EE-3342', status: 'Paid', paymentDate: '04 Aug 2026', utr: 'UTR89201419217', amount: 2500, duesHistory: 0 },
  { id: '403', flatNumber: '403', floor: 4, wing: 'A', ownerName: 'Rajesh S. Iyer', residentType: 'Owner', phone: '+91 98218 99403', email: 'rajesh.iyer@hcl.com', members: 4, vehicle: 'MH-04-FF-7743', status: 'Paid', paymentDate: '09 Aug 2026', utr: 'UTR89201419218', amount: 2500, duesHistory: 0 },
  { id: '404', flatNumber: '404', floor: 4, wing: 'A', ownerName: 'Usha R. Bhatt', residentType: 'Owner', phone: '+91 98191 22404', email: 'usha.bhatt@gmail.com', members: 3, vehicle: 'MH-04-GG-5544', status: 'Pending', paymentDate: null, utr: null, amount: 2500, duesHistory: 0 },
  { id: '405', flatNumber: '405', floor: 4, wing: 'A', ownerName: 'Nitin G. Chaurasia', residentType: 'Tenant', phone: '+91 98922 77405', email: 'nitin.c@gmail.com', members: 2, vehicle: 'MH-04-HH-1145', status: 'Overdue', paymentDate: null, utr: null, amount: 2500, duesHistory: 2500 },

  // 5th Floor
  { id: '501', flatNumber: '501', floor: 5, wing: 'A', ownerName: 'Shilpa V. Reddy', residentType: 'Owner', phone: '+91 98207 44501', email: 'shilpa.reddy@gmail.com', members: 4, vehicle: 'MH-04-JJ-6651', status: 'Paid', paymentDate: '06 Aug 2026', utr: 'UTR89201419221', amount: 2500, duesHistory: 0 },
  { id: '502', flatNumber: '502', floor: 5, wing: 'A', ownerName: 'Girish M. Jain', residentType: 'Owner', phone: '+91 98339 88502', email: 'girish.jain@gmail.com', members: 5, vehicle: 'MH-04-KK-9952', status: 'Paid', paymentDate: '03 Aug 2026', utr: 'UTR89201419222', amount: 2500, duesHistory: 0 },
  { id: '503', flatNumber: '503', floor: 5, wing: 'A', ownerName: 'Lata S. Nayak', residentType: 'Owner', phone: '+91 98219 11503', email: 'lata.nayak@gmail.com', members: 2, vehicle: 'MH-04-LL-2253', status: 'Paid', paymentDate: '05 Aug 2026', utr: 'UTR89201419223', amount: 2500, duesHistory: 0 },
  { id: '504', flatNumber: '504', floor: 5, wing: 'A', ownerName: 'Vijay K. Saxena', residentType: 'Owner', phone: '+91 98197 44504', email: 'vijay.saxena@gmail.com', members: 3, vehicle: 'MH-04-MM-8854', status: 'Pending', paymentDate: null, utr: null, amount: 2500, duesHistory: 0 },
  { id: '505', flatNumber: '505', floor: 5, wing: 'A', ownerName: 'Seema Thakur & Harish', residentType: 'Tenant', phone: '+91 98929 66505', email: 'harish.thakur@gmail.com', members: 3, vehicle: 'MH-04-NN-4455', status: 'Overdue', paymentDate: null, utr: null, amount: 2500, duesHistory: 5000 },
];

export const initialExpenses = [
  { id: 'exp-1', category: 'Security Services', title: 'Apex Security 24/7 Guards (2 Day + 1 Night)', amount: 22000, date: '01 Aug 2026', paidTo: 'Apex Facility Solutions', receiptNo: 'VOUCH-841', status: 'Paid via Vasai Janta Bank NEFT' },
  { id: 'exp-2', category: 'Elevator AMC', title: 'Schindler Elevator Monthly Comprehensive AMC', amount: 6500, date: '03 Aug 2026', paidTo: 'Schindler India Pvt Ltd', receiptNo: 'VOUCH-842', status: 'Paid via Cheque #49201' },
  { id: 'exp-3', category: 'Common Electricity', title: 'Adani Electricity - Common Area & Lift Meter', amount: 8420, date: '05 Aug 2026', paidTo: 'Adani Electricity Mumbai Ltd', receiptNo: 'VOUCH-843', status: 'Paid Online' },
  { id: 'exp-4', category: 'Water Tankers', title: '3 Extra Water Tankers (10,000L each)', amount: 4500, date: '08 Aug 2026', paidTo: 'Mira Road Water Supply', receiptNo: 'VOUCH-844', status: 'Paid via UPI' },
  { id: 'exp-5', category: 'Housekeeping & Sweep', title: 'Building Sweeping & Waste Collection', amount: 5000, date: '02 Aug 2026', paidTo: 'Santosh Cleaners', receiptNo: 'VOUCH-845', status: 'Paid Cash with Voucher' },
];

export const initialTransactions = [
  { id: 'tx-1', date: '10 Aug 2026', desc: 'UPI: Flat 304 Sanjay Kumar Maint Aug 26', type: 'Credit', amount: 2500, ref: 'UPI/VJSB/89201419214', balance: 384500 },
  { id: 'tx-2', date: '09 Aug 2026', desc: 'UPI: Flat 403 Rajesh Iyer Maint Aug 26', type: 'Credit', amount: 2500, ref: 'UPI/VJSB/89201419218', balance: 382000 },
  { id: 'tx-3', date: '08 Aug 2026', desc: 'UPI: Mira Road Water Supply (3 Tankers)', type: 'Debit', amount: 4500, ref: 'UPI/VJSB/TNK8844', balance: 379500 },
  { id: 'tx-4', date: '08 Aug 2026', desc: 'UPI: Flat 303 Kavita Pandey Maint Aug 26', type: 'Credit', amount: 2500, ref: 'UPI/VJSB/89201419213', balance: 384000 },
  { id: 'tx-5', date: '07 Aug 2026', desc: 'UPI: Flat 203 Arun Kapoor Maint Aug 26', type: 'Credit', amount: 2500, ref: 'UPI/VJSB/89201419208', balance: 381500 },
  { id: 'tx-6', date: '06 Aug 2026', desc: 'UPI: Flat 501 Shilpa Reddy Maint Aug 26', type: 'Credit', amount: 2500, ref: 'UPI/VJSB/89201419221', balance: 379000 },
  { id: 'tx-7', date: '05 Aug 2026', desc: 'BILLPAY: Adani Electricity Common Meter', type: 'Debit', amount: 8420, ref: 'NEFT/VJSB/ADANI8420', balance: 376500 },
];
