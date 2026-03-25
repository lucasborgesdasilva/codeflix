# Explicação das mudanças na store

## Contexto

No começo do projeto, a store original criava uma **instância global** da store. Ou seja:

```bash
store (singleton)
   |
   └── reducers
```

Isso para a aplicação real, está tudo certo! Porém, quando vamos para os
testes, temos um problema, pois a mesma instância da store, vai ser usada em todos os testes. E testes precisam ser **isolados**.

## Cenário

Imagina que:

```bash
test 1
store.state = { user: "Lucas" }

test 2
espera store.state = {}
```

como a **store é global**, o estado do teste 1 pode vazar para o teste 2.

Isso gera testes **instáveis** e **imprevisíveis**.

> As próprias libs de teste recomendam que cada teste deve ter sua própria store.

## Solução: Criar um factory de store

Por isso criamos:

```ts
setupStore();
```

Que é basicamente uma função que cria stores.

```ts
export const setupStore = () => {
  return configureStore({...})
}
```

Agora você pode fazer:

```ts
store1 = setupStore();
store2 = setupStore();
store3 = setupStore();
```

Cada uma independente.

## Por que usar `combineReducers`?

Antes tinhamos:

```ts
reducer: {
  [apiSlice.reducerPath]: apiSlice.reducer,
}
```

Agora virou:

```ts
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});
```

Isso permite tipar corretamente o RootState.

```ts
export type RootState = ReturnType<typeof rootReducer>;
```

Antes era:

```ts
ReturnType<typeof store.getState>;
```

Mas agora a store não é fixa, então precisamos derivar o tipo do reducer.

## Por que existe `preloadedState`?

Outra mudança importante:

```ts
setupStore(preloadedState);
```

Isso permite iniciar a store com estado customizado.

Exemplo em teste:

```ts
renderWithProviders(<Component />, {
  preloadedState: {
    auth: { user: "Lucas" }
  }
})
```

Então o teste começa assim:

```bash
store
 └── auth
      └── user = "Lucas"
```

Sem precisar disparar actions. Isso facilita MUITO os testes.

## Por que exportar `AppStore`?

Agora exportamos:

```ts
export type AppStore = ReturnType<typeof setupStore>;
```

Porque o renderWithProviders aceita uma store customizada:

```ts
store?: AppStore;
```

Ou seja, podemos passar a própria store.

Exemplo:

```ts
const store = setupStore({
  auth: { user: "Lucas" }
})

renderWithProviders(<App />, { store })
```

## Por que ainda existe `store = setupStore()`?

Aqui:

```ts
export const store = setupStore();
```

Isso mantém compatibilidade com a aplicação real.

Na aplicação:

```bash
Provider
   |
   └── store (única)
```

Nos testes:

```bash
test1 → store1
test2 → store2
test3 → store3
```

## Como o `renderWithProviders` usa isso

Ele faz exatamente isso:

```ts
store = setupStore(preloadedState);
```

Então cada teste ganha sua própria store.

Fluxo:

```bash
teste
   |
renderWithProviders
   |
setupStore()
   |
Provider
   |
Component
```

## Benefícios com essas mudanças

1. Isolamento de testes (Cada teste tem sua store)
2. Permite preloadedState (Podemos controlar o estado inicial)
3. Facilita mock de estado
4. Melhor tipagem (Separar rootReducer melhora inferência do TypeScript)
5. Padrão oficial do Redux Toolkit (A própria documentação recomenda isso **Setup Store for Testing**)

## Em resumo

| Mudança                | Motivo                               |
| ---------------------- | :----------------------------------- |
| `setupStore()`         | Criar store nova por teste           |
| `combineReducers`      | Tipar RootState corretamente         |
| `preloadedState`       | Controlar estado inicial em testes   |
| `AppStore`             | Tipagem da store criada              |
| `store = setupStore()` | Manter store global para a aplicação |
