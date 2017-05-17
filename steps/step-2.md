# Krok 2: Proste typy

Mając już skonfigurowaną kompilację TypeScriptu możemy przejść do uzupełniania aplikacji o typy. Deklaruje się je po dwukropku następującym po nazwie deklaracji zmiennej lub argumentu. Kilka przykładów:

```ts
const token: string = ...
function add(x: number, y: number): string { ... }
//                                  ^ deklaracja zwracanego typu
```

## Type inference

Typy są opcjonalne, jeżeli ich nie podamy, TypeScript będzie próbować domyślić się typu na podstawie wartości. Kilka przykładów:
```ts
let argsStr = 'abc|def|ghj';
//              ^ używając literału TypeScript wie jaki to typ
argsStr = 10
//        ^ Error: Type 'number' is not assignable to type 'string'
const args = argsStr.split('|');
//                  ^ wiedząc że argsStr to string i posiadając wbudowane informacje o metodach, args otrzyma typ string[]
```

Jeżeli TypeScript nie jest w stanie się domyślić typu zostaje w domyśle użyty `any`, który może być dowolnym typem. W tym przypadku zdani jesteśmy na siebie i TypeScript nie jest w stanie nam pomóc, gdy na przykład próbujemy użyć nieistniejącej metody.

Dodatkowe informacje o tym w jaki sposób TypeScript domyśla się typów dostępne są w dokumentacji: https://www.typescriptlang.org/docs/handbook/type-inference.html

## Type assertion (casting)

Możemy nadpisać typ przez słowo kluczowe `as`. Ten zabieg powinien być stosowany tylko w ostateczności. Jeden z niewielu przypadków, gdzie może okazać się przydatny to łączenie (chain) funkcji, które jest skomplikowane do zadeklarowania w TypeScript.
```ts
const foo = [...].filter(...).reduce(...) as Foo;
```
Można również spotkać starszą składnię `<HTMLElement>findElement()`, jednak nie jest ona zalecana, głównie ze względu niekompatybilność z plikami JSX.

## Do zrobienia:
- dodaj typy w deklaracjach funkcji i zmiennych
