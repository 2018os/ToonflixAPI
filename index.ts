const add = (a: number, b: number) => {
  const result = a + b;
  return result;
};

// index.ts

enum Spacing {
  a = '100',
  b = '200',
  c = '300'
}

// const spacing = {
//   a: '100',
//   b: '200',
//   c: '300'
// }

type Type = 'a' | 'b';

interface User {
  id: string;
  name: string;
  spacing: Spacing;
  type: Type;
}

interface Profile {
  user: User;
}

function hello<T>(_a: T) {
  return 'a';
}

// app.ts
// import { User } from 'index.ts';

const user: User = {
  id: 'asdf',
  name: 'sdfa',
  spacing: Spacing.a,
  type: 'a'
};

add(1, 2);

hello<string>('1234');
