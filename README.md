# Tech with Ease Customer Support Portal

## Overview
Tech with Ease is a customer support portal featuring an embedded Amazon Lex chatbot designed to provide automated troubleshooting assistance and customer support services.

The solution uses AWS managed services including Amazon Lex, Amazon Cognito, AWS Lambda, Amazon DynamoDB, and Amazon Connect to deliver a scalable, serverless chatbot experience with secure user authentication.

---

## Project Features

- Responsive customer support landing page
- Embedded Amazon Lex chatbot UI
- Passwordless email authentication using Amazon Cognito
- Secure user sign-in flow with one-time passcode verification
- Automated troubleshooting workflows
- Live agent escalation through Amazon Connect
- Session persistence using Amazon DynamoDB
- Automated testing and validation documentation

![website GIF](/img/TechWithEase_chat_demo.gif)

Try the [live demo](https://priscawhite.github.io/techwithease)!  
Type or say "My internet is not working" or "I need help with my bill"

---
# Website Configuration

## Landing Page Design

Custom login and landing pages were designed and developed for the Tech with Ease customer portal.

Customers use this portal to:

- log in securely
- access IT support resources
- interact with the chatbot
- connect with support services

The landing page serves as the primary entry point for the support experience.

---

# Embedded Amazon Lex Chatbot

The Amazon Lex chatbot is embedded into the landing page using an iframe-based implementation.

This approach provides:

- a self-contained chatbot widget
- isolated UI rendering
- communication between the chatbot and parent page

The implementation uses the `lex-web-ui-loader.js` loader library to dynamically load the chatbot into the webpage.

## Hosting Configuration

The chatbot UI assets and loader files are hosted in:

- Amazon S3
- Amazon CloudFront

CloudFront provides secure and scalable content delivery for the web application assets.

---

# Chatbot Loader Configuration

## Step 1 — Load the Loader Library

A script tag was added to the HTML body of the parent page that references the loader library.

This script creates the global variable:

```javascript
ChatbotUiLoader
```

The variable exposes the loader library functionality used to initialize the chatbot iframe.

---

## Step 2 — Configure the Chatbot iframe

An additional script was added to the HTML body of the landing page to load the chatbot iframe dynamically.

### Configuration Details

#### a. Configure `loaderOpts`

The `loaderOpts` variable sets the `baseUrl` used to download chatbot dependencies from the Amazon S3 bucket.

```javascript
var loaderOpts = {
  baseUrl: 'https://<cloudfront-distribution>.cloudfront.net/'
}
```

#### b. Instantiate the iframe loader

The `ChatbotUiLoader` object contains the `IframeLoader` constructor.

The loader is instantiated and passed the loader options.

```javascript
var lexWebUiLoader = new ChatBotUiLoader.IframeLoader(loaderOpts);
```

#### c. Configure `chatbotUiConfig`

The `chatbotUiConfig` object passes configuration values including:

- `parentOrigin`
- `iframeOrigin`

These settings establish trusted communication between the parent webpage and the embedded iframe.

```javascript
var chatbotUiConfig = {
  ui: {
    parentOrigin: 'http://127.0.0.1:5500'
  },
  iframe: {
    iframeOrigin: 'https://<cloudfront-distribution>.cloudfront.net'
  }
}
```

---

## Step 3 — Load the iframe

The loader dynamically creates and injects the chatbot iframe into the landing page.

```javascript
lexWebUiLoader.load(chatbotUiConfig)
```

---

# Loader Library Features

The loader framework provides several capabilities beyond iframe creation.

## Features

- dynamically creates the iframe element
- supports asynchronous configuration loading
- supports JSON-based configuration files
- provides an API bridge between:
  - the iframe
  - the parent webpage
- allows passing:
  - Amazon Lex state
  - session data
  - chatbot events
  - custom UI interactions

---

## Authentication Flow

![architecture_diagram](/img/architecture_flow.png)

### User Login Experience
The application includes a custom login page for end users that integrates with Amazon Cognito authentication services.

### Authentication Process
1. User enters their email address on the login page
2. Amazon Cognito sends a one-time verification passcode to the user email
3. User enters the verification code to authenticate
4. Upon successful authentication, the user is routed to the main landing page
5. The chatbot is accessible on the landing page

---

## Amazon Cognito Configuration

### Authentication Components
- Amazon Cognito User Pool
- Amazon Cognito App Client
- Amazon Cognito Identity Pool

### Configuration Details
| Component | Purpose |
|---|---|
| User Pool | Manages end-user authentication |
| App Client | Enables frontend authentication integration |
| Identity Pool | Provides AWS credentials for application access |

### Authentication Features
- Passwordless authentication
- Email-based one-time passcode verification
- Secure session management
- Managed authentication workflow

---

## Amazon Lex Integration

### Chatbot Features
- Intent recognition
- Slot management
- Automated troubleshooting assistance
- Escalation to live support agents

### Backend Integrations
- AWS Lambda for fulfillment logic
- DynamoDB for session persistence
- Amazon Connect for live support escalation

---

## DynamoDB Integration

### Table Usage
Amazon DynamoDB is used to:
- Store chatbot session data
- Persist troubleshooting history
- Track interaction metadata
- Maintain conversation state

### Key Features
- Serverless NoSQL database
- On-demand scalability
- High availability
- Low-latency performance

---

## Amazon Connect Integration

### Contact Flow Usage
Amazon Connect contact flows are used to:
- Route customers to support agents
- Manage escalation workflows
- Handle chatbot-to-agent handoff
- Support customer service interactions

---

## Deployment

### Infrastructure
The chatbot UI and supporting AWS resources were deployed using AWS CloudFormation.

### Provisioned Resources
- Amazon Lex bot
- Amazon Cognito resources
- Lambda functions
- DynamoDB tables
- IAM roles and permissions
- CloudFront distribution
- Chatbot UI hosting resources

---

## Testing

### Automated Validation
The project includes automated test documentation covering:
- Authentication workflows
- Chatbot functionality
- API integrations
- End-to-end user flows

---

## Future Enhancements

- Multi-factor authentication support
- Expanded troubleshooting workflows
- Advanced chatbot analytics
- Multi-language chatbot support
- Enhanced session reporting
- AI-powered sentiment analysis

---

## AWS Services Used

- Amazon Lex V2
- Amazon Cognito
- Amazon DynamoDB
- AWS Lambda
- Amazon Connect
- AWS CloudFormation
- Amazon CloudWatch
- Amazon CloudFront
- AWS IAM

---

## License
This project is intended for educational and portfolio demonstration purposes.
