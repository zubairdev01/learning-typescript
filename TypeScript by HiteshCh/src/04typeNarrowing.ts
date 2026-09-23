function getChai(kind: string | number) {
    if (typeof kind === "string") {
        return `Making ${kind} chai...`;
    }
    return `Chai order: ${kind}`;
}


function serveChai(msg?: string) {
    if (msg) {
        return `Serving ${msg}`;
    }
    return `Serving default masala chai`;
}


function orderChai(size: "small" | "medium" | "large" | number) {

    if (size === "small") {
        return `small cutting chai`;
    }

    if (size === "large" || size === "medium") {
        return `make extra chai`;
    }
    return `chai order ${size}`;
}


class coldCoffee{
    serve() {
        return `Serving Cold Coffee`;
    }
}
class justCoffee{
    serve() {
        return `Just Coffee for Sandeep`;
    }
}
function serve(chai: coldCoffee | justCoffee) {
    if (chai instanceof coldCoffee) {
        return chai.serve();
    }
}



type ChaiOrder = {
    type: string
    sugar: number
}
function isChaiOrder (obj:any):obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    )
}

function serveOrder (item:ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`
    }
    return `Serving custom chai: ${item}`
}


// keyword          value or property
type LatteeCoffee = { type: "lattee"; spicelevel: "number" }
type HotChocolate = { type: "chocolate"; amount: "number" }
type Macha = { type: "macha"; aroma: "number" }

type Coffee = LatteeCoffee | HotChocolate | Macha

function MakeCoffee(order: Coffee) {

    switch (order.type) {
        case "lattee":
            return `Lattee Coffee`
            break;

        case "chocolate":
            return `HotChocolate Coffee`
            break;

        case "macha":
            return `Macha Coffee`
            break;
    
    }
}

function brew(order: LatteeCoffee | HotChocolate) {
    if ("spicelevel" in order) {
        //
    }
}

// function isStringArray (arr: unknown):arr is string[] {
    //
// }

//  Key Learnings:
// • unknown → safer than any (requires type checking)
// • typeof → used to narrow primitive types
// • instanceof → used for class-based checks
// • Truthy checks → ensure value exists before using
// • Custom type guards → validate object structure
// • switch / conditions → handle all possible cases
// 💡 Big Insight:
// Always narrow the type before using the data to ensure safety