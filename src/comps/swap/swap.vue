<i18n>
en:
    title: "XBL is moving to the EOS Main Net"
    sub: "So go ahead and swap your tokens now!"
    eos: "EOS recipient adress"
    xbl: "Amount"
    rec: "You will receive {eosbl} tokens on the {eosnet}"
    all: "EVERYTHING"
    approve: "Approve"
    register: "Register Swap"
    remaining: "Remaining Balance {balance}"
    rules:
        r1: "Make sure you are using Google Chrome or The Brave Browser and have the Metamask browser plug-in installed and unlocked."
        r2: "Make sure your Billionaire Tokens (XBL) are in your Metamask account. Make sure you double-check your EOS Main net account name."
        r3: "Enter the amount of XBL you wish to swap to the EOS Main net and click Approve! Then wait for the transaction to be mined."
        r4: "Enter your EOS Main Net account name, double-checking it, and click Register Swap! Make sure the account name is correct, we can not help you if it is not."
</i18n>

<template lang="pug">
    section.swap
        .middle
            h1(v-t="'title'")
            h2(v-t="'sub'")
            .container
                .guidelines
                    .rule(v-for="r in 4" :key="r")
                        span {{r}}&nbsp| 
                        p(v-t="'rules.r'+r")
                .sep
                .swapping
                    .eos
                        input(:placeholder="$t('eos')" v-model.lazy="recipient_adress" type="text")
                    .amount
                        input.x(:placeholder="$t('xbl')" v-model="amount" :disabled="approved" type="number")
                        span XBL
                        span(v-t="'all'" @click="onAll()")
                    .infos
                        i18n(path="rec")
                            span(place="eosbl") {{received_xbl}} XBL
                            span(place="eosnet") EOS network
                    .confirm
                      .approve(v-t="'approve'" @click="onApprove()")
                      .register(v-t="'register'" @click="onRegisterSwap()")
                .coin(v-for="c in 7" :key="c" :class="'c'+c")
</template>

