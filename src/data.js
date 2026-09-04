// Sonam Palace CHS — Comprehensive Data Engine
// Structure: 32 Units (26 Residential Flats + 6 Commercial Ground Shops)
// Ground Floor: Flats 001-002, Shops S001-S006
// Floors 1 to 6: 4 flats per floor (101-104, 201-204, 301-304, 401-404, 501-504, 601-604)

export const SOCIETY_INFO = {
  name: 'Sonam Palace Co-operative Housing Society Ltd.',
  regNo: 'TNA/MRA/HSG/(TC)/14892/2004',
  address: 'Sonam Palace CHS, Mira-Bhayandar Road, Mira Road (E), Thane - 401107',
  currentBuilding: 'Sonam Palace',
  totalUnits: 32,
  flatsCount: 26,
  shopsCount: 6,
  committee: {
    treasurer: { name: 'Rajkumar Singh', flat: '401', phone: '+91 93201 77469', role: 'Building Treasurer' },
    secretary: { name: 'Mahesh K. Roy', flat: '104', phone: '+91 98192 33140', role: 'Building Secretary' },
    chairman: { name: 'J.P. Sharma', flat: '302', phone: '+91 98330 99812', role: 'Building Chairman' },
  }
};

export const BANK_INFO = {
  bankName: 'Vasai Janta Sahakari Bank Ltd.',
  branch: 'Mira Road (East) Branch',
  accountName: 'SONAM PALACE CHS MAINT A/C',
  accountNumber: '004210100049281',
  ifsc: 'VJSB0000042',
  upiId: 'sonampalace.chs@vjsb',
  currentBalance: 462500,
  sinkingFundBalance: 980000,
  repairFundBalance: 520000,
};

export const BILLING_CONFIG = {
  currentMonth: 'August 2026',
  billDate: '01 Aug 2026',
  dueDate: '15 Aug 2026',
  flatAmount: 2000,
  shopAmount: 1200,
  breakdown: {
    maintenanceFee: 1500,
    sinkingFund: 200,
    repairFund: 150,
    waterCharges: 150,
  },
  shopBreakdown: {
    maintenanceFee: 850,
    sinkingFund: 150,
    repairFund: 100,
    waterCharges: 100,
  },
  totalAmount: 2000,
  lateFeePerMonth: 100,
};

