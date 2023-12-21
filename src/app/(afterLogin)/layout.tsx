export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        After Login 레이아웃
        {children}
      </div>
  )
}
