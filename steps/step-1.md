# Krok 1: Babel -> TypeScript

TypeScript jest nadzbiorem ES6, posiada wsparcie dla składni JSX. To oznacza, że możesz nim łatwo zastąpić Babela bez zmian w kodzie.

Do zrobienia:
- zainstaluj paczki `typescript` i `awesome-typescript-loader`
- stwórz plik `tsconfig.json` z podaną konfiguracją
- w konfiguracji webpacka:
    - podmień `babel-loader` na `awesome-typescript-loader`
    - dodaj do `resolve.extensions` rozszerzenia `ts` i `tsx`
- zmień rozszerzenie `src/main.jsx` na `tsx` i zaktualizuj `entry.main`
- usuń nieużywane paczki związane z Babelem z `package.json`

`tsconfig.json` powinien wyglądać następująco:
```
{
  "compilerOptions": {
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "jsx": "react",
    "strictNullChecks": true
  }
}
```

## Dodatkowa dokumentacja

- Lista opcji kompilera: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- Dodatkowe informacje o konfiguracji TypeScriptu: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
