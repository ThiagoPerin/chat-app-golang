import { Badge } from "@/components/ui/badge"

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
      <div className="w-full flex items-center justify-end my-1">
        <Badge variant="default" className="w-fit py-2 px-4 text-md">{msg.message}</Badge>
      </div>
    ) : (
      <div className="w-full flex items-center justify-start my-1">
        <Badge variant="secondary" className="w-fit flex flex-col items-start py-2 px-4 text-md">
          <div className="font-bold text-sm">
            {msg.username}
          </div>
          {msg.message}
        </Badge>
      </div>
    )}
  </>;
};

export default ChatMessage;