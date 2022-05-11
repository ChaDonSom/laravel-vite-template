export const dollars = (value: number): string => {
  let split = `$${rounded(value)}`.split('')
  let result = []
  let decimalIndex = split.indexOf('.') - 1
  for (let i =  0; i < split.length; i++) {
    result.push(split[i])
    if (i < decimalIndex) {
      if ((decimalIndex - i) % 3 == 0 && i != 0) result.push(',')
    }
  }
  return result.join('')
}

export const rounded = (value: number, decimals?: number): string => {
  let rounded = Math.round(value * 100) / 100
  if (!decimals && typeof decimals !== 'number') return rounded.toFixed(2)
  decimals = typeof decimals === 'number' ? decimals : 2
  let modifier = Math.pow(10, decimals)
  rounded = Math.round(value * modifier) / modifier
  return rounded.toString()
}