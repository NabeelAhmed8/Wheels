// Centralized payment configuration and account credentials
export const TOKEN_ADVANCE_AMOUNT = 25000
export const HOME_DELIVERY_FEE = 5000

export const PAYMENT_ACCOUNTS = {
  bank_transfer: {
    channel: 'bank_transfer',
    name: 'Meezan Bank',
    subtitle: 'Online IBFT / Wire',
    badge: 'Instant IBFT Active',
    accountTitle: 'MOTORCYCLE FLEET (PVT) LTD',
    bankName: 'Meezan Bank Ltd (Main Shahrah-e-Faisal)',
    accountNumber: '0104-0105829101',
    accountNumberRaw: '01040105829101',
    iban: 'PK36MEZN0001040105829101',
    instruction: 'Transfer via your Banking App / ATM referencing your order.',
  },
  jazzcash: {
    channel: 'jazzcash',
    name: 'JazzCash',
    subtitle: 'Wallet & Till ID',
    badge: 'Instant Verified Wallet',
    accountTitle: 'MOTORCYCLE FLEET',
    mobileNumber: '0300-8274619',
    mobileNumberRaw: '03008274619',
    tillId: '009842',
    instruction: 'Transfer via JazzCash mobile app or dial *786#.',
  },
  easypaisa: {
    channel: 'easypaisa',
    name: 'EasyPaisa',
    subtitle: 'Mobile Wallet',
    badge: 'Instant Verified Wallet',
    accountTitle: 'MOTORCYCLE FLEET',
    mobileNumber: '0345-8274619',
    mobileNumberRaw: '03458274619',
    instruction: 'Transfer via EasyPaisa mobile app or dial *786#.',
  },
  cash_on_delivery: {
    channel: 'cash_on_delivery',
    name: 'Cash on Handover',
    subtitle: 'Delivery / Showroom',
    protocol:
      'Your order will be logged as pending confirmation. Operations will call your WhatsApp to verify your CNIC before dispatch. You can inspect the vehicle and verify chassis numbers before making payment via Cash or Bank Pay Order.',
  },
}

export const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Other City',
]
