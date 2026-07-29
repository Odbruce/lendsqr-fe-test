
export function formatNaira(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null) {
    return "₦0.00";
  }


  if (typeof amount === "string" && amount.includes("₦")) {
    return amount;
  }


  const numericValue = typeof amount === "string" 
    ? parseFloat(amount.replace(/[^0-9.-]/g, "")) 
    : amount;

  if (isNaN(numericValue)) {
    return "₦0.00";
  }


  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });



  return formatter.format(numericValue).replace(/NGN\s?/, "₦");
}
