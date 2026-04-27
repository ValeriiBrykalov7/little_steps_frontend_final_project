import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";


export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Breadcrumbs />
      {children}
    </AuthProvider>
  );
}