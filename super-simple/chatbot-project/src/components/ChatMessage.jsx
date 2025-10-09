import RobotProfileImage from "../assets/robot.png";
import UserPofileImage from "../assets/user.png";
import './ChatMessage.css';

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserPofileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage