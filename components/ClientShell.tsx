'use client';

/**
 * components/ClientShell.tsx
 * Hanya render children — intro sekarang dihandle langsung di page.tsx
 */

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
