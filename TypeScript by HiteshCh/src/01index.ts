function greet (person: string): string {
    return `Hello ${person}, Welcome to Chaicode`;
}

const username: string = "Chai aur Typescript";
console.log(greet(username));

// you can also write this in package.json line no.8
// "dev": "npx ts-node src/index.ts"