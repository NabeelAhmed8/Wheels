// Reusable vehicle image resolver and price formatters (DRY)

export const getBikeImage = (bike, color = 'red') => {
  if (!bike) return ''
  const isZoom = bike.slug === 'zoom-2000w'
  const hasVariants = isZoom || (bike.colorVariants && bike.colorVariants.length > 1)

  if (hasVariants) {
    if (color === 'black') {
      const blackVar = bike.colorVariants?.find((v) => v.color === 'black')
      return blackVar?.image || 'zoom-2000w-black.png'
    }
    const redVar = bike.colorVariants?.find((v) => v.color === 'red')
    return bike.heroImage || redVar?.image || 'zoom-2000w-red.png'
  }
  return bike.heroImage || ''
}

export const formatPKR = (amount) => {
  if (typeof amount !== 'number') return 'PKR 0'
  return `PKR ${amount.toLocaleString()}`
}
