import { LoginForm } from "@/components/LoginForm"
import Modal from "@/components/Modal"

export default function LoginModal() {
  return (
    <Modal>
      <div className="mx-auto">
        <LoginForm />
      </div>
    </Modal>
  )
}
