export const SWAP_CONTRACT_ADRESS = '0x9Bff6E926A6EEe7E35EeFf25568D449e8d40D419'
export const XBL_TOKEN_ADRESS = '0x82D01395cD1Ac118207c3963cF07d5c106C96773'

export const XBL_TOKEN_ABI = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [
			{
				name: '',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_spender',
				type: 'address'
			},
			{
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [
			{
				name: 'success',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				name: 'l_totalSupply',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_from',
				type: 'address'
			},
			{
				name: '_to',
				type: 'address'
			},
			{
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [
			{
				name: 'success',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'decimals',
		outputs: [
			{
				name: '',
				type: 'uint8'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'burn',
		outputs: [
			{
				name: 'success',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: '_owner',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				name: 'balance',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_from',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'burnFrom',
		outputs: [
			{
				name: 'success',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'owner',
		outputs: [
			{
				name: '',
				type: 'address'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				name: '',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_to',
				type: 'address'
			},
			{
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				name: 'success',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'totalBurned',
		outputs: [
			{
				name: 'l_totalBurned',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: '_owner',
				type: 'address'
			},
			{
				name: '_spender',
				type: 'address'
			}
		],
		name: 'allowance',
		outputs: [
			{
				name: 'remaining',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: '_from',
				type: 'address'
			},
			{
				indexed: true,
				name: '_to',
				type: 'address'
			},
			{
				indexed: false,
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: '_owner',
				type: 'address'
			},
			{
				indexed: true,
				name: '_spender',
				type: 'address'
			},
			{
				indexed: false,
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'from',
				type: 'address'
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Burn',
		type: 'event'
	}
]

export const SWAP_CONTRACT_ABI = [
	{
		constant: true,
		inputs: [],
		name: 'swap_address',
		outputs: [
			{
				name: '',
				type: 'address'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'register_counter',
		outputs: [
			{
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'XBLContract_addr',
		outputs: [
			{
				name: '',
				type: 'address'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: 'eosio_username',
				type: 'string'
			}
		],
		name: 'getBalanceByEOSIO_USERNAME',
		outputs: [
			{
				name: 'eosio_balance',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: 'xbl_amount',
				type: 'uint256'
			},
			{
				name: 'eosio_username',
				type: 'string'
			}
		],
		name: 'registerSwap',
		outputs: [
			{
				name: 'STATUS_CODE',
				type: 'int256'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: 'target',
				type: 'uint256'
			}
		],
		name: 'getEOSIO_USERNAME',
		outputs: [
			{
				name: 'eosio_username',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor'
	}
]
