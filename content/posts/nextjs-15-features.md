---
title: "Next.js 15에서 달라진 점들"
description: "Next.js 15의 주요 변경사항과 새로운 기능들을 정리했습니다."
date: "2024-03-20"
slug: "nextjs-15-features"
tags: ["개발", "Next.js", "React"]
coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
relatedPosts: ["typescript-best-practices", "prompt-engineering-basics", "react-server-components"]
---

Next.js 15가 출시되면서 많은 변화가 있었습니다. 이번 글에서는 주요 변경사항들을 살펴보겠습니다.

## 주요 변경사항

### 1. React 19 지원

Next.js 15는 React 19를 완전히 지원합니다. 새로운 React 기능들을 바로 사용할 수 있습니다.

```tsx
// React 19의 use() 훅 사용 예시
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

### 2. Turbopack 안정화

개발 서버가 Turbopack으로 완전히 전환되어 빌드 속도가 크게 향상되었습니다.

> Turbopack은 Webpack 대비 최대 10배 빠른 빌드 속도를 제공합니다.

### 3. 비동기 Request APIs

`params`, `searchParams`, `headers`, `cookies`가 이제 비동기입니다:

```tsx
// Before (Next.js 14)
export default function Page({ params }) {
  const { slug } = params;
  return <div>{slug}</div>;
}

// After (Next.js 15)
export default async function Page({ params }) {
  const { slug } = await params;
  return <div>{slug}</div>;
}
```

## 캐싱 개선

### revalidateTag 변경

`revalidateTag()`에 이제 캐시 라이프 프로필을 지정해야 합니다:

```typescript
// 기본 사용법
revalidateTag('blog-posts', 'max');

// 커스텀 revalidation 시간
revalidateTag('products', { revalidate: 3600 });
```

## 마이그레이션 가이드

| 변경 사항 | 대응 방법 |
|----------|----------|
| async params | await 추가 |
| Turbopack | 자동 적용 |
| React 19 | 의존성 업데이트 |

## 결론

Next.js 15는 성능과 개발자 경험 모두를 개선한 의미있는 업데이트입니다. 새 프로젝트를 시작한다면 15 버전을 적극 추천합니다!
