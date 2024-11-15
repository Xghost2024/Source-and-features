
import xrpl
from xrpl.models.transactions import Payment, TrustSet
from xrpl.wallet import Wallet
from xrpl.transaction import safe_sign_and_submit_transaction
from xrpl.clients import JsonRpcClient

client = JsonRpcClient("https://s.altnet.rippletest.net:51234")

TOKEN_FEE = 1

super_dealer_wallet = Wallet(seed="s████████████████████████████")

def super_dealer_transaction(sender_wallet, recipient_wallet, amount):
    payment_to_dealer = Payment(
        account=sender_wallet.classic_address,
        destination=super_dealer_wallet.classic_address,
        amount=str(amount + TOKEN_FEE)
    )
    safe_sign_and_submit_transaction(payment_to_dealer, sender_wallet, client)

    payment_to_recipient = Payment(
        account=super_dealer_wallet.classic_address,
        destination=recipient_wallet.classic_address,
        amount=str(amount)
    )
    safe_sign_and_submit_transaction(payment_to_recipient, super_dealer_wallet, client)
    print("Transaction completed successfully.")
