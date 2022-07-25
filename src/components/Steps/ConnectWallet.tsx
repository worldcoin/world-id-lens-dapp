import ConnectButton from '../ConnectButton'

const ConnectWallet = () => {
	return (
		<>
			<h1 className="text-2xl font-semibold text-center mb-4">
				Connect your wallet to verify your <span className="text-indigo-500">Lens profile</span>.
			</h1>
			<ConnectButton />
		</>
	)
}

export default ConnectWallet
