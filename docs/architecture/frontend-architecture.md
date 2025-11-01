# Frontend Architecture

## Component Architecture

**Component Organization:**

```
apps/web/src/
├── components/
│   ├── ui/                        # Shared UI primitives
│   ├── layout/                    # Layout components
│   ├── posts/                     # Post management
│   ├── integrations/              # Platform connections
│   ├── analytics/                 # Analytics visualization
│   └── settings/                  # Settings components
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Auth routes
│   ├── (dashboard)/               # Protected routes
│   └── api/                       # API routes
├── hooks/                         # Custom React hooks
├── lib/                           # Utilities
├── stores/                        # Zustand state
└── styles/                        # Global styles
```

**Component Template Example:**

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';

export function PostEditor() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/posts', { content, platforms: [] });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        Publish
      </Button>
    </div>
  );
}
```

## State Management

**Zustand Store Example:**

```typescript
import { create } from 'zustand';

interface PostsState {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map((p) => p.id === id ? { ...p, ...updates } : p),
  })),
}));
```

## Routing Architecture

**Route Organization (Next.js App Router):**

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── layout.tsx               # Protected layout
│   ├── page.tsx                 # Dashboard home
│   ├── posts/page.tsx
│   ├── calendar/page.tsx
│   ├── analytics/page.tsx
│   ├── integrations/page.tsx
│   └── settings/page.tsx
└── api/
    └── auth/[platform]/callback/route.ts
```

## Frontend Services Layer

**API Client Setup:**

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
```

---
