import Link from "next/link";
import { Button } from "../ui/button";

export function SignInButton({
  afterAuthReturnTo = "/",
}: {
  afterAuthReturnTo?: string;
}) {
  return (
    <Button asChild>
      <Link href={`/handler/sign-in?after_auth_return_to=${afterAuthReturnTo}`}>
        Iniciar sessión
      </Link>
    </Button>
  );
}
