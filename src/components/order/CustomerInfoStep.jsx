import React from 'react'
import { Input } from '@/components/ui/input'
import { CITIES } from '@/config/paymentConfig'
import { User, Phone, Mail, MapPin, Truck } from 'lucide-react'

export function CustomerInfoStep({ register, errors, deliveryMethod }) {
  return (
    <div className="space-y-4">
      <div className="border-b border-[#e5e2d8] pb-3 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1918] font-bold">
        Step 2: Customer & Delivery Details
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-stone-500" />
            <span>Full Legal Name *</span>
          </label>
          <Input
            {...register('fullName')}
            placeholder="As per Government CNIC"
            className="bg-white border-[#d6d1c4] font-mono text-xs h-11 focus:border-[#1a1918]"
          />
          {errors.fullName && (
            <p className="font-mono text-[11px] text-[#a82323]">{errors.fullName.message}</p>
          )}
        </div>

        {/* CNIC */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <span>CNIC Number (13 Digits) *</span>
          </label>
          <Input
            {...register('cnic')}
            placeholder="42101-1234567-1"
            className="bg-white border-[#d6d1c4] font-mono text-xs h-11 focus:border-[#1a1918]"
          />
          {errors.cnic && (
            <p className="font-mono text-[11px] text-[#a82323]">{errors.cnic.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WhatsApp / Phone */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-stone-500" />
            <span>Mobile / WhatsApp Number *</span>
          </label>
          <Input
            {...register('phone')}
            placeholder="0300-1234567"
            className="bg-white border-[#d6d1c4] font-mono text-xs h-11 focus:border-[#1a1918]"
          />
          {errors.phone && (
            <p className="font-mono text-[11px] text-[#a82323]">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-stone-500" />
            <span>Email Address (for Invoice) *</span>
          </label>
          <Input
            {...register('email')}
            type="email"
            placeholder="buyer@example.com"
            className="bg-white border-[#d6d1c4] font-mono text-xs h-11 focus:border-[#1a1918]"
          />
          {errors.email && (
            <p className="font-mono text-[11px] text-[#a82323]">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Delivery Mode Selection */}
      <div className="space-y-2 pt-1">
        <label className="font-mono text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
          <Truck className="h-3.5 w-3.5 text-stone-500" />
          <span>Fulfillment & Delivery Method *</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
              deliveryMethod === 'home_delivery'
                ? 'border-[#1a1918] bg-[#faf9f5] shadow-sm ring-1 ring-[#1a1918]'
                : 'border-[#e5e2d8] bg-white'
            }`}
          >
            <input type="radio" value="home_delivery" {...register('deliveryMethod')} className="mt-1" />
            <div className="font-mono text-xs">
              <div className="font-bold text-[#1a1918] uppercase">Doorstep Home Delivery</div>
              <div className="text-[11px] text-stone-500">Insured truck carrier across Pakistan</div>
              <div className="font-bold text-[#a82323] mt-1">+ PKR 5,000</div>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
              deliveryMethod === 'showroom_pickup'
                ? 'border-[#1a1918] bg-[#faf9f5] shadow-sm ring-1 ring-[#1a1918]'
                : 'border-[#e5e2d8] bg-white'
            }`}
          >
            <input type="radio" value="showroom_pickup" {...register('deliveryMethod')} className="mt-1" />
            <div className="font-mono text-xs">
              <div className="font-bold text-[#1a1918] uppercase">Showroom Collection</div>
              <div className="text-[11px] text-stone-500">Karachi, Lahore, or Islamabad 3S Center</div>
              <div className="font-bold text-stone-700 mt-1">COMPLIMENTARY (PKR 0)</div>
            </div>
          </label>
        </div>
      </div>

      {/* City and Address */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5 sm:col-span-1">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-700">City *</label>
          <select
            {...register('city')}
            className="w-full h-11 px-3 bg-white border border-[#d6d1c4] font-mono text-xs text-[#1a1918] focus:outline-none focus:border-[#1a1918]"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-mono text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-stone-500" />
            <span>Delivery Address *</span>
          </label>
          <Input
            {...register('address')}
            placeholder="House / Street / Area / Sector"
            className="bg-white border-[#d6d1c4] font-mono text-xs h-11 focus:border-[#1a1918]"
          />
          {errors.address && (
            <p className="font-mono text-[11px] text-[#a82323]">{errors.address.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
