# Cardano native token

The following installation steps were executed Ubuntu run via Windows Subsystem for Linux (WSL). Therefore, there's no guarantee that the steps executed on different operating system will succeed.

Prerequisites:
1. Installed cardano-node, cardano-cli and cardano-wallet
2. Cardano-node up, running and synced

Steps:
Set the environment variables and working directory:
```
cd $HOME
mkdir token
cd token
mkdir policy
export CARDANO_NODE_SOCKET_PATH="$HOME/cardano-node/db/node.socket"
tokenname=$(echo -n "TheBestToken" | xxd -b -ps -c 80 | tr -d '\n')
tokenamount="10000000"
output="0"
```

Check if the node is properly synced:
```
cardano-cli query tip --testnet-magic 1097911063
```

Generate the keys and the address:
```
cardano-cli address key-gen --verification-key-file payment.vkey --signing-key-file payment.skey
cardano-cli address build --payment-verification-key-file payment.vkey --out-file payment.addr --testnet-magic 1097911063
address=$(cat payment.addr)
```

Check your address and get some test ADA from the faucet:
```
echo $address
```
https://developers.cardano.org/docs/integrate-cardano/testnet-faucet/


Export the protocol parameters
```
cardano-cli query protocol-parameters --testnet-magic 1097911063 --out-file protocol.json
```

Generating the token policy:
```
cardano-cli address key-gen \
    --verification-key-file policy/policy.vkey \
    --signing-key-file policy/policy.skey
touch policy/policy.script && echo "" > policy/policy.script   

echo "{" >> policy/policy.script 
echo "  \"keyHash\": \"$(cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)\"," >> policy/policy.script 
echo "  \"type\": \"sig\"" >> policy/policy.script 
echo "}" >> policy/policy.script
```

Minting of the token:
Prepare the environment variables -
```
cardano-cli transaction policyid --script-file ./policy/policy.script > policy/policyID

txhash="hash of your address"
txix="0"
funds="put the amount here"
fee="300000"
policyid=$(cat policy/policyID)
```

Build a raw transaction, sign it and send to the blockchain:
```
cardano-cli transaction build-raw \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $address+$output+"$tokenamount $policyid.$tokenname" \
--mint="$tokenamount $policyid.$tokenname1" \
--minting-script-file policy/policy.script \
--out-file matx.raw

cardano-cli transaction sign  \
--signing-key-file payment.skey  \
--signing-key-file policy/policy.skey  \
--testnet-magic 1097911063 --tx-body-file matx.raw  \
--out-file matx.signed

cardano-cli transaction submit --tx-file matx.signed --testnet-magic 1097911063
```

Unfortunately, the guide on https://developers.cardano.org/docs is not easy to follow at all.