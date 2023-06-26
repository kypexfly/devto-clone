import LoginButton from "./LoginButton"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

interface UserAuthForm extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthForm) {
  return (
    <Card className="mx-auto max-w-[350px] w-full h-full">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p>Authenticate with your account:</p>

        <LoginButton provider="google">Google</LoginButton>
        <LoginButton provider="github">GitHub</LoginButton>
      </CardContent>
    </Card>
  )
}
