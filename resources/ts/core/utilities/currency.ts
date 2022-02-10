export const dollars = (value: number): string => `$${rounded(value)}`
export const rounded = (value: number, decimals?: number): string => {
  let rounded = Math.round(value * 100) / 100
  if (!decimals && typeof decimals !== 'number') return rounded.toFixed(2)
  decimals = typeof decimals === 'number' ? decimals : 2
  let modifier = Math.pow(10, decimals)
  rounded = Math.round(value * modifier) / modifier
  return rounded.toString()
}