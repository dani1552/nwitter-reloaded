import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children, // 호출된 component 내부의 모든 것 (home or profile)
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  console.log(user);
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