export const initialFlats = [
  // Ground Floor (Flats)
  { id: '001', flatNumber: '001', floor: 0, wing: 'A', unitType: 'Flat', ownerName: 'Nazir Loladia', residentType: 'Owner', phone: '+91 98201 00101', email: 'nazir.loladia@gmail.com', members: 4, vehicle: 'MH-04-AA-1001', status: 'Paid', paymentDate: '03 Aug 2026', utr: 'UTR89201419001', amount: 2000, duesHistory: 0 },
  { id: '002', flatNumber: '002', floor: 0, wing: 'A', unitType: 'Flat', ownerName: 'Veena Suresh Jha', residentType: 'Owner', phone: '+91 98201 00202', email: 'veena.jha002@gmail.com', members: 3, vehicle: 'MH-04-AA-1002', status: 'Paid', paymentDate: '05 Aug 2026', utr: 'UTR89201419002', amount: 2000, duesHistory: 0 },

  // 1st Floor
  { id: '101', flatNumber: '101', floor: 1, wing: 'A', unitType: 'Flat', ownerName: 'Rasida Mehboob Loladia', residentType: 'Owner', phone: '+91 98201 10101', email: 'rasida.loladia101@gmail.com', members: 4, vehicle: 'MH-04-AB-1101', status: 'Paid', paymentDate: '04 Aug 2026', utr: 'UTR89201419101', amount: 2000, duesHistory: 0 },
  { id: '102', flatNumber: '102', floor: 1, wing: 'A', unitType: 'Flat', ownerName: 'Prakashi Soni & Rashmi P. Soni', residentType: 'Owner', phone: '+91 98190 10202', email: 'prakashi.soni102@yahoo.co.in', members: 3, vehicle: 'MH-04-CD-1102', status: 'Paid', paymentDate: '02 Aug 2026', utr: 'UTR89201419102', amount: 2000, duesHistory: 0 },
  { id: '103', flatNumber: '103', floor: 1, wing: 'A', unitType: 'Flat', ownerName: 'Arun Kumar Mondal', residentType: 'Owner', phone: '+91 98205 10303', email: 'arun.mondal103@gmail.com', members: 4, vehicle: 'MH-04-EF-1103', status: 'Paid', paymentDate: '06 Aug 2026', utr: 'UTR89201419103', amount: 2000, duesHistory: 0 },
  { id: '104', flatNumber: '104', floor: 1, wing: 'A', unitType: 'Flat', ownerName: 'Akshay Sajeev Wagle & JT', residentType: 'Owner', phone: '+91 76009 39217', email: 'akshay.wagle104@gmail.com', members: 3, vehicle: 'MH-04-GH-1104', status: 'Pending', paymentDate: null, utr: null, amount: 2000, duesHistory: 0 },

  // 2nd Floor
  { id: '201', flatNumber: '201', floor: 2, wing: 'A', unitType: 'Flat', ownerName: 'Bijendra Rana', residentType: 'Owner', phone: '+91 98211 20101', email: 'bijendra.rana201@gmail.com', members: 4, vehicle: 'MH-04-LM-2201', status: 'Paid', paymentDate: '01 Aug 2026', utr: 'UTR89201419201', amount: 2000, duesHistory: 0 },
  { id: '202', flatNumber: '202', floor: 2, wing: 'A', unitType: 'Flat', ownerName: 'S.S Negi', residentType: 'Owner', phone: '+91 98211 20202', email: 'ss.negi202@gmail.com', members: 3, vehicle: 'MH-04-NP-2202', status: 'Paid', paymentDate: '05 Aug 2026', utr: 'UTR89201419202', amount: 2000, duesHistory: 0 },
  { id: '203', flatNumber: '203', floor: 2, wing: 'A', unitType: 'Flat', ownerName: 'Deepaksingh S. Rawat', residentType: 'Owner', phone: '+91 98920 20303', email: 'deepak.rawat203@hotmail.com', members: 4, vehicle: 'MH-04-QR-2203', status: 'Paid', paymentDate: '07 Aug 2026', utr: 'UTR89201419203', amount: 2000, duesHistory: 0 },
  { id: '204', flatNumber: '204', floor: 2, wing: 'A', unitType: 'Flat', ownerName: 'Mr Vivek R. Singh and Mrs Preeti V. Singh', residentType: 'Owner', phone: '+91 98334 20404', email: 'vivek.singh204@gmail.com', members: 3, vehicle: 'MH-04-ST-2204', status: 'Pending', paymentDate: null, utr: null, amount: 2000, duesHistory: 0 },

  // 3rd Floor
  { id: '301', flatNumber: '301', floor: 3, wing: 'A', unitType: 'Flat', ownerName: 'Hayat Singh Rana', residentType: 'Owner', phone: '+91 98200 30101', email: 'hayat.rana301@gmail.com', members: 4, vehicle: 'MH-04-WX-3301', status: 'Paid', paymentDate: '03 Aug 2026', utr: 'UTR89201419301', amount: 2000, duesHistory: 0 },
  { id: '302', flatNumber: '302', floor: 3, wing: 'A', unitType: 'Flat', ownerName: 'Sanjay Singh Rawat & Maya Sanjay Rawat', residentType: 'Owner', phone: '+91 98330 30202', email: 'sanjay.rawat302@gmail.com', members: 5, vehicle: 'MH-04-YZ-3302', status: 'Paid', paymentDate: '01 Aug 2026', utr: 'UTR89201419302', amount: 2000, duesHistory: 0 },
  { id: '303', flatNumber: '303', floor: 3, wing: 'A', unitType: 'Flat', ownerName: 'Harbajan Singh', residentType: 'Owner', phone: '+91 98214 30303', email: 'harbajan.singh303@gmail.com', members: 4, vehicle: 'MH-04-AA-3303', status: 'Paid', paymentDate: '08 Aug 2026', utr: 'UTR89201419303', amount: 2000, duesHistory: 0 },
  { id: '304', flatNumber: '304', floor: 3, wing: 'A', unitType: 'Flat', ownerName: 'Pancham Singh Rawat', residentType: 'Owner', phone: '+91 98199 30404', email: 'pancham.rawat304@gmail.com', members: 4, vehicle: 'MH-04-BB-3304', status: 'Overdue', paymentDate: null, utr: null, amount: 2000, duesHistory: 4000 },

  // 4th Floor
  { id: '401', flatNumber: '401', floor: 4, wing: 'A', unitType: 'Flat', ownerName: 'Rajkumar Singh & Rajnibala (Treasurer)', residentType: 'Owner', phone: '+91 93201 77469', email: 'rajkumar.singh.treasurer@gmail.com', members: 4, vehicle: 'MH-04-DD-4401', status: 'Paid', paymentDate: '01 Aug 2026', utr: 'UTR89201419401', amount: 2000, duesHistory: 0 },
  { id: '402', flatNumber: '402', floor: 4, wing: 'A', unitType: 'Flat', ownerName: 'Suman B. Yadav', residentType: 'Owner', phone: '+91 98336 40202', email: 'suman.yadav402@gmail.com', members: 3, vehicle: 'MH-04-EE-4402', status: 'Paid', paymentDate: '04 Aug 2026', utr: 'UTR89201419402', amount: 2000, duesHistory: 0 },
  { id: '403', flatNumber: '403', floor: 4, wing: 'A', unitType: 'Flat', ownerName: 'Vimla Chowbe', residentType: 'Owner', phone: '+91 98218 40303', email: 'vimla.chowbe403@gmail.com', members: 3, vehicle: 'MH-04-FF-4403', status: 'Paid', paymentDate: '09 Aug 2026', utr: 'UTR89201419403', amount: 2000, duesHistory: 0 },
  { id: '404', flatNumber: '404', floor: 4, wing: 'A', unitType: 'Flat', ownerName: 'Kumud Niwas & Lalita Niwas', residentType: 'Owner', phone: '+91 98191 40404', email: 'kumud.niwas404@gmail.com', members: 4, vehicle: 'MH-04-GG-4404', status: 'Pending', paymentDate: null, utr: null, amount: 2000, duesHistory: 0 },

  // 5th Floor
  { id: '501', flatNumber: '501', floor: 5, wing: 'A', unitType: 'Flat', ownerName: 'Arun Kumar Mondal', residentType: 'Owner', phone: '+91 98207 50101', email: 'arun.mondal501@gmail.com', members: 4, vehicle: 'MH-04-JJ-5501', status: 'Paid', paymentDate: '06 Aug 2026', utr: 'UTR89201419501', amount: 2000, duesHistory: 0 },
  { id: '502', flatNumber: '502', floor: 5, wing: 'A', unitType: 'Flat', ownerName: 'Sabiya Kalim Khan', residentType: 'Owner', phone: '+91 98339 50202', email: 'sabiya.khan502@gmail.com', members: 5, vehicle: 'MH-04-KK-5502', status: 'Paid', paymentDate: '03 Aug 2026', utr: 'UTR89201419502', amount: 2000, duesHistory: 0 },
  { id: '503', flatNumber: '503', floor: 5, wing: 'A', unitType: 'Flat', ownerName: 'Subhadradevi H. Kotgwal', residentType: 'Owner', phone: '+91 98219 50303', email: 'subhadradevi.kotgwal503@gmail.com', members: 3, vehicle: 'MH-04-LL-5503', status: 'Paid', paymentDate: '05 Aug 2026', utr: 'UTR89201419503', amount: 2000, duesHistory: 0 },
  { id: '504', flatNumber: '504', floor: 5, wing: 'A', unitType: 'Flat', ownerName: 'Suresh Kumar Jha', residentType: 'Owner', phone: '+91 98197 50404', email: 'suresh.jha504@gmail.com', members: 3, vehicle: 'MH-04-MM-5504', status: 'Pending', paymentDate: null, utr: null, amount: 2000, duesHistory: 0 },

  // 6th Floor
  { id: '601', flatNumber: '601', floor: 6, wing: 'A', unitType: 'Flat', ownerName: 'Roopesh Rane', residentType: 'Owner', phone: '+91 98202 60101', email: 'roopesh.rane601@gmail.com', members: 4, vehicle: 'MH-04-NN-6601', status: 'Paid', paymentDate: '02 Aug 2026', utr: 'UTR89201419601', amount: 2000, duesHistory: 0 },
  { id: '602', flatNumber: '602', floor: 6, wing: 'A', unitType: 'Flat', ownerName: 'Ravi P. Purohit', residentType: 'Owner', phone: '+91 98336 60202', email: 'ravi.purohit602@gmail.com', members: 3, vehicle: 'MH-04-PP-6602', status: 'Paid', paymentDate: '04 Aug 2026', utr: 'UTR89201419602', amount: 2000, duesHistory: 0 },
  { id: '603', flatNumber: '603', floor: 6, wing: 'A', unitType: 'Flat', ownerName: 'Wasudev Kelkar', residentType: 'Owner', phone: '+91 98218 60303', email: 'wasudev.kelkar603@gmail.com', members: 3, vehicle: 'MH-04-RR-6603', status: 'Paid', paymentDate: '07 Aug 2026', utr: 'UTR89201419603', amount: 2000, duesHistory: 0 },
  { id: '604', flatNumber: '604', floor: 6, wing: 'A', unitType: 'Flat', ownerName: 'Irfan Ansar Ahmed Shaikh', residentType: 'Owner', phone: '+91 98922 60404', email: 'irfan.shaikh604@gmail.com', members: 4, vehicle: 'MH-04-SS-6604', status: 'Overdue', paymentDate: null, utr: null, amount: 2000, duesHistory: 4000 },

  // Commercial Shops (Ground Floor)
  { id: 'S001', flatNumber: 'S-01', code: 'S001', floor: 'Shop', wing: 'Comm', unitType: 'Shop', shopNumber: 'Shop 1', ownerName: 'Kruparam', residentType: 'Commercial', phone: '+91 98200 90001', email: 'kruparam.shop1@gmail.com', members: 2, vehicle: 'MH-04-TT-9001', status: 'Paid', paymentDate: '01 Aug 2026', utr: 'UTR89201419S01', amount: 1200, duesHistory: 0 },
  { id: 'S002', flatNumber: 'S-02', code: 'S002', floor: 'Shop', wing: 'Comm', unitType: 'Shop', shopNumber: 'Shop 2', ownerName: 'Mr. Kruparam', residentType: 'Commercial', phone: '+91 98200 90002', email: 'kruparam.shop2@gmail.com', members: 2, vehicle: 'MH-04-TT-9002', status: 'Paid', paymentDate: '05 Aug 2026', utr: 'UTR89201419S02', amount: 1200, duesHistory: 0 },
  { id: 'S003', flatNumber: 'S-03', code: 'S003', floor: 'Shop', wing: 'Comm', unitType: 'Shop', shopNumber: 'Shop 3', ownerName: 'Phir Ahmad Shaikh', residentType: 'Commercial', phone: '+91 98200 90003', email: 'phir.shaikh.shop3@gmail.com', members: 3, vehicle: 'MH-04-UU-9003', status: 'Pending', paymentDate: null, utr: null, amount: 1200, duesHistory: 0 },
  { id: 'S004', flatNumber: 'S-04', code: 'S004', floor: 'Shop', wing: 'Comm', unitType: 'Shop', shopNumber: 'Shop 4', ownerName: 'Tabrez P. Shaikh & Rizwana Tabrez', residentType: 'Commercial', phone: '+91 98200 90004', email: 'tabrez.shaikh.shop4@gmail.com', members: 2, vehicle: 'MH-04-VV-9004', status: 'Paid', paymentDate: '08 Aug 2026', utr: 'UTR89201419S04', amount: 1200, duesHistory: 0 },
  { id: 'S005', flatNumber: 'S-05', code: 'S005', floor: 'Shop', wing: 'Comm', unitType: 'Shop', shopNumber: 'Shop 5', ownerName: 'Santosh A Kolhe Patil & Mrs. Sayali S. Kolhe Patil', residentType: 'Commercial', phone: '+91 98200 90005', email: 'santosh.kolhe.shop5@gmail.com', members: 2, vehicle: 'MH-04-WW-9005', status: 'Pending', paymentDate: null, utr: null, amount: 1200, duesHistory: 0 },
  { id: 'S006', flatNumber: 'S-06', code: 'S006', floor: 'Shop', wing: 'Comm', unitType: 'Shop', shopNumber: 'Shop 6', ownerName: 'Mahendra .B.Bhoite & Sandhya. M. Bhoite', residentType: 'Commercial', phone: '+91 98200 90006', email: 'mahendra.bhoite.shop6@gmail.com', members: 2, vehicle: 'MH-04-XX-9006', status: 'Paid', paymentDate: '02 Aug 2026', utr: 'UTR89201419S06', amount: 1200, duesHistory: 0 },
];

