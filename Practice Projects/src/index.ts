// ============================================
// PRACTICE 2: Daraz Order Narrowing
// Covers: typeof, instanceof, custom type guards, discriminated unions
// ============================================
 
// discriminated union — every variant shares a "status" field that identifies which one it is
type PendingOrder = { status: "pending"; estimatedDays: number };
type ShippedOrder = { status: "shipped"; trackingId: string };
type DeliveredOrder = { status: "delivered"; deliveredOn: string };
 
type DarazOrder = PendingOrder | ShippedOrder | DeliveredOrder;
 
function trackOrder(order: DarazOrder) {
  // switching on the shared "status" field — TS narrows the type inside each case automatically
  switch (order.status) {
    case "pending":
      return `Order arriving in ${order.estimatedDays} days`; // TS knows estimatedDays exists here
    case "shipped":
      return `Track your parcel: ${order.trackingId}`;
    case "delivered":
      return `Delivered on ${order.deliveredOn}`;
  }
}
 
console.log(trackOrder({ status: "pending", estimatedDays: 3 }));
console.log(trackOrder({ status: "shipped", trackingId: "TCS-88213" }));
 
// custom type guard — validating data that comes from outside (like an API response)
type Product = { title: string; price: number };
 
function isProduct(obj: any): obj is Product {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.title === "string" &&
    typeof obj.price === "number"
  );
}
 
function showProduct(data: unknown) {
  if (isProduct(data)) {
    return `${data.title} — Rs.${data.price}`; // safe to access .title/.price here
  }
  return "Invalid product data";
}
 
console.log(showProduct({ title: "USB-C Cable", price: 450 }));
console.log(showProduct("garbage input")); // won't crash — guard catches it
 
// class-based narrowing with instanceof
class CashOnDelivery {
  confirm() {
    return "COD confirmed — pay on arrival";
  }
}
class OnlinePayment {
  confirm() {
    return "Payment confirmed via card/wallet";
  }
}
 
function confirmPayment(method: CashOnDelivery | OnlinePayment) {
  if (method instanceof CashOnDelivery) {
    return method.confirm();
  }
  return method.confirm();
}
 