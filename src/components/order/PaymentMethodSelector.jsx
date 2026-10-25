import React, { useState } from 'react'
import { PAYMENT_ACCOUNTS, TOKEN_ADVANCE_AMOUNT } from '@/config/paymentConfig'
import { copyText } from '@/utils/clipboard'
import { formatPKR } from '@/utils/vehicleUtils'
import { SlipUploader } from './SlipUploader'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Building2, Wallet, Truck, Check, Copy } from 'lucide-react'

export function PaymentMethodSelector({
  paymentPlan,
  onChangePaymentPlan,
  paymentChannel,
  onChangePaymentChannel,
  payableNow,
  remainingBalance,
  totalPrice,
  transactionId,
  onChangeTransactionId,
  senderAccount,
  onChangeSenderAccount,
  receiptFile,
  receiptPreview,
  onFileChange,
  onRemoveReceipt,
}) {
  const [copiedKey, setCopiedKey] = useState(null)

  const handleCopy = async (key, text) => {
    const success = await copyText(text)
    if (success) {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  const bank = PAYMENT_ACCOUNTS.bank_transfer
  const jazzcash = PAYMENT_ACCOUNTS.jazzcash
  const easypaisa = PAYMENT_ACCOUNTS.easypaisa
  const cod = PAYMENT_ACCOUNTS.cash_on_delivery

  return (
    <div className="space-y-6 pt-4 border-t border-[#e5e2d8]">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#1a1918] font-bold flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[#a82323]" />
          <span>Step 3: Payment Plan & Online Method *</span>
        </div>
        <p className="font-serif italic text-xs text-stone-600 mt-1">
          Choose whether to allocate an advance booking token or full amount, then select your verified payment channel.
        </p>
      </div>

      {/* Part A: Choose Payment Plan */}
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-wider text-stone-600 block">
          Select Payment Terms:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Token Option */}
          <div
            onClick={() => onChangePaymentPlan('booking_token')}
            className={`p-4 border cursor-pointer transition-all ${
              paymentPlan === 'booking_token'
                ? 'border-[#1a1918] bg-[#faf9f5] ring-1 ring-[#1a1918] shadow-sm'
                : 'border-[#e5e2d8] bg-white hover:border-[#1a1918]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1a1918] uppercase font-mono text-xs">
                Advance Booking Token
              </span>
              <Badge className="bg-[#a82323] text-white font-mono text-[9px] uppercase tracking-wider">
                Popular Choice
              </Badge>
            </div>
            <div className="text-2xl font-serif font-bold text-[#1a1918] mt-2">
              {formatPKR(TOKEN_ADVANCE_AMOUNT)}
            </div>
            <div className="text-[11px] font-mono text-stone-500 mt-1">
              Pay PKR 25,000 today to lock your motorcycle unit in the assembly queue. Remaining {formatPKR(remainingBalance)} payable at delivery / showroom handover.
            </div>
          </div>

          {/* Full Payment Option */}
          <div
            onClick={() => onChangePaymentPlan('full_payment')}
            className={`p-4 border cursor-pointer transition-all ${
              paymentPlan === 'full_payment'
                ? 'border-[#1a1918] bg-[#faf9f5] ring-1 ring-[#1a1918] shadow-sm'
                : 'border-[#e5e2d8] bg-white hover:border-[#1a1918]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1a1918] uppercase font-mono text-xs">
                Full Settlement (100%)
              </span>
              <Badge className="bg-[#1a1918] text-white font-mono text-[9px] uppercase tracking-wider">
                Priority Dispatch
              </Badge>
            </div>
            <div className="text-2xl font-serif font-bold text-[#1a1918] mt-2">
              {formatPKR(totalPrice)}
            </div>
            <div className="text-[11px] font-mono text-stone-500 mt-1">
              Pay 100% upfront for expedited VIP factory clearance, instant allotment, and express insured nationwide dispatch.
            </div>
          </div>
        </div>
      </div>

      {/* Part B: Choose Payment Channel */}
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-wider text-stone-600 block">
          Select Payment Channel:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* 1. Meezan Bank */}
          <button
            type="button"
            onClick={() => onChangePaymentChannel('bank_transfer')}
            className={`p-3 border text-left cursor-pointer transition-all flex flex-col justify-between h-24 ${
              paymentChannel === 'bank_transfer'
                ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f5] ring-1 ring-[#1a1918] shadow-sm'
                : 'border-[#e5e2d8] bg-white text-[#1a1918] hover:border-[#1a1918]'
            }`}
          >
            <Building2 className="h-5 w-5 mb-1" />
            <div>
              <div className="font-mono font-bold text-xs uppercase leading-tight">{bank.name}</div>
              <div className="font-mono text-[10px] opacity-75">{bank.subtitle}</div>
            </div>
          </button>

          {/* 2. JazzCash */}
          <button
            type="button"
            onClick={() => onChangePaymentChannel('jazzcash')}
            className={`p-3 border text-left cursor-pointer transition-all flex flex-col justify-between h-24 ${
              paymentChannel === 'jazzcash'
                ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f5] ring-1 ring-[#1a1918] shadow-sm'
                : 'border-[#e5e2d8] bg-white text-[#1a1918] hover:border-[#1a1918]'
            }`}
          >
            <Wallet className="h-5 w-5 mb-1 text-[#a82323]" />
            <div>
              <div className="font-mono font-bold text-xs uppercase leading-tight">{jazzcash.name}</div>
              <div className="font-mono text-[10px] opacity-75">{jazzcash.subtitle}</div>
            </div>
          </button>

          {/* 3. EasyPaisa */}
          <button
            type="button"
            onClick={() => onChangePaymentChannel('easypaisa')}
            className={`p-3 border text-left cursor-pointer transition-all flex flex-col justify-between h-24 ${
              paymentChannel === 'easypaisa'
                ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f5] ring-1 ring-[#1a1918] shadow-sm'
                : 'border-[#e5e2d8] bg-white text-[#1a1918] hover:border-[#1a1918]'
            }`}
          >
            <Wallet className="h-5 w-5 mb-1 text-emerald-600" />
            <div>
              <div className="font-mono font-bold text-xs uppercase leading-tight">{easypaisa.name}</div>
              <div className="font-mono text-[10px] opacity-75">{easypaisa.subtitle}</div>
            </div>
          </button>

          {/* 4. Cash on Delivery */}
          <button
            type="button"
            onClick={() => onChangePaymentChannel('cash_on_delivery')}
            className={`p-3 border text-left cursor-pointer transition-all flex flex-col justify-between h-24 ${
              paymentChannel === 'cash_on_delivery'
                ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f5] ring-1 ring-[#1a1918] shadow-sm'
                : 'border-[#e5e2d8] bg-white text-[#1a1918] hover:border-[#1a1918]'
            }`}
          >
            <Truck className="h-5 w-5 mb-1" />
            <div>
              <div className="font-mono font-bold text-xs uppercase leading-tight">{cod.name}</div>
              <div className="font-mono text-[10px] opacity-75">{cod.subtitle}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Part C: Dynamic Account Details */}
      {paymentChannel === 'bank_transfer' && (
        <div className="border border-neutral-300 bg-[#f9f9f9] p-5 space-y-4 font-mono text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-neutral-300 pb-2">
            <span className="font-bold text-black uppercase flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Official Corporate Bank Details ({bank.name})
            </span>
            <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold uppercase">
              {bank.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-700">
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">Account Title</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{bank.accountTitle}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('title', bank.accountTitle)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'title' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">Bank & Branch</span>
              <div className="font-bold text-black mt-0.5">{bank.bankName}</div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">Account Number</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{bank.accountNumber}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('acc', bank.accountNumberRaw)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'acc' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">IBAN Number (1Link)</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black text-[11px]">{bank.iban}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('iban', bank.iban)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'iban' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-2.5 text-[11px] text-yellow-800 flex items-center justify-between">
            <span>Amount to transfer via your Banking App / ATM:</span>
            <strong className="text-black text-sm">{formatPKR(payableNow)}</strong>
          </div>
        </div>
      )}

      {paymentChannel === 'jazzcash' && (
        <div className="border border-neutral-300 bg-[#f9f9f9] p-5 space-y-4 font-mono text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-neutral-300 pb-2">
            <span className="font-bold text-black uppercase flex items-center gap-2">
              <Wallet className="h-4 w-4 text-red-600" />
              Official JazzCash Account Details
            </span>
            <span className="text-[10px] text-red-700 bg-red-100 px-2 py-0.5 rounded font-bold uppercase">
              {jazzcash.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-700">
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">Account Title</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{jazzcash.accountTitle}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('jc_title', jazzcash.accountTitle)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'jc_title' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">JazzCash Mobile Number</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{jazzcash.mobileNumber}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('jc_num', jazzcash.mobileNumberRaw)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'jc_num' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">Till / Merchant ID</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{jazzcash.tillId}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('jc_till', jazzcash.tillId)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'jc_till' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-2.5 text-[11px] text-red-900 flex items-center justify-between">
            <span>{jazzcash.instruction}</span>
            <strong className="text-black text-sm">{formatPKR(payableNow)}</strong>
          </div>
        </div>
      )}

      {paymentChannel === 'easypaisa' && (
        <div className="border border-neutral-300 bg-[#f9f9f9] p-5 space-y-4 font-mono text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-neutral-300 pb-2">
            <span className="font-bold text-black uppercase flex items-center gap-2">
              <Wallet className="h-4 w-4 text-green-600" />
              Official EasyPaisa Account Details
            </span>
            <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold uppercase">
              {easypaisa.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-700">
            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">Account Title</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{easypaisa.accountTitle}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('ep_title', easypaisa.accountTitle)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'ep_title' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-neutral-200">
              <span className="text-[10px] text-neutral-400 uppercase block">EasyPaisa Mobile Number</span>
              <div className="flex items-center justify-between mt-0.5">
                <span className="font-bold text-black">{easypaisa.mobileNumber}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('ep_num', easypaisa.mobileNumberRaw)}
                  className="text-neutral-500 hover:text-black p-1 cursor-pointer"
                >
                  {copiedKey === 'ep_num' ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-2.5 text-[11px] text-green-900 flex items-center justify-between">
            <span>{easypaisa.instruction}</span>
            <strong className="text-black text-sm">{formatPKR(payableNow)}</strong>
          </div>
        </div>
      )}

      {paymentChannel === 'cash_on_delivery' && (
        <div className="border border-neutral-300 bg-[#f9f9f9] p-5 space-y-2 font-mono text-xs animate-in fade-in">
          <div className="font-bold text-black uppercase flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Cash on Handover / Showroom Collection Protocol</span>
          </div>
          <p className="text-[11px] text-neutral-600 leading-relaxed">{cod.protocol}</p>
          <div className="pt-1 flex items-center justify-between border-t border-neutral-200 text-[11px]">
            <span className="text-neutral-500">Payable at Handover:</span>
            <strong className="text-black text-sm">{formatPKR(totalPrice)}</strong>
          </div>
        </div>
      )}

      {/* Part D: Transaction ID & Slip Uploader */}
      {paymentChannel !== 'cash_on_delivery' && (
        <div className="space-y-4 pt-2 border-t border-dashed border-neutral-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-wider text-black flex items-center gap-1.5 font-bold">
                <span>Transaction ID / Ref # (TID) *</span>
              </label>
              <Input
                type="text"
                value={transactionId}
                onChange={(e) => onChangeTransactionId(e.target.value)}
                placeholder="e.g. MEZN12345678 or 849201920"
                className="bg-white border-neutral-300 font-mono text-xs h-11"
              />
              <p className="font-mono text-[10px] text-neutral-400">
                Enter the Reference/TID from your bank or wallet transfer receipt.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-wider text-black flex items-center gap-1.5 font-bold">
                <span>Sender Account Title / Mobile # (Optional)</span>
              </label>
              <Input
                type="text"
                value={senderAccount}
                onChange={(e) => onChangeSenderAccount(e.target.value)}
                placeholder="e.g. Tariq Mehmood or 0300-1234567"
                className="bg-white border-neutral-300 font-mono text-xs h-11"
              />
              <p className="font-mono text-[10px] text-neutral-400">
                Helps finance match your transaction faster.
              </p>
            </div>
          </div>

          <SlipUploader
            receiptFile={receiptFile}
            receiptPreview={receiptPreview}
            onFileChange={onFileChange}
            onRemoveReceipt={onRemoveReceipt}
          />
        </div>
      )}
    </div>
  )
}