export const initialExpenses = [
  { id: 'exp-1', category: 'Security Services', title: 'Apex Security 24/7 Guards (2 Day + 1 Night)', amount: 22000, date: '01 Aug 2026', paidTo: 'Apex Facility Solutions', receiptNo: 'VOUCH-841', status: 'Paid via Vasai Janta Bank NEFT' },
  { id: 'exp-2', category: 'Elevator AMC', title: 'Schindler Elevator Monthly Comprehensive AMC', amount: 6500, date: '03 Aug 2026', paidTo: 'Schindler India Pvt Ltd', receiptNo: 'VOUCH-842', status: 'Paid via Cheque #49201' },
  { id: 'exp-3', category: 'Common Electricity', title: 'Adani Electricity - Common Area & Lift Meter', amount: 8420, date: '05 Aug 2026', paidTo: 'Adani Electricity Mumbai Ltd', receiptNo: 'VOUCH-843', status: 'Paid Online' },
  { id: 'exp-4', category: 'Water Tankers', title: '3 Extra Water Tankers (10,000L each)', amount: 4500, date: '08 Aug 2026', paidTo: 'Mira Road Water Supply', receiptNo: 'VOUCH-844', status: 'Paid via UPI' },
  { id: 'exp-5', category: 'Housekeeping & Sweep', title: 'Building Sweeping & Waste Collection', amount: 5000, date: '02 Aug 2026', paidTo: 'Santosh Cleaners', receiptNo: 'VOUCH-845', status: 'Paid Cash with Voucher' },
];

