"use client";
import Script from 'next/script';

const CHATBOT_ID = "bg4SJBYgNukxgy1ybd_MV"; 

const ChatbaseBot = () => {
  return (
    <>
      
      <Script id="chatbase-config" strategy="afterInteractive">
        {`
          window.chatbaseConfig = {
            chatbotId: "${CHATBOT_ID}",
          }
        `}
      </Script>

      
      <Script
        src="https://www.chatbase.co/embed.min.js"
        id={CHATBOT_ID}
        strategy="afterInteractive"
        defer
      />
    </>
  );
};

export default ChatbaseBot;