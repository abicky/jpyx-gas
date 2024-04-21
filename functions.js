/**
 * Show the USD/JPY (JPY=X) for the input date
 * @param {date|string} date The date
 * @return The USD/JPY (JPY=X)
 * @customfunction
 */
function JPYX(date) {
  return lib.JPYX(date);
}

/**
 * Show the USD/JPY (JPY=X) for the end of last month
 * @return The USD/JPY (JPY=X)
 * @customfunction
 */
function JPYXLASTMONTH() {
  return lib.JPYXLASTMONTH();
}
