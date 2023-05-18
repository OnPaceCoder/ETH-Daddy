import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Search from './components/Search'
import Domain from './components/Domain'

// ABIs
import ETHDaddy from './abis/ETHDaddy.json'

// Config
import config from './config.json';

function App() {

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [ethDaddy, setEthDaddy] = useState(null)
  const [domains, setDomains] = useState([])

  // console.log(ethDaddy)

  const loadBlockChainData = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // setProvider(provider)
    // console.log(provider)
    // const network = await provider.getNetwork()
    // console.log(network)
    console.log(window.ethereum)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(network)


    const ethDaddy = new ethers.Contract(config[network.chainId].ETHDaddy.address, ETHDaddy, provider)
    console.log(ethDaddy)
    setEthDaddy(ethDaddy)



    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })


  }






  useEffect(() => {
    loadBlockChainData()
  }, [])



  return (
    <div>

      <Navigation account={account} setAccount={setAccount} />
      <Search />
      <div className='cards__section'>

        <h2 className='cards__title'>Why you need domain name.</h2>

        <p className='cards__description'>Own your custom username, use it across services, and be able to store an avatar and other profile data.</p>


      </div>
      <hr />
      <div className='cards'>

      </div>
    </div>
  );
}

export default App;