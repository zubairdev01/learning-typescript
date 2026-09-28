// ********* Type Assertion, Type Unknown and Type Never in Typescript *********


// 1. Safe LocalStorage Reader
// Write a function getFromStorage<T>(key: string): T | null that reads a value from localStorage, safely parses it as unknown, validates it against a shape you define, and returns null on any failure (wrap in try/catch).


type Settings = {
  theme: "light" | "dark"; 
  fontSize: number;
};

function isSettings(data: unknown): data is Settings {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const value = data as Record<string, unknown>;

  return (
    (value.theme === "light" || value.theme === "dark") && 
    typeof value.fontSize === "number"
  ); 
}


function getFromStorage<T>(
  key: string,
  isValid: (data: unknown) => data is T
): T | null {
  
  try {
    const raw  = localStorage.getItem(key)
    
    if (raw === null) {
      return null;
    } 
    
    const parsed: unknown = JSON.parse(raw);
    if (isValid(parsed)) {
      return parsed;
    }
    return null;

  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to read from storage:", error.message);
      
    }
    return null;
  }
}


const store: Record<string, string> = {};
if (typeof localStorage === "undefined") {
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v; },
    },
    configurable: true,
  });
}

// then your four tests:
localStorage.setItem("settings", JSON.stringify({ theme: "dark", fontSize: 16 }));
console.log(getFromStorage("settings", isSettings));
localStorage.setItem("bad", "not json{{");
console.log(getFromStorage("bad", isSettings));
localStorage.setItem("wrong", JSON.stringify({ theme: "blue" }));
console.log(getFromStorage("wrong", isSettings));
console.log(getFromStorage("missing", isSettings));






// 2. Order Status Machine
// Define type OrderStatus = "placed" | "packed" | "shipped" | "delivered" | "cancelled". Write a getNextStep(status: OrderStatus): string function using a switch with a never-based exhaustiveness check at the end — so if you later add "returned" as a status, TypeScript forces you to handle it.

/*
type OrderStatus = "placed" | "packed" | "shipped" | "delivered" | "cancelled";

const greeting = "Dear Customer";

function getStatusMessege(status: OrderStatus): string {
  switch (status) {
    case "placed":
      return `${greeting} Your order has been placed`;

    case "packed":
      return `${greeting} Your order is packed and ready to ship`;

    case "shipped":
      return `${greeting} Your order has been shipped from our store`;

    case "delivered":
      return `${greeting} Your order has been delivered from our courier`;

    case "cancelled":
      return `${greeting} Our delivery rider couldn't find your address, so your order was cancelled`;

    default: {
      const exhaustiveCheck: never = status
      return exhaustiveCheck;
    }
  }
}

function getNextStep(status: OrderStatus): OrderStatus | null {
  switch (status) {
    case "placed":
      return "packed"

    case "packed":
      return "shipped"

    case "shipped":
      return "delivered"

    case "delivered":
    case "cancelled":
      return null;

    default: {
      const exhaustiveCheck: never = status
      return exhaustiveCheck;
    }
  }
}

const all: OrderStatus[] = ["placed", "packed", "shipped", "delivered", "cancelled"];

all.forEach((s) => {

  console.log(getStatusMessege(s));
  console.log(`  next step -> ${getNextStep(s) ?? "none (final state)"}`);
});*/