// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract MyContract {
    address private signer;

    constructor() {
        signer = msg.sender;
    }

    function transferERC20(address tokenAddress, address recipient, uint256 amount) external {
        require(msg.sender == signer, "Only the signer can call this function");

        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Insufficient balance in the contract");

        bool success = token.transfer(recipient, amount);
        require(success, "Transfer failed");
    }

    function signMessage(bytes32 message) external view returns (bytes32) {
        require(msg.sender == signer, "Only the signer can call this function");

        return keccak256(abi.encodePacked(message));
    }

    function verifySign(bytes32 message, bytes32 signature) external view returns (bool) {
        address recoveredSigner = recoverSigner(message, signature);
        return recoveredSigner == signer;
    }

    function verifyHash(bytes32 hash, bytes32 signature) external view returns (bool) {
        bytes32 message = prefixed(hash);
        address recoveredSigner = recoverSigner(message, signature);
        return recoveredSigner == signer;
    }

    function getTransactionReceiptByHash(bytes32 transactionHash) external view returns (bool success, uint256 gasUsed) {
        bytes32 receiptHash = prefixed(transactionHash);
        bytes memory encodedReceipt = abi.encodePacked(receiptHash);
        assembly {
            success := staticcall(gas(), address(), add(encodedReceipt, 32), 32, add(encodedReceipt, 32), 64)
            gasUsed := gas()
        }
    }

    function getBalanceByAddress(address tokenAddress, address account) external view returns (uint256 balance) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(account);
    }

    function recoverSigner(bytes32 message, bytes32 signature) private pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := signature
            s := add(signature, 32)
            v := byte(0, mload(add(signature, 64)))
        }

        if (v < 27) {
            v += 27;
        }

        return ecrecover(message, v, r, s);
    }

    function prefixed(bytes32 hash) private pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}