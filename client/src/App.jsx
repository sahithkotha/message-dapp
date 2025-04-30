import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import MessageContract from './contracts/Message.json';

function App() {
  // React hooks
  const [mmStatus, setMmStatus] = useState("Metamask status");
  const [address, setAddress] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkConnection();
    initializeContract();
  }, []);

  async function initializeContract() {
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MessageContract.networks[networkId];
      
      if (!deployedNetwork) {
        throw new Error("Please make sure you are connected to the correct network (Ganache)");
      }

      const instance = new web3.eth.Contract(
        MessageContract.abi,
        deployedNetwork.address
      );
      
      setContract(instance);
    } catch (error) {
      console.error("Error initializing contract:", error);
      setError("Failed to initialize contract. Please make sure you are connected to Ganache network.");
    }
  }

  async function checkConnection() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setMmStatus("✅ Connected to Metamask");
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  }

  // Connect to Metamask wallet
  async function connectWallet() {
    setError("");
    if (window.ethereum) {
      setMmStatus("✅ Metamask detected! Connecting...");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        setIsConnected(true);
        setMmStatus("✅ Connected to Metamask");
        
        // Initialize contract after connecting
        await initializeContract();
      } catch (error) {
        setError("Failed to connect: " + error.message);
        console.error("Error: ", error);
      }
    } else {
      setMmStatus("⚠️ No wallet detected! Please install Metamask.");
    }
  }

  // Format timestamp to readable date
  function formatTimestamp(timestamp) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  // Format address to shorter version
  function formatAddress(addr) {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  // Read messages from smart contract
  async function receive() {
    if (!contract) {
      setError("Contract not initialized. Please make sure you are connected to Ganache network.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const allMessages = await contract.methods.read().call();
      setMessages(allMessages);
    } catch (error) {
      setError("Failed to receive messages: " + error.message);
      console.error("Error receiving messages:", error);
    }
    setIsLoading(false);
  }

  // Write message to smart contract
  async function send() {
    if (!contract) {
      setError("Contract not initialized. Please make sure you are connected to Ganache network.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const getMessage = document.getElementById("message").value;
      if (!getMessage) {
        throw new Error("Please enter a message");
      }
      
      await contract.methods.write(getMessage).send({ from: address });
      document.getElementById("message").value = "";
      // Automatically receive the new messages
      await receive();
    } catch (error) {
      setError("Failed to send message: " + error.message);
      console.error("Error sending message:", error);
    }
    setIsLoading(false);
  }

  // Filter messages based on search term
  const filteredMessages = messages.filter(msg => 
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      {/* Status Bar */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">{mmStatus}</div>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              isConnected
                ? "bg-green-100 text-green-700"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={connectWallet}
            disabled={isConnected}
          >
            {isConnected ? "Connected" : "Connect Wallet"}
          </button>
        </div>
        {address && (
          <div className="mt-2 text-sm text-gray-500">
            Connected Address: {formatAddress(address)}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Message Dapp <span role="img" aria-label="wave">👋</span>
        </h1>

        {/* Input Section */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your message"
            id="message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex space-x-4 justify-center">
            <button
              className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={send}
              disabled={isLoading || !isConnected}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
            <button
              className={`px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={receive}
              disabled={isLoading || !isConnected}
            >
              {isLoading ? "Loading..." : "Receive"}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Messages Display */}
        {filteredMessages.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Messages:</h2>
            <div className="space-y-4">
              {filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">
                      From: {formatAddress(msg.sender)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-800">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        ) : messages.length > 0 ? (
          <div className="mt-8 text-center text-gray-500">
            No messages found matching your search.
          </div>
        ) : (
          <div className="mt-8 text-center text-gray-500">
            No messages yet. Be the first to send one!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
