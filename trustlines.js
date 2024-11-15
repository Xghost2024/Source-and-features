
const xrpl = require('xrpl');

const client = new xrpl.Client("https://s.altnet.rippletest.net:51234");

async function setupTrustline(wallet, issuer, currencyCode) {
    try {
        await client.connect();

        const trustSet = {
            TransactionType: "TrustSet",
            Account: wallet.classicAddress,
            LimitAmount: {
                currency: currencyCode,
                issuer: issuer.classicAddress,
                value: "10000",
            },
        };

        const response = await client.submitAndWait(trustSet);
        console.log("Trustline setup response:", response);
    } catch (error) {
        console.error("Error during trustline setup:", error);
    } finally {
        await client.disconnect();
    }
}

module.exports = { setupTrustline };
