// Golden Nest Phase 1 — Building A (25 Flats)
// Flat numbers follow Indian CHS convention: Wing/Floor pattern
const FLAT_NUMBERS = [
  '101','102','103','104','105',
  '201','202','203','204','205',
  '301','302','303','304','305',
  '401','402','403','404','405',
  '501','502','503','504','505',
];

const OWNER_NAMES = [
  'Ramesh Sharma','Priya Mehta','Suresh Patel','Anita Joshi','Vikram Singh',
  'Rekha Nair','Arun Kapoor','Sunita Gupta','Manoj Yadav','Geeta Verma',
  'Dinesh Mishra','Kavita Pandey','Sanjay Kumar','Pooja Tiwari','Rohit Shah',
  'Meena Pillai','Rajesh Iyer','Usha Bhatt','Nitin Chaurasia','Shilpa Reddy',
  'Girish Jain','Lata Nayak','Vijay Saxena','Seema Thakur','Harish Singh',
];

const STATUSES = ['Paid','Paid','Paid','Pending','Overdue'];

export const MONTH = 'August 2026';
export const MAINTENANCE_AMOUNT = 2500;

export const mockFlats = FLAT_NUMBERS.map((num, i) => ({
  id: `flat-${num}`,
  flatNumber: num,
  wing: num.charAt(0) === '5' ? 'A5' : `A${num.charAt(0)}`,
  ownerName: OWNER_NAMES[i],
  phone: `98${String(Math.floor(Math.random() * 90000000 + 10000000))}`,
  maintenanceAmount: MAINTENANCE_AMOUNT,
  status: STATUSES[i % STATUSES.length],
  lastPaymentDate: STATUSES[i % STATUSES.length] === 'Paid'
    ? `2026-08-0${(i % 9) + 1}`.replace('0-', '-0')
    : null,
  utrNumber: STATUSES[i % STATUSES.length] === 'Paid'
    ? `UTR${Date.now().toString().slice(-8)}${i}`
    : null,
}));

export const BANK = {
  name: 'Vasai Janta Sahakari Bank',
  account: 'GOLDEN NEST PH1 CHS',
  upiId: 'goldennestph1@vjb',
  ifsc: 'VJSB0000042',
};
