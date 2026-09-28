// ********  Careem Ride Booking System  ********

type RideType = "Economy" | "Business" | "Shared" ;

const BASE_FARES: Record<RideType, number> = {
    Economy: 600,
    Business: 1000,
    Shared: 400,
};

function bookRide(type: RideType, fare: number | string, promoCode?: string ) : string {
    const parsedFare = typeof fare === "string" ? parseFloat(fare) : fare;

    if (isNaN (parsedFare)) {
        return "Invalid fare provided"
    }
    
    const discount = promoCode ? parsedFare * 0.1 : 0;
    const finalFare = parsedFare - discount;

    const rideLabel = type === "Shared" ? `${type} Ride with 2 Passengers` : `${type} Ride`;

    const priceMessege = promoCode
    ? `Rs.${finalFare} (${promoCode} applied, saved Rs.${discount})`
    : `Rs.${finalFare}`;
    
    return `${rideLabel} fare is ${priceMessege}`;
}


console.log(bookRide("Economy", 600, "10% off"));
console.log(bookRide("Business", "1000"));
console.log(bookRide("Shared", 400));
console.log(bookRide("Economy", "dsa"));






// Create a literal union type RideType = "go" | "business" | "bike"
// Write a function bookRide(type: RideType, fare: number | string, promoCode?: string) that returns a booking confirmation string
// Add validation: if fare comes in as a string, convert it to a number before using it
// Bonus: make promoCode apply a 10% discount when present



// if (type === "Economy") {
//         return promoCode
//         ? `Economy Ride fare is Rs.${parsedFare} - ${promoCode}`
//          : `Economy Ride fare is Rs.${parsedFare}`
//     }

//     if (type === "Business") {
//         return `Business Ride fare is Rs.${parsedFare}`
//     }

//     return `Shared Ride with 2 Passenger fare is Rs.${parsedFare}`