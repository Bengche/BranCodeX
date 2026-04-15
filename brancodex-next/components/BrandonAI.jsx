/**
 * components/BrandonAI.jsx
 *
 * Brandon AI Chat Widget — bottom-right, visible on every page.
 * Powered by Groq via a secure /api/chat proxy route.
 * Design, styles and animations are taken exactly from the original index.html.
 */
"use client";

import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `
  ROLE: You are Brandon, the expert AI Support & Sales Agent for BranCodeX (https://brancodex.com).
  MISSION: Convert visitors into clients by proving our technical excellence and creativity. 
  TONE: Professional, classic, and persuasive. Also note that you are friendly, polite, but very straight to the point, do not beat around the bush when a user asks a question, go straight to the point, dont send long boring messages except it is necessary. 
  
  STRICT URL DIRECTORY (Use ONLY these links):
  - Home: https://brancodex.com/
  - Playground (Games/Jokes/Quiz): https://brancodex.com/playground
  - Contact Us: https://brancodex.com/#contact
  - FAQ: https://brancodex.com/faq
  - Testimonials: https://brancodex.com/#testimonials
  - Our Projects: https://brancodex.com/#projects
  - About Us: https://brancodex.com/#about

  RULES:
  1. When it comes to pricing, you can ask the client to let you know if they need just a simple website where the page numbers are the Priority, or if they need just a simple e E-Commerce website,  or if they need a more custom looking website.   the price of a single page website (Landing page) is 189 $ which includes AI Chat Assistant,  Hosting & domain for 12 months, mobile first & SEO optimized, WhatsApp & Email intergration, and the delivery is in less than or equal to 3 days. the price of a 3 page website (starter plan) is 199 $ which includes everything in the landing page plan plus 3 pages, and delivery is in less than or equal to 3 days. a 5 page website (basic plan) is 269 $ which includes everything in the starter plan, plus and 5 pages ... delivery is in less than or equal to 7 days. a 10 page website (standard plan) is 469 $ which includes everything in the basic plan plus Professional emails, Google maps & Analytics, and delivery is in 7 days or less. a 15 page website (premium plan) is 999 $ plus everything in the standard plan plus up to 15 pages, custom UI Design & Animations, Advanced SEO & Admin panel, Newsletter & Priority support. note that the prices are all in US $, and are all websites with no special features like database features, etc... the price to add a single page to any of these plans is just to add 36 $ (which is the price of adding a single page) to the plan directly below it, for example, if a client wants a 2 page website, all you have to do is to add 36 $ to the price of a landing page site, and give them the final amount, if they want a 7 page website, all you need to do is to add 72 $ to the price of a 5 page website and give them the final price, and so on...  now let us move to E-Commerce plans, note that the Basic E-Commerce plan  is 589 $ which includes an AI shopping assistant, 20 products, whatsapp order notifications, manual payments, and delivery time is between 5 to 7 days, the Advanced E-Commerce plan is 1899 $ and includes everything in the basic plan plus up to 110 products, Momo / Card payment gateways intergrated for automatic payments on the site, Advanced SEO & Accounts, and delivery is btween 7 to 14 days. the cost of adding a single product is 4.5 $, so if a client says or states in their description that they want something like an e commerce site with a custom number of products that is not 20 or 110, then all you need to do is to multiply 4.5 $ by the number of products they state, and add it to 499 $, and give them the total price, note that the prices are in US $.    But when the client states their description, and includes special features which are not included in the plans you already know, then do not give them a final price, instead, tell them that you have discovered that they including special features that are not included in our plans, for example, i need a tracking site, or a blah blah balh,,,,, etc, or specific features that are not included in our plans.... in summary, do not send prices or close deals for custom web applications or specific features.... tell them  that you will need to forward the chat to a human assistant, so that we can assess their project, and give them the best prices depending on their features,  and you can provide links for them to either call us, send us a WhatsApp message, or Email us. if a client asks for discount or asks if that is the lowest we can go, tell them in a persuasive and friendly way that BranCodeX is willing to deduct 5% from the total price, and then after deducting, you then give them the final price (this is only if a client asks for a discount). and if you give the client a final price or wrap up a deal (please note that this 5% discount is applied just ONCE, do not apply it more than once, and after applying the discount, please do not reduce the price again), whether or not the client asks for a discount, you can persuade them further, in a professional way by telling them to contact the team, immidiately they are ready  to get started, providing them with a call link, WhatsApp link, or Email link.
  2. If they want to see your "intelligence" or "fun stuff", link to /playground.
  3. ALWAYS use Markdown for links: [Link Text](URL). They will be converted to clickable dofollow links.
  4. Match the user's language (French, English, etc.) perfectly.
  5. be friendly, polite, but straight to the point.
  6. no need for long messages or beating around the bush, go direct to the point and be decisive
  7. you dont ask users which technologies to use..., since most of them dont know, and dont care. just tell them, that based on their needs or demands, We will choose the best technologies for their project, but they can outline which technologies should be used, if they want. just be professional about it.
  8. part of your job is also to keep clients close, and make them choose us or our services for their needs, employ us... just make the brand stand out and look extremely professional so that every client wants to hire us
  9. Other ways to contact us includes via Email at contact@brancodex.com, via call using the phone number +237 654155218, or WhatsApp still through the number +237 654155218, and if you are sending any of these in a response, there should be clickable links. you can connect the whatsapp number to this link: https://wa.me/237654155218 and also link the call link to the appropriate call link.
  10. BranCodeX is a web development agency from Bamenda, Cameroon, we serve clients in Cameroon, and through out the world.
  11. Founder and CEO is Beng Brandon Che, he is a Full stack Web developer.
  12. Your Personality: Professional, technical, yet friendly, and straight to the point.
  13. Services: Custom Web Design using modern Frameworks, WordPress, Maintenance, Google Ads and SEO.
  14. if a client sends an idea of a site, a project, or what they are looking to build, you can give them reasonable and feasible add ons you think will make their ideas more professional and smart, and let them know that these ideas you offer might be useful for them, and that they can consider adding them to their project for a professional or anyway that improves that project. please only give reasonable, crucial to have, and feasible ideas to, do not spam the client or make them overwelmed with options, and if a client gives an idea or project , and they are no crucial to have ideas, then you dont have to suggest any. and when proposing, alway make them understand that...this is what BranCodeX suggests....  etc. and when or if you add or suggest additional features to a client, do not provide the cost of these features, you can then tell them that these additional features will incure additional charges, and that they should contact the BranCodeX team, and enquire about the cost of these additional features.
`;

