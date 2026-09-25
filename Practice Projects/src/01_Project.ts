// ********* Type Narrowing & Type Guards *********
// Covers :  type inference, annotations, union types, literal types, optional params

// PRACTICE 2 Daraz Order Narrowing
type PendingOrder = { status: "pending"; estimatedDays: number };
type ShippedOrder = { status: "shipped"; trackingId: string };
type DeliveredOrder = { status: "delivered"; deliveredOn: string };
 
type DarazOrder = PendingOrder | ShippedOrder | DeliveredOrder;
 
function trackOrder(order: DarazOrder) {

  switch (order.status) {
    case "pending":
      return `Order arriving in ${order.estimatedDays} days`; 
    case "shipped":
      return `Track your parcel: ${order.trackingId}`;
    case "delivered":
      return `Delivered on ${order.deliveredOn}`;
  }
}
 
console.log(trackOrder({ status: "pending", estimatedDays: 3 }));
console.log(trackOrder({ status: "shipped", trackingId: "TCS-88213" }));
 
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
    return `${data.title} — Rs.${data.price}`; 
  }
  return "Invalid product data";
}
 
console.log(showProduct({ title: "USB-C Cable", price: 450 }));
console.log(showProduct("garbage input")); 
 
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
 