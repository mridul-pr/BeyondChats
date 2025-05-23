// AICopilotInbox.jsx
// Responsive AI-powered customer support inbox with animations and mobile support

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  Copy,
  Edit3,
  Sparkles,
  Clock,
  CheckCircle,
  X,
  MessageSquare,
} from "lucide-react";
import "./AICopilotInbox.scss";

export default function AICopilotInbox() {
  // ===== STATE MANAGEMENT =====
  // Main conversation messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "customer",
      content:
        "Hi, I'm having trouble with my recent order. It shows as delivered but I never received it.",
      time: "2:34 PM",
    },
    {
      id: 2,
      sender: "agent",
      content:
        "I understand your concern about your missing order. Let me help you resolve this right away.",
      time: "2:35 PM",
    },
  ]);

  // AI assistant state
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [conversationContext, setConversationContext] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // UI state management
  const [showAiPanel, setShowAiPanel] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Refs for DOM manipulation
  const messagesEndRef = useRef(null);
  const composerRef = useRef(null);

  // ===== RESPONSIVE BEHAVIOR =====
  // Handle window resize and mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // Desktop breakpoint
      setIsMobile(mobile);

      // Auto-hide AI panel on mobile for better UX
      if (mobile) {
        setShowAiPanel(false);
      }
    };

    // Initial check
    checkMobile();

    // Add resize listener with debouncing
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // ===== AUTO-SCROLL FUNCTIONALITY =====
  // Automatically scroll to bottom when new messages arrive
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // ===== AI QUERY HANDLER =====
  // Process AI queries with simulated API calls and context awareness
  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;

    setIsGenerating(true);
    const newContext = [...conversationContext, aiQuery];
    setConversationContext(newContext);

    // Simulate API call with realistic delay
    setTimeout(() => {
      let response = "";
      const queryLower = aiQuery.toLowerCase();

      // Context-aware responses based on query content
      if (
        queryLower.includes("missing order") ||
        queryLower.includes("delivery")
      ) {
        response =
          "Based on our help documentation and previous similar cases, here's how to handle missing delivery issues:\n\n1. First, verify the delivery address with the customer\n2. Check our shipping partner's tracking system for detailed delivery confirmation\n3. If confirmed delivered but customer didn't receive it, offer to:\n   - Contact the shipping carrier for investigation\n   - Process a replacement order immediately\n   - Provide a full refund if preferred\n\nThis approach has resolved 94% of similar cases successfully.";
      } else if (
        queryLower.includes("make it sound like us") ||
        queryLower.includes("personalize")
      ) {
        response =
          "Here's a more personalized version:\n\n\"I'm really sorry to hear your package didn't make it to you! That's definitely frustrating. Let me dig into this right away and get it sorted out for you. I'll check with our shipping team to see exactly what happened, and we'll make sure you get your order - whether that's sending a new one or getting you a full refund. We've got your back on this! 🙂\"";
      } else if (queryLower.includes("escalate")) {
        response =
          "For escalation procedures:\n\n1. Assess the situation severity (financial impact, customer tier, complexity)\n2. Gather all relevant details and context\n3. For Premium customers: Direct escalation to senior support\n4. Document the escalation reason clearly\n5. Set appropriate expectations with the customer\n6. Follow up within 2 hours\n\nAlways inform the customer about the escalation process and timeline.";
      } else {
        response =
          "I can help you craft a response based on our knowledge base and best practices. What specific aspect of customer service would you like assistance with?";
      }

      setAiResponse(response);
      setIsGenerating(false);
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds for realism
  };

  // ===== MESSAGE HANDLERS =====
  // Add AI response to message composer
  const addToComposer = () => {
    setNewMessage(aiResponse);
    // Focus composer after adding content
    setTimeout(() => {
      composerRef.current?.focus();
    }, 100);
  };

  // Send new message to conversation
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "agent",
      content: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");

    // Optional: Add customer response simulation for demo purposes
    if (Math.random() > 0.7) {
      // 30% chance of auto-response
      setTimeout(() => {
        const customerResponses = [
          "Thank you for looking into this!",
          "That sounds good, I appreciate your help.",
          "Perfect, when can I expect an update?",
          "Great, thank you for the quick response!",
        ];

        const randomResponse =
          customerResponses[
            Math.floor(Math.random() * customerResponses.length)
          ];
        const customerMsg = {
          id: messages.length + 2,
          sender: "customer",
          content: randomResponse,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, customerMsg]);
      }, 2000 + Math.random() * 3000); // Random delay 2-5 seconds
    }
  };

  // ===== QUICK ACTION HANDLERS =====
  // Handle predefined quick action buttons
  const handleQuickAction = (action) => {
    const actions = {
      "missing-delivery": "How do I handle missing orders?",
      personalize: "Make it sound more like us",
      escalate: "How do I escalate this issue?",
    };

    if (actions[action]) {
      setAiQuery(actions[action]);
      // Auto-trigger the query for better UX
      setTimeout(() => {
        handleAiQuery();
      }, 100);
    }
  };

  // ===== KEYBOARD SHORTCUTS =====
  // Handle keyboard events for better accessibility
  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd + Enter to send message
        if (action === "send") {
          sendMessage();
        } else if (action === "query") {
          handleAiQuery();
        }
      } else if (!e.shiftKey && action === "query") {
        // Enter to send AI query (without Shift)
        e.preventDefault();
        handleAiQuery();
      }
    }
  };

  // ===== PANEL TOGGLE HANDLERS =====
  // Toggle AI panel visibility with animation
  const toggleAiPanel = () => {
    setShowAiPanel((prev) => !prev);
  };

  // Close AI panel (for mobile backdrop)
  const closeAiPanel = () => {
    setShowAiPanel(false);
  };

  // ===== RENDER COMPONENT =====
  return (
    <div className="inbox-container">
      {/* Mobile backdrop for AI panel */}
      {isMobile && (
        <div
          className={`ai-panel-backdrop ${showAiPanel ? "show" : ""}`}
          onClick={closeAiPanel}
        />
      )}

      {/* ===== MAIN CONVERSATION AREA ===== */}
      <div className="conversation-area">
        {/* Header with customer information */}
        <div className="conversation-header">
          <div className="customer-info">
            <h2 className="customer-name">Mridul Pramod</h2>
            <p className="customer-details">Order #12847 • Premium Customer</p>
          </div>
          <div className="header-actions">
            <span className="status-badge status-active">Active</span>
            <button
              className="action-btn"
              title="AI Features"
              aria-label="Access AI features"
            >
              <Sparkles className="icon" />
            </button>
          </div>
        </div>

        {/* AI-generated conversation summary */}
        <div className="ai-summary-banner">
          <Bot className="summary-icon" />
          <div className="summary-content">
            <p className="summary-title">AI Summary</p>
            <p className="summary-text">
              Customer reporting missing delivery for Order #12847. Premium
              customer with 3-year history. Previous delivery issues resolved
              successfully.
            </p>
          </div>
        </div>

        {/* Messages container with scroll */}
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender}`}
              style={{
                // Staggered animation delay for smooth appearance
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={`message-bubble ${message.sender}`}>
                <p className="message-content">{message.content}</p>
                <p className="message-time">{message.time}</p>
              </div>
            </div>
          ))}
          {/* Invisible element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message composer */}
        <div className="message-composer">
          <textarea
            ref={composerRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, "send")}
            placeholder="Type your message... (Ctrl+Enter to send)"
            className="composer-input"
            rows="2"
            aria-label="Type your message"
          />
          <button
            onClick={sendMessage}
            className="send-btn"
            disabled={!newMessage.trim()}
            title="Send message (Ctrl+Enter)"
            aria-label="Send message"
          >
            <Send className="icon" />
          </button>
        </div>
      </div>

      {/* ===== AI COPILOT PANEL ===== */}
      <div className={`ai-panel ${showAiPanel ? "show" : ""}`}>
        {/* AI panel header */}
        <div className="ai-panel-header">
          <Bot className="ai-icon" />
          <h3 className="ai-title">AI Co-pilot</h3>
          <span className="efficiency-badge">31% efficiency boost</span>
          {/* Close button for mobile */}
          {isMobile && (
            <button
              className="close-btn"
              onClick={closeAiPanel}
              title="Close AI panel"
              aria-label="Close AI panel"
            >
              <X className="icon" />
            </button>
          )}
        </div>

        {/* AI panel content */}
        <div className="ai-panel-content">
          {/* Query input section */}
          <div className="query-section">
            <label className="query-label" htmlFor="ai-query">
              Ask your AI assistant
            </label>
            <div className="query-input-group">
              <input
                id="ai-query"
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, "query")}
                placeholder="How should I handle missing orders?"
                className="query-input"
                disabled={isGenerating}
                aria-describedby="query-help"
              />
              <button
                onClick={handleAiQuery}
                disabled={isGenerating || !aiQuery.trim()}
                className="query-btn"
                title={
                  isGenerating ? "Generating response..." : "Send query (Enter)"
                }
                aria-label={
                  isGenerating ? "Generating response" : "Send AI query"
                }
              >
                {isGenerating ? (
                  <Clock className="icon spinning" />
                ) : (
                  <Send className="icon" />
                )}
              </button>
            </div>
            <p id="query-help" className="sr-only">
              Enter your question and press Enter or click the send button
            </p>
          </div>

          {/* Context awareness display */}
          {conversationContext.length > 0 && (
            <div className="context-section">
              <p className="context-title">Previous queries in this session:</p>
              {conversationContext.slice(-2).map((query, idx) => (
                <p key={idx} className="context-item">
                  • {query}
                </p>
              ))}
            </div>
          )}

          {/* AI response display */}
          {aiResponse && (
            <div className="response-section">
              <div className="response-container">
                <div className="verification-badge">
                  <CheckCircle className="check-icon" />
                  <span className="verification-text">
                    Verified from internal content
                  </span>
                </div>
                <p className="response-text">{aiResponse}</p>
              </div>

              {/* Response action buttons */}
              <div className="response-actions">
                <button
                  onClick={addToComposer}
                  className="add-to-composer-btn"
                  title="Add response to message composer"
                  aria-label="Add AI response to message composer"
                >
                  <Copy className="icon" />
                  <span>Add to Composer</span>
                </button>
                <button
                  className="edit-btn"
                  title="Edit response"
                  aria-label="Edit AI response"
                >
                  <Edit3 className="icon" />
                </button>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="quick-actions">
            <p className="quick-actions-title">Quick Actions</p>
            <div className="quick-actions-list">
              <button
                onClick={() => handleQuickAction("missing-delivery")}
                className="quick-action-btn"
                disabled={isGenerating}
              >
                Handle missing deliveries
              </button>
              <button
                onClick={() => handleQuickAction("personalize")}
                className="quick-action-btn"
                disabled={isGenerating}
              >
                Personalize response tone
              </button>
              <button
                onClick={() => handleQuickAction("escalate")}
                className="quick-action-btn"
                disabled={isGenerating}
              >
                Escalation procedures
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile AI panel toggle button */}
      {isMobile && (
        <button
          className="ai-panel-toggle"
          onClick={toggleAiPanel}
          title="Toggle AI Assistant"
          aria-label="Toggle AI Assistant panel"
        >
          <MessageSquare className="icon" />
        </button>
      )}
    </div>
  );
}