<script>
	import { Vue, Component } from "vue-property-decorator"
	import Eth from "ethjs-query"
	import EthContract from "ethjs-contract"
	import {
		SWAP_CONTRACT_ADRESS,
		XBL_TOKEN_ADRESS,
		SWAP_CONTRACT_ABI,
		XBL_TOKEN_ABI
	} from "@core/token/constant"

	// Initiate the contract instance that we'll use to create references to our XBL and Swap contracts:
	const eth = new Eth(web3.currentProvider)
	const contract = new EthContract(eth)

	function delay(ms) {
		return new Promise(function (resolve) {
			setTimeout(resolve, ms);
		});
	}

	@Component
	export default class Swap extends Vue {
		recipient_adress = ""
		amount = ""
		old_amount = ""

		received_xbl = 0
		gas = 0
		eth_fee = 0

		approved = false // used to lock the amount input

		tokentoken = ""
		swapswap = ""

		metamask_user_address = null // The user account address
		metamask_installed = false

		async waitForTxToBeMined(txHash, txType) {
			let txReceipt = undefined
			while (!txReceipt) {
				txReceipt = await eth.getTransactionReceipt(txHash)
				await delay(100)
			}

			const tx_status = parseInt(txReceipt.status, 16)

			if (txType === "approve" && tx_status === 1) alert("Your approve transaction has been confirmed. You can now register your tokens.")
			else if (txType === "register" && tx_status === 1) alert("Your register transaction has been mined. If everything went well, your XBL should be gone from your wallet.")
		}

		onAmountUpdate() {
			if (this.amount > 5000) this.received_xbl = parseInt(this.amount) + (5 / 100) * parseInt(this.amount)
			else this.received_xbl = this.amount
		}

		mounted() {
			if (typeof web3 !== "undefined") {
				console.log("MetaMask is installed")
				this.metamask_installed = true
				this.metamask_user_address = web3.eth.accounts[0]
				console.log("Account: " + this.metamask_user_address)

				// Initiate the XBL Contract:
				const TokenToken = this.contract(XBL_TOKEN_ABI)
				this.tokentoken = TokenToken.at(XBL_TOKEN_ADRESS)

				// Initiate the Swap Contract:
				const SwapSwap = this.contract(SWAP_CONTRACT_ABI)
				this.swapswap = SwapSwap.at(SWAP_CONTRACT_ADRESS)

				// Metamask is installed, check if it is locked:
				web3.eth.getAccounts(function (err, accounts) {
					if (err) console.error(err)
					else if (!accounts.length) {
						console.log("MetaMask is locked")
						alert("Please unlock your Metamask and refresh the page in order to be able to swap your Billionaire Tokens.")
					} else console.log("MetaMask is unlocked")
				})
			} else {
				console.log("MetaMask is not installed")
				alert("Please install Metamask in order to be able to swap your Billionaire Tokens: https://metamask.io/")
			}
		}

		onAll() {
			if (this.metamask_installed) {
				this.metamask_user_address = web3.eth.accounts[0]

				if (this.metamask_user_address) {
					this.tokentoken.balanceOf(this.metamask_user_address,
						(error, balance) => {
							const full_balance = balance.balance.toString()
							const readable_balance = full_balance.substring(
								0,
								balance.balance.toString().length - 18
							)
							console.dir("XBL Balance: " + readable_balance)
							this.amount = readable_balance
							if (parseInt(readable_balance) > 5000)
								this.received_xbl = parseInt(readable_balance) + (5 / 100) * parseInt(readable_balance)
							else this.received_xbl = this.amount
						}
					)
				}
			}
		}

		onApprove() {
			// Call approve on the XBL token with the SwapContrak address as receiver of the "approve"
			if (this.metamask_installed) {
				this.metamask_user_address = web3.eth.accounts[0]
				console.log("Account: " + this.metamask_user_address)
			}
			if (this.amount && this.metamask_user_address && this.metamask_installed) {
				const xbl_quantity = web3.toWei(parseInt(this.amount, 10), "ether")
				this.approved = true
				this.tokentoken
					.approve(this.SwapContrak_ADDR, xbl_quantity, {
						from: this.metamask_user_address
					})
					.then(txHash => {
						console.log("Transaction sent...")
						alert(
							"The Approve transaction has been sent. Please wait for another notification when it has confirmed...."
						)
						console.dir("TX ID: " + txHash)
						this.waitForTxToBeMined(txHash, "approve")
					})
					.catch(console.error)
				console.log(xbl_quantity + " XBL is being sent for approval")
			}

			if (
				this.amount == "" &&
				this.metamask_user_address != null &&
				this.metamask_installed == true
			) {
				alert(
					"Please enter the XBL amount you wish to swap and click the Approve button first."
				)
			}

			if (this.metamask_user_address == null && this.metamask_installed == true) {
				alert("Please unlock your metamask account!")
			}

			if (this.metamask_installed != true) {
				alert("Please install Metamask!")
			}
		}

		onRegisterSwap() {
			// Call registerSwap for the amount that is in the "amount" field.
			if (this.approved != true) {
				alert("Please click Approve first!")
				return
			}
			if ((this.approve = true) && this.recipient_adress.length != 12) {
				alert(
					"EOS account names are exactly 12 characters in length. Please double-check your account name as we can not help you in case this is incorrect."
				)
				return
			}
			// Everything checks out. Let's ahead and register the swap:
			const xbl_quantity = web3.toWei(parseInt(this.amount, 10), "ether")
			this.swapswap
				.registerSwap(xbl_quantity, this.recipient_adress, {
					from: this.metamask_user_address
				})
				.then(txHash => {
					console.log("Transaction sent...")
					alert(
						"The Register transaction has been sent! Please wait for a notification to see the success state after it has been mined."
					)
					console.dir("TX ID: " + txHash)
					this.waitForTxToBeMined(txHash, "register")
				})
				.catch(console.error)
			console.log(this.recipient_adress + " has registered " + xbl_quantity)
		}
	}
</script>

<style lang="stylus" scoped>
input[type=number]::-webkit-inner-spin-button {
	-webkit-appearance: none;
}

