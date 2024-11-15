
import xrpl
from xrpl.models.transactions import TrustSet
from xrpl.wallet import Wallet
from xrpl.transaction import safe_sign_and_submit_transaction
from xrpl.clients import JsonRpcClient

client = JsonRpcClient("https://s.altnet.rippletest.net:51234")

def setup_trustline(wallet, issuer, currency_code):
    trust_set = TrustSet(
        account=wallet.classic_address,
        limit_amount={
            "currency": currency_code,
            "issuer": issuer.classic_address,
            "value": "10000"
        }
    )
    response = safe_sign_and_submit_transaction(trust_set, wallet, client)
    print(f"Trustline setup response: {response}")
