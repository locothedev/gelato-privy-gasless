# Gelato Ink Faucet

A token faucet application for the Ink Sepolia testnet, allowing users to mint free test tokens using Gelato Smart Wallet integration with Privy authentication.

## Prerequisites

Before you begin, you'll need to set up accounts and gather API keys from the following services:

### 1. Gelato API Key
- Follow the guide to create a Gelato API key: [Create a Gelato API Key](https://docs.gelato.cloud/Paymaster-&-Bundler/How-To-Guides/Create-a-Api-Key)
- Save your API key for later use

### 2. Gelato Private RPC URL
- Get a private RPC URL from Gelato: [Get a Private RPC](https://docs.gelato.cloud/Private-RPCs/How-To-Guides/Get-a-private-rpc)
- You'll need both HTTP and WebSocket URLs

### 3. Gelato Gas Tank Setup
- Set up a Gas Tank to sponsor transaction fees: [Setting up GasTank](https://docs.gelato.cloud/Paymaster-&-Bundler/GasTank/Setting-up-GasTank)
- This enables gasless transactions for your users

### 4. Privy Account & Configuration

#### Create Privy Account
- Sign up for a Privy account: [Get Started with Privy](https://docs.privy.io/basics/get-started/account)
- Create a new app in your Privy dashboard

#### Configure Smart Wallets
Follow these steps in your Privy dashboard to enable smart wallets: [EVM Smart Wallets Setup](https://docs.privy.io/wallets/using-wallets/evm-smart-wallets/setup/configuring-dashboard)

1. **Enable Smart Wallets**
   - Navigate to Smart Wallets section
   - Enable Kernel as the smart wallet type

2. **Add Custom Chain (Ink Sepolia)**
   - Chain ID: `763373`
   - RPC URL: Use the RPC URL from your Gelato dashboard
   - Bundler URL: `https://api.gelato.digital/bundlers/763373/rpc?apiKey=YOUR_API_KEY&sponsored=true`
   - Replace `YOUR_API_KEY` with your actual Gelato API key

#### Configure Authentication Methods
In the Authentication section:
- Enable **Email** login
- Enable **External Wallet** login

#### Configure Embedded Wallets (IMPORTANT!)
In the Embedded Wallets section, enable these critical settings:
1. **Automatically create embedded wallets on login**
   - Turn this ON - Privy will create embedded wallets for users without linked wallets when they sign up
2. Select **EVM** as the wallet type
3. Enable **"Create embedded wallets for all users, even if they have linked external wallets"**
   - This ensures all users have an embedded wallet regardless of their login method

## Installation

### Important: Private Submodule Access
This project uses a private git submodule (`gelato-ui`) for the UI component library. To run this project locally, you must have:
- SSH access to the private `gelato-ui` repository at https://github.com/locothedev/gelato-ui
- Proper SSH keys configured for GitHub

### Local Development Setup

1. Clone the repository with submodules:
```bash
git clone --recurse-submodules <your-repo-url>
cd gelato-task
```

If you already cloned without submodules, initialize them:
```bash
git submodule update --init --recursive
```

2. Install dependencies using Bun:
```bash
bun install
```

### Vercel Deployment
For Vercel deployments, a custom install script is configured to handle the private submodule:

1. **Set the custom install command** in Vercel:
   ```
   bun run install:vercel
   ```

2. **Add required environment variable** in Vercel dashboard:
   - `GITHUB_REPO_CLONE_TOKEN`: A GitHub personal access token with `repo` scope for accessing the private gelato-ui repository

3. The `install:vercel` script will:
   - Run `submodule.sh` to authenticate and clone the private submodule
   - Install all dependencies with `bun install`

Note: The submodule.sh script uses token-based authentication for CI/CD environments where SSH keys aren't available

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   - Fill in your environment variables:
   ```env
   NEXT_PUBLIC_GELATO_API_KEY=your_gelato_api_key_here
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
   NEXT_PUBLIC_RPC_URL=your_gelato_rpc_url_here
   NEXT_PUBLIC_WS_RPC_URL=your_gelato_websocket_rpc_url_here
   NEXT_PUBLIC_ERC20_TOKEN_ADDRESS=deployed_token_contract_address
   ```

## Running the Application

Start the development server:
```bash
bun dev
```

The application will be available at `http://localhost:3000`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom gelato-ui component library (via git submodule)
- **Wallet Integration**: Gelato Smart Wallet with Privy
- **Chain**: Ink Sepolia testnet (Chain ID: 763373)
- **Package Manager**: Bun

## Features

- 🔐 **Smart Wallet Authentication**: Login with email or external wallet
- 💰 **Token Balance Display**: Real-time token balance with auto-refresh
- 🪙 **Token Minting**: Mint 1000 test tokens at a time
- ⛽ **Gasless Transactions**: All transactions are sponsored via Gelato Gas Tank
- 🔗 **Transaction Tracking**: View transactions on block explorer

## Project Structure

```
gelato-task/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── auth/              # Authentication components
│   ├── token/             # Token-related components
│   └── wallet/            # Wallet components
├── packages/gelato-ui/    # UI component library (git submodule)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── constants/             # Application constants
```

## Troubleshooting

### Smart Wallet Not Working
- Ensure you've enabled Kernel as the smart wallet type in Privy dashboard
- Verify the Bundler URL includes `&sponsored=true` parameter
- Check that your Gas Tank has sufficient balance

### Authentication Issues
- Confirm both Email and External Wallet login methods are enabled in Privy
- Verify embedded wallets are set to be created automatically for all users

### Transaction Failures
- Check your Gelato API key is valid and has proper permissions
- Ensure the Gas Tank is properly configured and funded
- Verify the RPC URLs are correct for Ink Sepolia

## Support

For issues related to:
- **Gelato**: Check [Gelato Documentation](https://docs.gelato.cloud/)
- **Privy**: Visit [Privy Documentation](https://docs.privy.io/)
- **Application**: Open an issue in this repository

## License

[Your License Here]