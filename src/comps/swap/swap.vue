<i18n>
en:
    title: "XBL moved to the EOS Network"
    sub: "Swap your tokens now"
    eos: "EOS recipient adress"
    xbl: "Amount"
    rec: "You will receive {eosbl} Token on the {eosnet}"
    fee: "ETH Network fee ({gas}) {fee}"
    all: "All"
    approve: "Approve"
    register: "Register Swap"
    remaining: "Remaining Balance {balance}"
    rules:
        r1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        r2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        r3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        r4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
                        input.x(:placeholder="$t('xbl')" v-model.lazy="amount" :disabled="approved" type="number")
                        span XBL
                        span(v-t="'all'" @click="onAll()")
                    .infos
                        i18n(path="rec")
                            span(place="eosbl") {{received_xbl}} XBL
                            span(place="eosnet") EOS network
                        i18n(path="fee")
                            span(place="gas") {{gas}} gas
                            span(place="fee") - {{eth_fee}} ETH
                    .confirm
                      .approve(v-t="'approve'" @click="onApprove()")
                      .register(v-t="'register'" @click="onRegisterSwap()")
                .coin(v-for="c in 7" :key="c" :class="'c'+c")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Swap extends Vue {

    recipient_adress = ''
    amount = ''

    received_xbl = 0
    gas = 0
    eth_fee = 0

    approved = false // used to lock the amount input

    const XBL_Token_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "l_totalSupply",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalBurned",
        "outputs": [
            {
                "name": "l_totalBurned",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "type": "event"
    }]

    const XBL_Token_ADDR = '0x82D01395cD1Ac118207c3963cF07d5c106C96773'

    const SwapContrak_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "swap_address",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "register_counter",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "XBLContract_addr",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "eosio_username",
                "type": "string"
            }
        ],
        "name": "getBalanceByEOSIO_USERNAME",
        "outputs": [
            {
                "name": "eosio_balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "xbl_amount",
                "type": "uint256"
            },
            {
                "name": "eosio_username",
                "type": "string"
            }
        ],
        "name": "registerSwap",
        "outputs": [
            {
                "name": "STATUS_CODE",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "target",
                "type": "uint256"
            }
        ],
        "name": "getEOSIO_USERNAME",
        "outputs": [
            {
                "name": "eosio_username",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }]

    const SwapContrak_ADDR = '0x9Bff6E926A6EEe7E35EeFf25568D449e8d40D419'

    async function waitForTxToBeMined (txHash) 
    {
        let txReceipt
        while (!txReceipt) 
        {
            try 
            {
                txReceipt = await eth.getTransactionReceipt(txHash)
            } 
            catch (err) 
            {
                return indicateFailure(err)
            }
        }
        indicateSuccess()
    }

    function listenForClicks(contract_thing)
    {
        var button = document.querySelector('button.transferFunds')
        button.addEventListener('click', function() 
        {
            contract_thing.transfer(toAddress, value, { from: addr })
            .then(function (txHash) 
            {
                console.log('Transaction sent')
                console.dir(txHash)
                waitForTxToBeMined(txHash)
            })
            .catch(console.error)
        })
    }

    mounted()
    {
    // This shit runs every time the web page is loaded.

        if (typeof web3 !== 'undefined')
        {
            console.log('MetaMask is installed')

            // Contract stuff:
            const Eth = require('ethjs-query')
            const EthContract = require('ethjs-contract')

            // Initiate the contract instance that we'll use to create references to our XBL and Swap contracts:
            const eth = new Eth(web3.currentProvider)
            const token_contract = new EthContract(eth)
            initContract(contract)

            // Initiate the XBL Contract:
            const TokenToken = contract(XBL_Token_ABI)
            const tokentoken = TokenToken.at(XBL_Token_ADDR)
            listenForClicks(tokentoken)

            // Initiate the Swap Contract:
            const SwapSwap = contract(SwapContrak_ABI)
            const swapswap = SwapSwap.at(SwapContrak_ADDR)
            listenForClicks(swapswap)

            // Metamask is installed, check if it is locked:
            web3.eth.getAccounts(function(err, accounts)
            {
                if (err != null) 
                {
                    console.log(err)
                }
                else if (accounts.length === 0) 
                {
                    console.log('MetaMask is locked')
                    alert("Please unlock your Metamask in order to be able to swap your Billionaire Tokens.")
                }
                else 
                {
                    console.log('MetaMask is unlocked')
                }
            });
        } 
        else
        {
            console.log('MetaMask is not installed')
            alert("Please install Metamask in order to be able to swap your Billionaire Tokens: https://metamask.io/")
        }

    }

    onAll()
    {

    }

    onApprove() 
    {
        this.approved = true

    }

    onRegisterSwap() 
    {

    }
}
</script>

