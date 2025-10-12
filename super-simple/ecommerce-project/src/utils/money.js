export function formatMoney(amountCents){
  return `£${(amountCents / 100).toFixed(2)}`;
}