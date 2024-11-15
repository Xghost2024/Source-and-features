
const xrpl = require('xrpl');

const client = new xrpl.Client("https://s.altnet.rippletest.net:51234");

const TOKEN_FEE = 1;

async function superDealerTransaction(senderWallet, recipientWallet, amount) {
    try {
        await client.connect();

        // Send initial transaction to Super Dealer wallet
        const paymentToDealer = {
            TransactionType: "Payment",
            Account: senderWallet.classicAddress,
            Destination: process.env.SUPER_DEALER_WALLET, // Replace with actual Super Dealer wallet address
            Amount: xrpl.xrpToDrops(amount + TOKEN_FEE),
        };

        const response1 = await client.submitAndWait(paymentToDealer);
        console.log("Payment to dealer submitted:", response1);

        // Conduct transaction from Super Dealer to recipient
        const paymentToRecipient = {
            TransactionType: "Payment",
            Account: process.env.SUPER_DEALER_WALLET, // Replace with actual Super Dealer wallet address
            Destination: recipientWallet.classicAddress,
            Amount: xrpl.xrpToDrops(amount),
        };

        const response2 = await client.submitAndWait(paymentToRecipient);
        console.log("Payment to recipient submitted:", response2);

        console.log("Transaction completed successfully.");
    } catch (error) {
        console.error("Error during transaction:", error);
    } finally {
        await client.disconnect();
    }
}

module.exports = { superDealerTransaction };
