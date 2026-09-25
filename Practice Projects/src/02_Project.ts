// ********* Type Assertion, Type Unknown and Type Never in Typescript *********


// ============================================
// PROJECT: Smart Form Validator
// Combines: unknown, type assertions, DOM casting, error handling, never
// ============================================

// --- 1. Safely parse untrusted JSON (like an API response) ---
type UserProfile = {
  name: string;
  age: number;
};

function parseUserProfile(json: string): UserProfile | null {
  try {
    const parsed: unknown = JSON.parse(json); // never trust JSON.parse's output blindly

    // manual validation instead of a raw "as" assertion — safer
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "name" in parsed &&
      "age" in parsed &&
      typeof (parsed as any).name === "string" &&
      typeof (parsed as any).age === "number"
    ) {
      return parsed as UserProfile;
    }
    return null;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to parse profile:", error.message);
    }
    return null;
  }
}

console.log(parseUserProfile('{"name": "Zubair", "age": 21}'));
console.log(parseUserProfile("not even json")); // triggers the catch block


// --- 2. Reading form input safely (DOM casting) ---
function getInputValue(elementId: string): string {
  const el = document.getElementById(elementId) as HTMLInputElement | null;
  if (!el) {
    throw new Error(`Element #${elementId} not found`);
  }
  return el.value.trim();
}

// usage (only works in a browser environment with a real form):
// const email = getInputValue("email");


// --- 3. Role-based redirect with exhaustiveness checking ---
type Role = "admin" | "user" | "superadmin";

function redirectBasedOnRole(role: Role): void {
  switch (role) {
    case "admin":
      console.log("Redirecting to admin dashboard");
      return;
    case "user":
      console.log("Redirecting to user dashboard");
      return;
    case "superadmin":
      console.log("Redirecting to superadmin dashboard");
      return;
    default:
      // if you add a new Role later and forget a case above,
      // TS will error here because `role` won't be assignable to `never`
      const exhaustiveCheck: never = role;
      return exhaustiveCheck;
  }
}

redirectBasedOnRole("admin");
redirectBasedOnRole("superadmin");


// --- 4. A function that never returns (never type) ---
function fatalError(message: string): never {
  throw new Error(message);
}

function validateAge(age: unknown): number {
  if (typeof age !== "number" || age < 0) {
    fatalError("Invalid age provided");
  }
  return age as number;
}



// 1. Safe LocalStorage Reader
// Write a function getFromStorage<T>(key: string): T | null that reads a value from localStorage, safely parses it as unknown, validates it against a shape you define, and returns null on any failure (wrap in try/catch).

// 2. Order Status Machine
// Define type OrderStatus = "placed" | "packed" | "shipped" | "delivered" | "cancelled". Write a getNextStep(status: OrderStatus): string function using a switch with a never-based exhaustiveness check at the end — so if you later add "returned" as a status, TypeScript forces you to handle it.




// Real-world uses for each concept
// unknown + validation → parsing API responses, form data, or localStorage values you can't fully trust
// Type assertions → working with DOM elements, third-party libraries with loose types, or migrating JS to TS
// Error narrowing → any try/catch block where you actually want to read error.message safely
// never + exhaustiveness → large apps with many status/role/state types — catches bugs at compile time when someone adds a new case and forgets to handle it elsewhere