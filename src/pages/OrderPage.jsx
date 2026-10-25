import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import dayjs from 'dayjs'
import { submitOrder } from '@/services/api'
import { useVehicles } from '@/hooks/useVehicles'
import { TOKEN_ADVANCE_AMOUNT, HOME_DELIVERY_FEE } from '@/config/paymentConfig'
import { getBikeImage } from '@/utils/vehicleUtils'
import { VehicleSelectStep } from '@/components/order/VehicleSelectStep'
import { CustomerInfoStep } from '@/components/order/CustomerInfoStep'
import { PaymentMethodSelector } from '@/components/order/PaymentMethodSelector'
import { OrderCartSidebar } from '@/components/order/OrderCartSidebar'
import { OrderInvoiceModal } from '@/components/order/OrderInvoiceModal'
import { ServerOfflineNotice } from '@/components/common/ServerOfflineNotice'
import { LoadingNotice } from '@/components/common/LoadingNotice'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Loader2 } from 'lucide-react'

const orderSchema = z.object({
  fullName: z.string().min(3, 'Full legal name must be at least 3 characters'),
  cnic: z.string().min(13, 'Please enter a valid CNIC (13 digits)'),
  phone: z.string().min(10, 'Please enter a valid WhatsApp / contact number'),
  email: z.string().email('Please enter a valid email address'),
  city: z.string().min(2, 'Please select or enter your delivery city'),
  address: z.string().min(8, 'Please provide your full delivery address'),
  deliveryMethod: z.enum(['home_delivery', 'showroom_pickup']),
  notes: z.string().optional(),
})

