import { sendPasswordResetEmail } from "firebase/auth";
import {
  Error,
  Input,
  Title,
  Wrapper,
  Form,
  Switcher,
} from "../components/auth-components";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "") return;

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      navigate("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Change Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Send Email"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account"> Create one &rarr;</Link>
      </Switcher>
      <Switcher>
        Did you remember the password?{" "}
        <Link to="/change-password"> Login &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
