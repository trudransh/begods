#!/bin/bash
dfx identity use default
# Exit immediately if a command exits with a non-zero status
set -e
dfx identity get-principal;
export DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)
# MINTER_ACCOUNT_ID=d898ce9ed801ccb3051fb6948a42d923ceacf39ac4e7ba98e14fe7c221ead305
DEFAULT_ACCOUNT_ID=af110b0d0563339ae4e479ff74de7894afcbc7a32db9dff03ba09b07116632aa
CHANDAN_ACCOUNT_ID='492aacd082a520dfc078678759756ef4ac11133083799c77d4acc7a3490cb5ec';

block_height=$(dfx canister call icp_ledger_canister send_dfx "(record { 
    to = \"$CHANDAN_ACCOUNT_ID\";
    from = \"$DEFAULT_ACCOUNT_ID\"; 
    amount = record { e8s = 100_000_000 : nat64 }; 
    fee = record { e8s = 10000 : nat64 }; 
    memo = 0; 
    created_at_time = null;
})")


echo "Transaction sent. Block height: $block_height"

# dfx wallet balance


echo "DEFAULT_ACCOUNT_ID: $DEFAULT_ACCOUNT_ID"

balance=$(dfx canister call icp_ledger_canister account_balance_dfx "(record {account = \"$DEFAULT_ACCOUNT_ID\";})")
echo "Balance of the default account: $balance"

# Replace with the recipient principal (or account ID if known)
RECIPIENT_PRINCIPAL="2ipdv-mwghn-c5x64-fkchv-hbvge-yobre-szmep-6ntkb-d3a3h-w5jg6-zqe"

# Convert the recipient's principal to their account ID
RECIPIENT_ACCOUNT_ID=$(dfx ledger account-id --of-principal "$RECIPIENT_PRINCIPAL")

# Display the recipient account ID
echo "RECIPIENT_ACCOUNT_ID: $RECIPIENT_ACCOUNT_ID"

# Check and display the balance of the recipient account
recipient_balance=$(dfx canister call icp_ledger_canister account_balance_dfx "(record {account = \"$RECIPIENT_ACCOUNT_ID\";})")
echo "Balance of the recipient account: $recipient_balance"
