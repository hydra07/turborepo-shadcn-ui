# Turborepo + Next.js + Tailwind CSS + shadcn/ui Template

Một monorepo template hiện đại được xây dựng với **Turborepo**, **Next.js 15**, **Tailwind CSS v4**, và **shadcn/ui**. Template này cung cấp cấu trúc tối ưu để phát triển các ứng dụng web với thư viện UI chia sẻ.

## Tính năng

- **Monorepo Architecture** với Turborepo
- **Next.js 15** với App Router và Turbopack
- **Tailwind CSS v4** với cấu hình tối ưu
- **shadcn/ui** components với custom variants
- **Shared UI Library** có thể tái sử dụng
- **TypeScript** với cấu hình strict
- **ESLint & Prettier** với rules chuẩn
- **Bun** làm package manager

## Yêu cầu

- **Node.js** ≥ 18 (khuyến nghị 20+)
- **Bun** 1.2.20 (hoặc npm/pnpm)
- **Git**

## Cài đặt

```bash
# Clone repository
git clone https://github.com/hydra07/turborepo-shadcn-ui.git
cd template

# Cài đặt dependencies
bun install

# Chạy development server
bun run dev
```

Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

## Cấu trúc project

```
template/
├── apps/
│   └── web/                    # Next.js application chính
│       ├── app/               # App Router pages
│       │   ├── page.tsx       # Homepage
│       │   ├── layout.tsx     # Root layout
│       │   └── globals.css    # Global styles
│       ├── public/            # Static assets
│       └── package.json
├── packages/
│   ├── ui/                    # Shared UI library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/       # shadcn/ui components
│   │   │   │   └── ui.custom/ # Custom components
│   │   │   ├── lib/          # Utility functions
│   │   │   └── globals.css   # UI library styles
│   │   ├── components.json   # shadcn/ui config
│   │   ├── tailwind.config.ts # Tailwind config cho UI
│   │   └── package.json
│   ├── eslint-config/         # Shared ESLint config
│   ├── typescript-config/     # Shared TypeScript config
│   └── tailwind-config/       # Shared Tailwind config
├── turbo.json                 # Turborepo pipeline
└── package.json              # Root workspace config
```

## Scripts

```bash
# Development
bun run dev          # Chạy tất cả apps trong chế độ dev
bun run build        # Build tất cả packages và apps
bun run lint         # Lint toàn bộ codebase
bun run format       # Format code với Prettier
bun run check-types  # Kiểm tra TypeScript types
```

## Thêm shadcn/ui components

```bash
cd packages/ui
bunx shadcn add button card input dialog
```

Sử dụng components:

```tsx
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Cấu hình Tailwind CSS

Project sử dụng **Tailwind CSS v4** với cấu hình hiện đại:

### Cấu hình chia sẻ
- `packages/tailwind-config/shared-styles.css` - Chứa `@theme` variables
- `packages/ui/tailwind.config.ts` - Config riêng cho UI library
- `packages/ui/src/globals.css` - Styles với `@config` và `@theme`

### Cấu hình trong Next.js
```css
/* apps/web/app/globals.css */
@import "tailwindcss";
@import "@repo/tailwind-config";
```

### Cấu hình trong UI Library
```css
/* packages/ui/src/globals.css */
@import "tailwindcss";
@config "@repo/ui/tailwind.config";

@theme {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

## Chuyển đổi Package Manager

### Từ Bun sang pnpm
```json
{
  "packageManager": "pnpm@9.12.0"
}
```

### Từ Bun sang npm
```json
{
  "packageManager": "npm@10.9.0"
}
```

Sau khi thay đổi:
```bash
rm -rf node_modules bun.lockb
pnpm install
pnpm dev
```

## Development Workflow

1. **Tạo component mới**:
   ```bash
   cd packages/ui
   bunx shadcn add <component-name>
   ```

2. **Sử dụng trong app**:
   ```tsx
   import { Button } from "@repo/ui/components/ui/button";
   ```

3. **Development với hot reload**:
   ```bash
   bun run dev
   ```

## Tài liệu tham khảo

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Bun Documentation](https://bun.sh/docs)

## Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.
