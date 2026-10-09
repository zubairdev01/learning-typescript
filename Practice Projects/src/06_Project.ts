// ===== Project 2: Cricket Scoreboard =====

enum MatchFormat {
    T20 = 20,
    ODI = 50,
    TEST = 5
}
enum BallOutcome {
    DOT = "dot",
    SINGLE = "single",
    FOUR = "four",
    SIX = "six",
    WICKET = "wicket"
}

type Score = [runs: number, wickets: number, overs: number]
const balls: BallOutcome[] = [

    // [runs.Score 128],
    // [wickets: 03],
    // [overs: 14.3]
]

function recordBall(outcome: BallOutcome): void {
   const recordBall = balls.filter((b) => b === BallOutcome.WICKET).length     
}

function runsFor(outcome: BallOutcome): number {
    switch (outcome) {
        case BallOutcome.DOT:
            break;
        case BallOutcome.SINGLE:
            break;
        case BallOutcome.FOUR:
            break;
        case BallOutcome.SIX:
            break;
        case BallOutcome.WICKET:
            break;
    
        default:
            break;
    }
    return 0;
}

function getScore(): Score {
    
}






// ===== Practice Project: Chai Stall Billing =====

// Step 1: Enums describe a fixed set of choices
enum ChaiType {
    MASALA = "masala",
    GINGER = "ginger",
    LEMON = "lemon",
}

enum CupSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

enum OrderStatus {
    PENDING = 1, // SERVED = 2, CANCELLED = 3 (auto-increment)
    SERVED,
    CANCELLED,
}

// Step 2: A tuple for fixed-position data, an array for the collection
type MenuEntry = [type: ChaiType, price: number];

const menu: readonly MenuEntry[] = [
    [ChaiType.MASALA, 20],
    [ChaiType.GINGER, 25],
    [ChaiType.LEMON, 30],
];

type Order = {
    id: number;
    type: ChaiType;
    cups: number;
    size: CupSize;
    status: OrderStatus;
};

const orders: Order[] = [];
let nextId = 1;

// Step 3: Functions with typed params, defaults, and return types
function getPrice(type: ChaiType): number {
    const entry = menu.find(([name]) => name === type);
    return entry ? entry[1] : 0;
}

function placeOrder(
    type: ChaiType,
    cups: number = 1,
    size: CupSize = CupSize.MEDIUM
): Order {
    const order: Order = {
        id: nextId++,
        type,
        cups,
        size,
        status: OrderStatus.PENDING,
    };
    orders.push(order);
    return order;
}

function updateStatus(id: number, status: OrderStatus): boolean {
    const order = orders.find((o) => o.id === id);
    if (!order) return false;
    order.status = status;
    return true;
}

function logOrder(order: Order): void {
    // OrderStatus[2] -> "SERVED" (numeric enums map both ways)
    console.log(
        `#${order.id}: ${order.cups} x ${order.size} ${order.type} (${OrderStatus[order.status]})`
    );
}

// A function can return a tuple: two related values, fixed order
function calculateBill(): [total: number, orderCount: number] {
    const active = orders.filter((o) => o.status !== OrderStatus.CANCELLED);
    const total = active.reduce((sum, o) => sum + getPrice(o.type) * o.cups, 0);
    return [total, active.length];
}

// Step 4: Run it
placeOrder(ChaiType.MASALA, 2);
placeOrder(ChaiType.GINGER); // cups and size use defaults
placeOrder(ChaiType.LEMON, 3, CupSize.LARGE);

updateStatus(1, OrderStatus.SERVED);
updateStatus(3, OrderStatus.CANCELLED);

orders.forEach(logOrder);

const [total, count] = calculateBill(); // tuple destructuring
console.log(`Bill: Rs ${total} for ${count} orders`);

// placeOrder("masala");   // ❌ string is not a ChaiType
// menu.push(...)          // ❌ menu is readonly