// ============================================
// PROJECT: Chai Shop Order Config
// Combines: type aliases, interfaces, literal types, intersections, optional & readonly props
// ============================================

// --- 1. Literal types for fixed categories ---
type ChaiFlavour = "masala" | "ginger" | "lemon" | "elaichi";
type CupSize = "small" | "medium" | "large";

// --- 2. Base shape (object type alias) ---
type BaseOrder = {
  flavour: ChaiFlavour;
  size: CupSize;
  sugar: number;
};

// --- 3. Intersection — every "extra" gets merged into the base order ---
type WithDelivery = {
  address: string;
  deliveryFee: number;
};

type DeliveryOrder = BaseOrder & WithDelivery;

// --- 4. Optional property — loyalty card isn't always present ---
type Customer = {
  name: string;
  phone: string;
  loyaltyCardId?: string; // optional — not every customer has one
};

// --- 5. readonly — order ID must never change after creation ---
type OrderReceipt = {
  readonly orderId: string;
  customer: Customer;
  order: DeliveryOrder;
  total: number;
};

// --- 6. Interface + class implementing a contract ---
interface Billable {
  calculateTotal(): number;
}

class ChaiShopOrder implements Billable {
  constructor(
    private baseOrder: BaseOrder,
    private deliveryFee: number = 0
  ) {}

  calculateTotal(): number {
    const basePrice = this.baseOrder.size === "large" ? 150
      : this.baseOrder.size === "medium" ? 100
      : 70;
    return basePrice + this.deliveryFee;
  }
}

// --- Putting it together ---
function generateReceipt(
  orderId: string,
  customer: Customer,
  order: DeliveryOrder
): OrderReceipt {
  const shopOrder = new ChaiShopOrder(order, order.deliveryFee);
  return {
    orderId,
    customer,
    order,
    total: shopOrder.calculateTotal(),
  };
}

const receipt = generateReceipt(
  "ORD-1001",
  { name: "Zubair", phone: "0300-1234567" }, // no loyaltyCardId — that's fine, it's optional
  {
    flavour: "masala",
    size: "large",
    sugar: 2,
    address: "Sheikhupura, Punjab",
    deliveryFee: 50,
  }
);

console.log(receipt);

// receipt.orderId = "ORD-9999"; // ❌ TS error — readonly, can't reassign







// Real-world uses
// Intersection types → merging a base entity with role-specific fields (e.g., User & AdminPermissions)
// Optional properties → form fields, API responses where some data is genuinely nullable
// readonly → IDs, timestamps, config values — anything that should be set once and never mutated
// Interfaces + implements → enforcing that multiple classes (payment methods, API handlers) follow the same contract
// Homework — 2 more practice builds

// 1. Student Enrollment Card (tie it to something familiar)
// Create type BaseStudent = { name: string; studentId: string }, then intersect it with type EnrollmentInfo = { semester: number; program: string }. Add an optional scholarshipId?: string. Make studentId readonly.

// 2. Payment Method Contract
// Define interface PaymentMethod { pay(amount: number): string }. Create two classes — JazzCashPayment and BankTransferPayment — that both implements PaymentMethod. Write a function processPayment(method: PaymentMethod, amount: number) that works with either class.