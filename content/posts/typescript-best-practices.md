---
title: "TypeScript 베스트 프랙티스 2024"
description: "실무에서 바로 적용할 수 있는 TypeScript 모범 사례와 패턴들을 소개합니다."
date: "2024-03-01"
slug: "typescript-best-practices"
tags: ["개발", "TypeScript", "팁"]
coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800"
relatedPosts: ["nextjs-15-features", "prompt-engineering-basics"]
---

TypeScript를 더 효과적으로 사용하기 위한 베스트 프랙티스를 정리했습니다.

## 1. 엄격한 타입 설정 사용

`tsconfig.json`에서 strict 모드를 활성화하세요:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

## 2. 타입 가드 활용

런타임에서 타입을 좁히는 타입 가드를 적극 활용하세요:

```typescript
interface Dog {
  kind: 'dog';
  bark(): void;
}

interface Cat {
  kind: 'cat';
  meow(): void;
}

type Pet = Dog | Cat;

function isDog(pet: Pet): pet is Dog {
  return pet.kind === 'dog';
}

function handlePet(pet: Pet) {
  if (isDog(pet)) {
    pet.bark(); // TypeScript가 Dog 타입으로 인식
  } else {
    pet.meow(); // Cat 타입으로 추론
  }
}
```

## 3. 유틸리티 타입 마스터하기

TypeScript 내장 유틸리티 타입을 활용하면 코드가 간결해집니다:

| 유틸리티 | 용도 | 예시 |
|---------|------|------|
| `Partial<T>` | 모든 속성 선택적 | 업데이트 함수 |
| `Required<T>` | 모든 속성 필수 | 검증 후 타입 |
| `Pick<T, K>` | 특정 속성만 선택 | API 응답 |
| `Omit<T, K>` | 특정 속성 제외 | 민감 정보 제거 |

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// 비밀번호 제외
type PublicUser = Omit<User, 'password'>;

// 부분 업데이트용
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
```

## 4. const assertion 활용

리터럴 타입을 유지하려면 `as const`를 사용하세요:

```typescript
// without as const
const routes = {
  home: '/',
  about: '/about'
}; // { home: string; about: string }

// with as const
const routes = {
  home: '/',
  about: '/about'
} as const; // { readonly home: '/'; readonly about: '/about' }
```

## 5. 제네릭으로 재사용성 높이기

```typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

// 사용 예시
interface Post {
  id: number;
  title: string;
}

const post = await fetchData<Post>('/api/posts/1');
```

## 결론

TypeScript의 타입 시스템을 잘 활용하면 버그를 사전에 방지하고 코드의 가독성을 높일 수 있습니다. 처음에는 번거로울 수 있지만, 장기적으로는 개발 생산성을 크게 향상시킵니다.
