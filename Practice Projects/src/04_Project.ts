// Combines: type aliases, interfaces, literal types, intersections, optional & readonly props

type BaseStudent = {
  name: string,
  readonly studentId: string,
};

type EnrollmentInfo = {
  semester: number,
  program: string,
};

type StudentCard = BaseStudent & EnrollmentInfo & {
  scholarshipId?: string,
};

function printCard(card: StudentCard): string {
  const scholarshipLine = card.scholarshipId ? ` | Scholarship: ${card.scholarshipId}` : ""
  return `Name: ${card.name} | ID: ${card.studentId} | Program: ${card.program} | Semester: ${card.semester} ${scholarshipLine}`;

}

const s1: StudentCard = { name: "Zubair", studentId: "BC000000", semester: 3, program: "BSCS" };

const s2: StudentCard = { name: "Ali", studentId: "BC000001", semester: 5, program: "BSSE", scholarshipId: "SCH-01" };

console.log(printCard(s1)); 
console.log(printCard(s2)); 
// s1.studentId = "NEW";       
 





// 2. Payment Method Contract
// Define interface PaymentMethod { pay(amount: number): string }. Create two classes — JazzCashPayment and BankTransferPayment — that both implements PaymentMethod. Write a function processPayment(method: PaymentMethod, amount: number) that works with either class.


// interface PaymentMethod : pay(amount: number): string {

// }