<style lang="stylus" scoped>
input[type=number]::-webkit-inner-spin-button
  -webkit-appearance none

.swap
  margin-bottom 200px
  position absolute
  top 0
  z-index 1
  width 100%
  height 100vh
  overflow hidden
  background linear-gradient(17deg, lighten(#ffb400, 20%), darken(#ffb400, 20%))

  .middle
    display flex
    flex-flow column nowrap
    width 100%
    height 100%
    padding-top 142px
    justify-content center

    h1
      text-align center
      font-size 2em
      text-transform uppercase
      padding-top 1em
      font-weight 900

    h2
      text-align center
      font-weight 500

    .container
      width 100%
      height 100%
      display flex
      flex-flow row nowrap
      justify-content space-evenly
      align-items center
      position relative

      .guidelines
        max-width 45%
        min-width 30%
        display flex
        flex-flow column nowrap
        align-items center
        transform scale(.9)

      .rule
        display flex
        flex-flow row nowrap

        span
          display flex
          flex 0 0 max-content
          align-items center
          font-size 2.2em

        p
          font-weight 300
          text-transform uppercase
          font-size 1.2rem
          color rgba(#212121, .6)
          padding 1em

      .sep
        width 1px
        height 70%
        background linear-gradient(to top, lighten(#212121, 10%), darken(#212121, 10%))

      .swapping
        width 45%
        display flex
        flex-flow column nowrap
        justify-content center

      input
        background none
        border none
        border-bottom 2px solid #212121
        width 80%
        height 50px
        font-weight 900
        font-size 1.5em
        padding 0 .3em
        margin .5em 0

        &.x
          padding 0 2em 0 .3em

        &::placeholder
          color darken(#ffb400, 30%)
          font-weight 500

      .amount
        display flex
        flex-flow row nowrap
        align-items center

        >span:first-of-type
          color rgba(#212121, .8)
          font-weight 900
          transform translateX(-33px)

        >span:last-of-type
          padding 10px
          background #212121
          color #ffb400
          border-radius 2px
          font-weight 500
          cursor pointer

      .confirm
        display flex
        flex-flow row nowrap
        justify-content space-evenly

        >div
          text-align center
          align-self center
          width 200px
          padding .5em 0
          border 2px solid #212121
          border-radius 3px
          text-transform uppercase
          margin-top 2em
          cursor pointer
          transition all 125ms ease-in-out

          &:hover
            background #212121
            color #ffb400

      .infos
        display flex
        flex-flow column nowrap
        padding 2em 0
        text-align end
        padding-right 3em

        >:first-child
          font-weight 300

          >span:first-of-type
            color darken(#F57F17, 40%)
            font-weight 500

          >span:last-of-type
            font-weight 500

        >:last-child
          font-weight 300

          >span:first-of-type
            font-weight 100

          >span:last-of-type
            color darken(#F57F17, 40%)
            font-weight 500

      .coin
        background rgba(black, .6)
        position absolute
        z-index 5
        border-radius 50px

        &.c1
          transform translateY(10vh)
          width 10px
          height 10px
          animation coin 5s ease-in infinite

        &.c2
          transform translateY(-10vh)
          width 2px
          height 2px
          animation coin 3s ease-in 3s infinite

        &.c3
          transform translateY(5vh)
          width 5px
          height 5px
          animation coin 8s ease-in 1s infinite

        &.c4
          transform translateY(30vh)
          width 12px
          height 12px
          animation coin 4s ease-in infinite

        &.c5
          transform translateY(-5vh)
          width 10px
          height 10px
          animation coin 6.2s ease-in 200ms infinite

        &.c6
          transform translateY(-32vh)
          width 8px
          height 8px
          animation coin 3.2s ease-in infinite

        &.c7
          transform translateY(-20vh)
          width 10px
          height 10px
          animation coin 4.2s ease-in infinite

@keyframes coin
  from
    left 0
    opacity 1

  to
    left 100%
    opacity .3
</style>
