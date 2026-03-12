export default function ProjetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="overflow-hidden h-[100dvh] w-full">{children}</div>;
}
