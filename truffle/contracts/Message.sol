// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Message {
    struct MessageItem {
        string content;
        uint256 timestamp;
        address sender;
    }

    MessageItem[] public messages;

    event MessageSent(string content, uint256 timestamp, address sender);

    function write(string memory newMessage) public {
        MessageItem memory message = MessageItem({
            content: newMessage,
            timestamp: block.timestamp,
            sender: msg.sender
        });
        messages.push(message);
        emit MessageSent(newMessage, block.timestamp, msg.sender);
    }

    function read() public view returns (MessageItem[] memory) {
        return messages;
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }
}
