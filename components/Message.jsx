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
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background: #a3f365;
`;
const Receiver = styled(MessageElement)`
  background: whitesmoke;
  text-align: left;
`;
const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;
