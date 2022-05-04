import { Button } from "@material-ui/core";
import { signInWithPopup } from "firebase/auth";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "./../firebase";
import LogoIcon from "./../public/logo.png";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login to ChatsApp</title>
      </Head>
      <LoginContainer>
        <Logo src={LogoIcon.src} />
        <Button onClick={signIn} variant="outlined">
          sign in with google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
