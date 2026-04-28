import Logo from "@/components/Logo/Logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <Logo />
        {children}
      </div>
    );
};
