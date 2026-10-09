// Project 1: Student Result Manager

/*
type Subject = {
  name: string;
  marks: number;
  creditHours: number;
}
type Student = {
  id: number;
  name: string;
  email: string;
  semester: number;
  marks: Subject[];
  password: string;
}

type PublicStudent = Omit<Student, "password">;
type StudentCard = Pick<Student, "name" | "semester">;

const students: Student[] = [
  {
    id: 1,
    name: "Usama",
    email: "usama@gmail.com",
    semester: 4,
    password: "usama223",
    marks: [
      { name: "DSA", marks: 88, creditHours: 3 },
      { name: "System Design", marks: 76, creditHours: 2.5 },
    ],
  },

  {
    id: 2,
    name: "Azzif",
    email: "azzif@gmail.com",
    semester: 4,
    password: "fizza445",
    marks: [
      { name: "Backend Eng.", marks: 76, creditHours: 3 },
      { name: "OOP", marks: 98, creditHours: 4 },
    ],
  },
]

function getPublicStudents(): PublicStudent[] {
  return students.map(({ password, ...rest }) => rest)

}

function getStudentCards(): StudentCard[] {
  return students.map(({ name, semester }) => ({ name, semester }))
}

function updateStudent(
  id: number,
  update: Partial<Student>
): Student | undefined {

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  const updated = { ...students[index], ...update } as Student;
  students[index] = updated;
  return updated;
}

function marksToPoints(marks: number): number {
  if (marks >= 85) return 4.0;
  if (marks >= 80) return 3.67;
  if (marks >= 75) return 3.33;
  if (marks >= 70) return 3.0;
  if (marks >= 65) return 2.67;
  if (marks >= 60) return 2.33;
  return 0;
}


function calculateGPA(student: Student): number {
  const totalCredits = student.marks.reduce((sum, s) => sum + s.creditHours, 0);
  if (totalCredits === 0) return 0;

  const totalPoints = student.marks.reduce(
    (sum, s) => sum + marksToPoints(s.marks) * s.creditHours, 0
  );
  return Number((totalPoints / totalCredits).toFixed(2));
}


type CompleteProfile = Required<Pick<Student, "name" | "email" | "semester">>;

function CompleteProfile(data: CompleteProfile): void {
  console.log(`Profile complete: ${data.name} (${data.email}), semester ${data.semester}`);

}

console.log(getPublicStudents());
console.log(getStudentCards());

console.log(updateStudent(1, { semester: 5 }));
console.log(updateStudent(99, { semester: 4 }));

students.forEach((s) => console.log(`${s.name} GPA: ${calculateGPA(s)}`));

CompleteProfile({ name: "Usama", email: "usama@gmail.com", semester: 4 });

// updateStudent(1, { age: 20 });
updateStudent(1, { semester: 5 })
updateStudent(1, { email: "newmail@gmail.com" })

*/



// ===== Project 2: Library System =====

type Book = {
  isbn: string;   // International Standard Book Number
  title: string;
  author: string;
  price: number;
  isAvailable: boolean;
  internalNotes: string;
}
type Member = {
  id: number;
  name: string;
  email: string
}

type Loan = {
  id: number;
  book: Book;
  member: Member;
  issuedOn: string;
  dueOn: string;
}

type PublicBook = Omit<Book, "internalNotes">;
type BookPreview = Pick<Book, "title" | "author">;

const books: Book[] = [
  {
    isbn: "38473",
    title: "Sapiens",
    author: "N. Herrari",
    price: 550,
    isAvailable: true,
    internalNotes: "yes"
  },

  {
    isbn: "3473",
    title: "My Brother",
    author: "Fatima Jinnah",
    price: 650,
    isAvailable: true,
    internalNotes: "yes"
  },

  {
    isbn: "3873",
    title: "The Murder of History",
    author: "K.K Aziz",
    price: 950,
    isAvailable: true,
    internalNotes: "yes"
  },

  {
    isbn: "387",
    title: "Magnificent Delusion",
    author: "Hussain Haqani",
    price: 1250,
    isAvailable: false,
    internalNotes: "yes"
  }
];

const members: Member[] = [
  {
    id: 423,
    name: "Ahmad",
    email: "ahmad@gmail.com"
  },
  {
    id: 425,
    name: "Hassan",
    email: "hassan@gmail.com"
  }
]

const loans: Loan[] = [];
let nextLoanId = 1;

function toDateString(data: Date): string {
  return data.toISOString().slice(0,10);
}


function getPublicCatalog(): PublicBook[] {
  return books.map(({ internalNotes, ...rest }) => rest);

}

function searchByTitle(query: string): BookPreview[] {
  const q = query.toLocaleLowerCase();
  return books
    .filter((book) => book.title.toLocaleLowerCase().includes(q))

    .map(({ title, author }) => ({ title, author }));
}


function issueBook(isbn: string, memberId: number): Loan | undefined {
  const book = books.find((b) => b.isbn === isbn);
  if (!book || !book.isAvailable) return undefined;

  const member = members.find((m) => m.id === memberId);
  if (!member) return undefined;

  book.isAvailable = false;

  const now = new Date();
  const due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const loan: Loan = {
    id: nextLoanId++,
    book,
    member,
    issuedOn: toDateString(now),
    dueOn: toDateString(due),
  };

  loans.push(loan);
  return loan;
}

function returnBook(isbn: string): boolean {
  const index = loans.findIndex((loan) => loan.book.isbn === isbn);
  if (index === -1) return false;

  const loan = loans[index];
  if (!loan) return false;

  loan.book.isAvailable = true;
  loans.splice(index, 1);

  return true;
}


function printBookTitle(book: BookPreview): void {
  console.log(book.title);
}

const extraBook = { title: "My Brother", author: "fatima Jinnah, rating: 4.9" }

printBookTitle(extraBook);

printBookTitle({ title: "My Brother", author: "fatima Jinnah, rating: 4.9" });

console.log(getPublicCatalog());
console.log(searchByTitle("murder"));

console.log(issueBook("3473", 425));
console.log(issueBook("3473", 423));
console.log(issueBook("387", 423));
console.log(issueBook("3873", 999));

console.log(returnBook("3473"));
console.log(returnBook("3473"));







/*

type MenuItem = {
  id: number;
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string[];
};

type PublicMenuItem = Omit<MenuItem, "secretIngredients">;
type MenuPreview = Pick<MenuItem, "name" | "price">;

type OrderLine = {
  item: PublicMenuItem;
  quantity: number
};

type Order = {
  id: string;
  lines: OrderLine[];
  address: { street: string; pin: number }
};

const menu: MenuItem[] = [
  { id: 1, name: "Masala Chai", price: 20, isHot: true, secretIngredients: ["cardamom"] },

  { id: 2, name: "Iced Lemon Tea", price: 30, isHot: false, secretIngredients: ["mint"] },
];

const updateItem = (id: number, updates: Partial<MenuItem>): MenuItem | undefined => {
  const index = menu.findIndex((m) => m.id === id);
  if (index === -1) return undefined;

  const updatedItem = { ...menu[index], ...updates } as MenuItem;
  menu[index] = updatedItem;
  return updatedItem;
};

const getPublicMenu = (): PublicMenuItem[] =>
  menu.map(({ secretIngredients, ...rest }) => rest);

const orderTotal = (order: Order): number =>
  order.lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0);

updateItem(1, { price: 25 });
console.log(getPublicMenu());
*/