import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Message = ({ user, message }) => {
  const [userLoggIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;
const Container = styled.div``;
const MessageElement = styled.p`
  color: #f0dde3;
  width: fit-content;
  padding: 10px 30px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background: #ff6565;
`;
const Receiver = styled(MessageElement)`
  background: #33262e;
  text-align: left;
`;
const Timestamp = styled.span`
  color: #d6baba;
  user-select: none;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;
