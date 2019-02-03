function timeDifference(current, previous) {

    const milliSecondsPerMinute = 60 * 1000
    const milliSecondsPerHour = milliSecondsPerMinute * 60
    const milliSecondsPerDay = milliSecondsPerHour * 24
    const milliSecondsPerMonth = milliSecondsPerDay * 30
    const milliSecondsPerYear = milliSecondsPerDay * 365
  
    const elapsed = current - previous
  
    if (elapsed < milliSecondsPerMinute / 3) {
      return 'acum'
    }
  
    if (elapsed < milliSecondsPerMinute) {
      return 'acum 1min'
    }
  
    else if (elapsed < milliSecondsPerHour) {
      return 'acum ' + Math.round(elapsed/milliSecondsPerMinute) + 'min'
    }
  
    else if (elapsed < milliSecondsPerDay*2 ) {
      return 'acum ' + Math.round(elapsed/milliSecondsPerHour ) + 'h'
    }
  
    else if (elapsed < milliSecondsPerMonth*2) {
      return 'acum ' + Math.round(elapsed/milliSecondsPerDay) + ' zile'
    }
  
    else if (elapsed < milliSecondsPerYear*1.5) {
      return 'acum ' + Math.round(elapsed/milliSecondsPerMonth) + ' luni'
    }
  
    else {
      return 'acum ' + Math.round(elapsed/milliSecondsPerYear ) + ' ani'
    }
  }
  
  export function timeDifferenceForDate(date) {
    const now = new Date().getTime()
    const updated = new Date(date).getTime()
    return timeDifference(now, updated)
  }