export const initialTransactions = [
  { id: 'tx-1', date: '09 Aug 2026', desc: 'UPI: Flat 403 Vimla Chowbe Maint Aug 26', type: 'Credit', amount: 2000, ref: 'UPI/VJSB/89201419403', balance: 462500 },
  { id: 'tx-2', date: '08 Aug 2026', desc: 'UPI: Shop S-04 Tabrez Shaikh Maint Aug 26', type: 'Credit', amount: 1200, ref: 'UPI/VJSB/89201419S04', balance: 460500 },
  { id: 'tx-3', date: '08 Aug 2026', desc: 'UPI: Mira Road Water Supply (3 Tankers)', type: 'Debit', amount: 4500, ref: 'UPI/VJSB/TNK8844', balance: 459300 },
  { id: 'tx-4', date: '08 Aug 2026', desc: 'UPI: Flat 303 Harbajan Singh Maint Aug 26', type: 'Credit', amount: 2000, ref: 'UPI/VJSB/89201419303', balance: 463800 },
  { id: 'tx-5', date: '07 Aug 2026', desc: 'UPI: Flat 203 Deepaksingh Rawat Maint Aug 26', type: 'Credit', amount: 2000, ref: 'UPI/VJSB/89201419203', balance: 461800 },
  { id: 'tx-6', date: '06 Aug 2026', desc: 'UPI: Flat 501 Arun Mondal Maint Aug 26', type: 'Credit', amount: 2000, ref: 'UPI/VJSB/89201419501', balance: 459800 },
  { id: 'tx-7', date: '05 Aug 2026', desc: 'BILLPAY: Adani Electricity Common Meter', type: 'Debit', amount: 8420, ref: 'NEFT/VJSB/ADANI8420', balance: 457800 },
  { id: 'tx-8', date: '01 Aug 2026', desc: 'UPI: Flat 401 Rajkumar Singh Maint Aug 26', type: 'Credit', amount: 2000, ref: 'UPI/VJSB/89201419401', balance: 466220 },
  { id: 'tx-9', date: '01 Aug 2026', desc: 'UPI: Shop S-01 Kruparam Maint Aug 26', type: 'Credit', amount: 1200, ref: 'UPI/VJSB/89201419S01', balance: 464220 },
];
