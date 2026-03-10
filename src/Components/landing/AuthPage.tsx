import AuthHypePanel from "./auth/AuthHypePanel";
import AuthForm from "./auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen">
      <section className="hidden lg:block lg:w-1/2 h-screen sticky top-0">
        <AuthHypePanel />
      </section>
      <section className="w-full lg:w-1/2">
        <AuthForm />
      </section>
    </main>
  );
}
