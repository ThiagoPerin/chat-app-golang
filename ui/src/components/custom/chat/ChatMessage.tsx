type Message = {
  username: string;
  message: string;
};

type ChatMessageProps = {
  msg: Message;
  index: number;
  username: string | null;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ msg, index, username }) => {
  return <>
    {msg.username === username ? (
      <div className="w-full flex items-center justify-end">
        <li key={index} className="w-fit py-2 px-4 rounded-2xl my-1 bg-green-400 text-black">
          {msg.message}
        </li>
      </div>
    ) : (
      <div className="w-full flex items-center justify-start">
        <li key={index} className="w-fit py-2 px-4 rounded-2xl my-1 bg-gray-300 text-black">
          <strong>{msg.username}:</strong> {msg.message}
        </li>
      </div>
    )}
  </>;
};

export default ChatMessage;