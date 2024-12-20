// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract TaxPayment {
    // Define an event that logs payment details
    event TaxPaid(
        address indexed sender,
        address indexed recipient,
        uint amount,
        string senderName,
        string recipientName,
        string panCard
    );

    // Example function to pay tax and emit the event
    function payTax(address payable recipient, uint amount, string calldata senderName, string calldata recipientName, string calldata panCard) external payable {
        require(msg.value == amount, "Amount sent does not match the specified amount.");
        recipient.transfer(amount);
        emit TaxPaid(msg.sender, recipient, amount, senderName, recipientName, panCard);
    }
}