.swap {
	margin-bottom: 200px;
	position: absolute;
	top: 0;
	z-index: 1;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: linear-gradient(17deg, lighten(#ffb400, 20%), darken(#ffb400, 20%));

	.middle {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		height: 100%;
		padding-top: 142px;
		justify-content: center;

		h1 {
			text-align: center;
			font-size: 2em;
			text-transform: uppercase;
			padding-top: 1em;
			font-weight: 900;
		}

		h2 {
			text-align: center;
			font-weight: 500;
		}

		.container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-evenly;
			align-items: center;
			position: relative;

			.guidelines {
				max-width: 45%;
				min-width: 30%;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				transform: scale(0.9);
			}

			.rule {
				display: flex;
				flex-flow: row nowrap;

				span {
					display: flex;
					flex: 0 0 max-content;
					align-items: center;
					font-size: 2.2em;
				}

				p {
					font-weight: 300;
					text-transform: uppercase;
					font-size: 1.2rem;
					color: rgba(#212121, 0.6);
					padding: 1em;
				}
			}

			.sep {
				width: 1px;
				height: 70%;
				background: linear-gradient(to top, lighten(#212121, 10%), darken(#212121, 10%));
			}

			.swapping {
				width: 45%;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
			}

			input {
				background: none;
				border: none;
				border-bottom: 2px solid #212121;
				width: 80%;
				height: 50px;
				font-weight: 900;
				font-size: 1.5em;
				padding: 0 0.3em;
				margin: 0.5em 0;

				&.x {
					padding: 0 2em 0 0.3em;
				}

				&::placeholder {
					color: darken(#ffb400, 30%);
					font-weight: 500;
				}
			}

			.amount {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				>span:first-of-type {
					color: rgba(#212121, 0.8);
					font-weight: 900;
					transform: translateX(-33px);
				}

				>span:last-of-type {
					padding: 10px;
					background: #212121;
					color: #ffb400;
					border-radius: 2px;
					font-weight: 500;
					cursor: pointer;
				}
			}

			.confirm {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-evenly;

				>div {
					text-align: center;
					align-self: center;
					width: 200px;
					padding: 0.5em 0;
					border: 2px solid #212121;
					border-radius: 3px;
					text-transform: uppercase;
					margin-top: 2em;
					cursor: pointer;
					transition: all 125ms ease-in-out;

					&:hover {
						background: #212121;
						color: #ffb400;
					}
				}
			}

			.infos {
				display: flex;
				flex-flow: column nowrap;
				padding: 2em 0;
				text-align: end;
				padding-right: 3em;

				>:first-child {
					font-weight: 300;

					>span:first-of-type {
						color: darken(#F57F17, 40%);
						font-weight: 500;
					}

					>span:last-of-type {
						font-weight: 500;
					}
				}

				>:last-child {
					font-weight: 300;

					>span:first-of-type {
						font-weight: 100;
					}

					>span:last-of-type {
						color: darken(#F57F17, 40%);
						font-weight: 500;
					}
				}
			}

			.coin {
				background: rgba(black, 0.6);
				position: absolute;
				z-index: 5;
				border-radius: 50px;

				&.c1 {
					transform: translateY(10vh);
					width: 10px;
					height: 10px;
					animation: coin 5s ease-in infinite;
				}

				&.c2 {
					transform: translateY(-10vh);
					width: 2px;
					height: 2px;
					animation: coin 3s ease-in 3s infinite;
				}

				&.c3 {
					transform: translateY(5vh);
					width: 5px;
					height: 5px;
					animation: coin 8s ease-in 1s infinite;
				}

				&.c4 {
					transform: translateY(30vh);
					width: 12px;
					height: 12px;
					animation: coin 4s ease-in infinite;
				}

				&.c5 {
					transform: translateY(-5vh);
					width: 10px;
					height: 10px;
					animation: coin 6.2s ease-in 200ms infinite;
				}

				&.c6 {
					transform: translateY(-32vh);
					width: 8px;
					height: 8px;
					animation: coin 3.2s ease-in infinite;
				}

				&.c7 {
					transform: translateY(-20vh);
					width: 10px;
					height: 10px;
					animation: coin 4.2s ease-in infinite;
				}
			}
		}
	}
}

@keyframes coin {
	from {
		left: 0;
		opacity: 1;
	}

	to {
		left: 100%;
		opacity: 0.3;
	}
}
</style>