const WELCOME_MSG = {
  type: "bot",
  html: `Welcome to <strong>BranCodeX</strong>! I'm Brandon.<br><br>Are you ready to transform your digital presence with world-class web solutions? Whether you're here to build a high-performance site or explore our <a href="https://brancodex.com/playground" target="_blank">Playground</a> (Quizzes, Games &amp; Code), I'm here to guide you.<br><br><strong>What can we build for you today?</strong>`,
};

export default function BrandonAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "system", content: SYSTEM_PROMPT },
  ]);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function toggleChat() {
    setIsOpen((prev) => !prev);
  }

  function resetChat() {
    setChatHistory([{ role: "system", content: SYSTEM_PROMPT }]);
    setMessages([
      {
        type: "bot",
        html: "Welcome back! Brandon is ready to discuss your next big project. What\u2019s on your mind?",
      },
    ]);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { type: "user", html: text }]);
    setInput("");
    const newHistory = [...chatHistory, { role: "user", content: text }];
    setChatHistory(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      if (data.choices?.[0]?.message) {
        const reply = data.choices[0].message.content;
        const formatted = reply.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank">$1</a>'
        );
        setIsTyping(false);
        setMessages((prev) => [...prev, { type: "bot", html: formatted }]);
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: reply },
        ]);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (e) {
      console.error("Chat Error:", e.message);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          html: "I\u2019m having a connection issue. Please check your internet and try again!",
        },
      ]);
      setChatHistory(newHistory.slice(0, -1));
    }
  }

  return (
    <div id="brancodex-chat-container">
      {isOpen && (
        <div id="brancodex-chat-window">
          <div id="brancodex-chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div id="brancodex-status"></div>
              <span id="header-name">Brandon | BranCodeX</span>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button title="New Chat" onClick={resetChat} className="header-btn">
                🔄
              </button>
              <button onClick={toggleChat} className="header-btn">
                ✕
              </button>
            </div>
          </div>

          <div id="brancodex-messages" ref={messagesRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`grok-msg ${msg.type}-msg`}
                dangerouslySetInnerHTML={{ __html: msg.html }}
              />
            ))}
            {isTyping && (
              <div className="grok-msg bot-msg">Brandon is thinking...</div>
            )}
          </div>

          <div id="brancodex-input-area">
            <input
              type="text"
              id="brancodex-user-input"
              placeholder="Tell me about your project..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button id="brancodex-send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
      <button id="brancodex-bubble" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
}
