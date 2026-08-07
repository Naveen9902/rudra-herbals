export default function AccountRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="account-theme bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      {children}
    </div>
  )
}
