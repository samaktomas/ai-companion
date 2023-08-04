"use client";
import { Companion } from "@prisma/client";
import { ElementRef, FC, useEffect, useRef, useState } from "react";
import ChatMessage, { ChatMessageProps } from "./chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  messages = [],
  isLoading,
  companion,
}) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLaoding] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLaoding(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          src={companion.src}
          content={message.content}
        />
      ))}
      {isLoading && <ChatMessage isLoading src={companion.src} role="system" />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
