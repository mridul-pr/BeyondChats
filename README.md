<img width="1680" alt="Screenshot 2025-05-23 at 8 00 24 PM" src="https://github.com/user-attachments/assets/06acb12d-f344-4cc9-a2f1-3498630159c0" />


# AI Copilot Inbox

An intelligent customer support interface with AI-powered assistance capabilities. This application provides a modern, responsive inbox system with real-time AI suggestions and automated response generation.

## Features

- **Real-time Messaging Interface**: Responsive chat interface for customer-agent conversations
- **AI-Powered Assistance**: Intelligent suggestions and automated response generation
- **Customer Context**: Dynamic customer information display with status tracking
- **Smart Compose**: AI-assisted message composition with verification
- **Quick Actions**: Pre-defined responses for common scenarios
- **Responsive Design**: Optimized for desktop and mobile devices

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ai-copilot-inbox.git
cd ai-copilot-inbox
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Styling

The application uses SCSS for styling with a comprehensive design system including:

- **Color Variables**: Consistent color palette with primary, secondary, and semantic colors
- **Utility Mixins**: Reusable mixins for common patterns (flex-center, button-base, input-base)
- **Responsive Design**: Mobile-first approach with breakpoint-specific styles
- **Component Styling**: Modular SCSS organization for maintainable code

## Components

-- \*\*AICopilotInbox and its styles

### AICopilotInbox

Main container component that orchestrates the entire inbox interface.

### ConversationArea

- **ConversationHeader**: Customer information and status display
- **MessagesContainer**: Chat message display with agent/customer differentiation
- **MessageComposer**: Input field for composing new messages

### AIPanel

- **QuerySection**: AI query input and processing
- **ContextSection**: Relevant conversation context display
- **ResponseSection**: AI-generated responses with verification
- **QuickActions**: Pre-defined response shortcuts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with SCSS and modern CSS practices
- Icons from [Lucide React](https://lucide.dev/)