export function OrderPage() {
  const location = useLocation()
  const preselectedSlug =
    location.state?.selectedModel?.slug ||
    location.state?.selectedModel?.id ||
    'zoom-2000w'
  const preselectedBattery = location.state?.battery || '30Ah'
  const preselectedColor = location.state?.color || 'red'

  // Model & Backend Data Sync
  const { vehicles, loading: loadingVehicles, isOffline, refetch: fetchVehicles } = useVehicles()
  const [selectedModelId, setSelectedModelId] = useState(preselectedSlug)
  const [zoomBattery, setZoomBattery] = useState(preselectedBattery)
  const [zoomColor, setZoomColor] = useState(preselectedColor)
  const [otoxBattery, setOtoxBattery] = useState('single')

  // Payment System State
  const [paymentPlan, setPaymentPlan] = useState('booking_token') // 'booking_token' | 'full_payment'
  const [paymentChannel, setPaymentChannel] = useState('bank_transfer') // 'bank_transfer' | 'jazzcash' | 'easypaisa' | 'cash_on_delivery'
  const [transactionId, setTransactionId] = useState('')
  const [senderAccount, setSenderAccount] = useState('')
  const [receiptFile, setReceiptFile] = useState(null)
  const [receiptPreview, setReceiptPreview] = useState(null)

  // Status & Confirmation State
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderInvoice, setOrderInvoice] = useState(null)
  const [orderError, setOrderError] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullName: '',
      cnic: '',
      phone: '',
      email: '',
      city: 'Karachi',
      address: '',
      deliveryMethod: 'home_delivery',
      notes: '',
    },
  })

  const deliveryMethod = watch('deliveryMethod')

  // Synchronize preselected model once vehicles load from backend
  useEffect(() => {
    if (vehicles.length > 0) {
      setSelectedModelId((prev) => {
        const found = vehicles.find((v) => v.slug === prev || v._id === prev)
        return found ? prev : vehicles[0].slug
      })
    }
  }, [vehicles])

  const currentModel =
    vehicles.find((m) => m.slug === selectedModelId || m._id === selectedModelId) ||
    vehicles[0] ||
    null

  // Dynamic Pricing Calculation
  let basePrice = currentModel?.basePrice || 0
  let variantLabel = currentModel?.edition || 'Official Factory Spec'

  if (currentModel?.slug === 'zoom-2000w') {
    basePrice = zoomBattery === '40Ah' ? 435000 : 385000
    variantLabel = `72V ${zoomBattery} Pack (${zoomColor === 'red' ? 'Crimson Red' : 'Obsidian Black'})`
  } else if (currentModel?.slug === 'oto-x-dimen') {
    if (otoxBattery === 'dual') {
      basePrice = (currentModel.basePrice || 525000) + 70000
      variantLabel = 'Dual 72V 38Ah Battery Setup (130-150 km)'
    } else {
      variantLabel = 'Single 72V 38Ah Battery Setup (70-90 km)'
    }
  }

  const deliveryFee = deliveryMethod === 'home_delivery' ? HOME_DELIVERY_FEE : 0
  const totalPrice = basePrice + deliveryFee
  const payableNow =
    paymentPlan === 'booking_token' ? Math.min(TOKEN_ADVANCE_AMOUNT, totalPrice) : totalPrice
  const remainingBalance = Math.max(0, totalPrice - payableNow)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 15 * 1024 * 1024) {
      setOrderError('Receipt file size must be less than 15MB.')
      return
    }
    setOrderError(null)
    setReceiptFile(file)
    if (file.type.startsWith('image/')) {
      setReceiptPreview(URL.createObjectURL(file))
    } else {
      setReceiptPreview(null)
    }
  }

  const handleRemoveReceipt = () => {
    setReceiptFile(null)
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview)
      setReceiptPreview(null)
    }
  }

  const onSubmit = async (formData) => {
    setOrderError(null)

    if (!currentModel) {
      setOrderError('No vehicle selected or connection is unavailable. Please retry.')
      return
    }

    if (paymentChannel !== 'cash_on_delivery' && !transactionId.trim()) {
      setOrderError('Please enter your Transaction ID (TID) from your Bank / JazzCash / EasyPaisa transfer.')
      return
    }

    const orderPayloadData = {
      vehicle: {
        vehicleId: currentModel.slug || currentModel._id,
        name: currentModel.name,
        brand: currentModel.brand,
        heroImage: getBikeImage(currentModel, zoomColor),
        selectedColor: currentModel.slug === 'zoom-2000w' ? zoomColor : undefined,
        variantLabel,
        basePrice,
      },
      customer: {
        fullName: formData.fullName,
        cnic: formData.cnic,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: formData.address,
      },
      fulfillment: {
        deliveryMethod: formData.deliveryMethod,
        deliveryFee,
        estimatedDeliveryWindow: '3 to 5 business days',
      },
      pricing: {
        basePrice,
        deliveryFee,
        totalPrice,
        payableNow,
        remainingBalance,
      },
      payment: {
        plan: paymentPlan,
        method: paymentChannel,
        status: paymentChannel === 'cash_on_delivery' ? 'pending' : 'verification_pending',
        transactionId: transactionId.trim(),
        senderName: senderAccount.trim(),
      },
      notes: formData.notes || '',
    }

    let payloadToSend
    if (receiptFile) {
      payloadToSend = new FormData()
      payloadToSend.append('receipt', receiptFile)
      payloadToSend.append('orderData', JSON.stringify(orderPayloadData))
    } else {
      payloadToSend = orderPayloadData
    }

    try {
      const response = await submitOrder(payloadToSend)
      const savedOrder = response.data

      setOrderInvoice({
        orderNumber: savedOrder.orderNumber,
        orderDate: dayjs(savedOrder.createdAt).format('MMMM D, YYYY [at] h:mm A'),
        model: {
          ...currentModel,
          heroImage: getBikeImage(currentModel, zoomColor),
        },
        variantLabel,
        basePrice,
        deliveryFee,
        totalPrice,
        payableNow,
        remainingBalance,
        paymentPlan,
        paymentChannel,
        transactionId: transactionId.trim(),
        senderAccount: senderAccount.trim(),
        hasReceipt: !!receiptFile || !!savedOrder.payment?.receiptImage,
        receiptImage: savedOrder.payment?.receiptImage,
        ...formData,
      })
      setIsSuccess(true)
    } catch (err) {
      console.error('Order submission error:', err)
      setOrderError(err.response?.data?.message || err.message || 'Failed to place order.')
      setIsSuccess(false)
    }
  }

  // 1. Loading state while checking server connection
  if (loadingVehicles && vehicles.length === 0) {
    return <LoadingNotice label="Connecting to Factory Booking System..." />
  }

  // 2. Strict offline state: Agar backend server off ho, reservation page show na ho
  if (isOffline) {
    return (
      <ServerOfflineNotice
        title="Reservation Portal Unavailable"
        message="Online vehicle booking and payment ledger direct secure showroom server se connect hoti hain. Server live honay par booking portal automatically active ho jayega."
        onRetry={fetchVehicles}
        isRetrying={loadingVehicles}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Editorial Page Header */}
      <div className="bg-[#f4f2ea] border-b border-[#e5e2d8] py-14">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-6 bg-[#a82323]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                OFFICIAL FACTORY ORDER PORTAL
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1a1918] tracking-tight leading-[1.08]">
              Direct Factory <span className="italic font-normal text-[#a82323]">Reservation</span>
            </h1>
            <p className="text-sm font-serif italic text-stone-600 border-l border-[#a82323] pl-4 max-w-xl">
              Direct booking portal for Super Power & EMOTO production models. Select your motorcycle, choose delivery method, and confirm your reservation.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-14">
        {!isSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Multi-Step Order Form */}
            <div className="lg:col-span-7 space-y-10">
              {orderError && (
                <div className="p-4 border border-[#e5c2c2] bg-[#fdf5f5] font-mono text-xs text-[#a82323] flex items-center justify-between">
                  <span>{orderError}</span>
                  <button onClick={() => setOrderError(null)} className="font-bold underline text-xs cursor-pointer">
                    Dismiss
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Step 1: Vehicle Selection */}
                <VehicleSelectStep
                  vehicles={vehicles}
                  selectedModelId={selectedModelId}
                  onSelectModel={setSelectedModelId}
                  zoomColor={zoomColor}
                  onChangeZoomColor={setZoomColor}
                  zoomBattery={zoomBattery}
                  onChangeZoomBattery={setZoomBattery}
                  otoxBattery={otoxBattery}
                  onChangeOtoxBattery={setOtoxBattery}
                />

                {/* Step 2: Buyer Legal Details & Fulfillment */}
                <CustomerInfoStep
                  register={register}
                  errors={errors}
                  deliveryMethod={deliveryMethod}
                />

                {/* Step 3: Payment Plan & Online Method */}
                <PaymentMethodSelector
                  paymentPlan={paymentPlan}
                  onChangePaymentPlan={setPaymentPlan}
                  paymentChannel={paymentChannel}
                  onChangePaymentChannel={setPaymentChannel}
                  payableNow={payableNow}
                  remainingBalance={remainingBalance}
                  totalPrice={totalPrice}
                  transactionId={transactionId}
                  onChangeTransactionId={setTransactionId}
                  senderAccount={senderAccount}
                  onChangeSenderAccount={setSenderAccount}
                  receiptFile={receiptFile}
                  receiptPreview={receiptPreview}
                  onFileChange={handleFileChange}
                  onRemoveReceipt={handleRemoveReceipt}
                />

                {/* Step 4: Special Notes */}
                <div className="space-y-1.5 pt-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-stone-700">
                    Special Order Notes / Registration Inquiries (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={2}
                    placeholder="e.g. Need registration assistance in Sindh / Punjab excise..."
                    className="w-full p-3 bg-white border border-[#d6d1c4] font-mono text-xs text-[#1a1918] focus:outline-none focus:border-[#1a1918] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="bold"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 font-sans text-xs tracking-[0.2em] uppercase gap-2 cursor-pointer mt-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting Order to Ledger...</span>
                    </span>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      <span>
                        Confirm & Place Order ({paymentPlan === 'booking_token' ? `PKR ${TOKEN_ADVANCE_AMOUNT.toLocaleString()} Token` : `PKR ${totalPrice.toLocaleString()}`})
                      </span>
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Right Column: Sticky Live Order Summary */}
            <div className="lg:col-span-5">
              <OrderCartSidebar
                currentModel={currentModel}
                zoomColor={zoomColor}
                variantLabel={variantLabel}
                basePrice={basePrice}
                deliveryFee={deliveryFee}
                totalPrice={totalPrice}
                paymentPlan={paymentPlan}
                payableNow={payableNow}
                remainingBalance={remainingBalance}
              />
            </div>
          </div>
        ) : (
          <OrderInvoiceModal orderInvoice={orderInvoice} />
        )}
      </div>
    </div>
  )
}
