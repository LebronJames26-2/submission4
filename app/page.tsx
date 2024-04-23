"use client";
import { useState } from "react";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { PublicKey } from "@metaplex-foundation/js";

const order_IDL = require('../app/idl.json');

export default function Home() {
  const [connectedWallet, setconnectedWallet] = useState<null | string>(null);
  const [purchases, setpurchases] = useState<any[]>([]);
  const [nam, setnam] = useState<string>("");
  const [contact, setcontact] = useState<string>("");
  const [sizeb, setsizeb] = useState<string>("");
  const [quanb, setquanb] = useState<string>("");
  const [sizew, setsizew] = useState<string>("");
  const [quanw, setquanw] = useState<string>("");
  const [quanl, setquanl] = useState<string>("");
  const [quanp, setquanp] = useState<string>("");
  const [search, setsearch] = useState<string>("");
  
  const getProvider = () => {
    const {
      phantom: { solana },
    } = window as any;
    return solana;
  };


  function getorder(provider: AnchorProvider) {
    return new Program<order>(
      order_IDL,
      provider
    );
  }

  const getAnchorProvider = () => {
    const provider = getProvider();// contact the wallets
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    return new AnchorProvider(connection, provider, {});
  };

  const onConnectWallet = async () => {
    const provider = getProvider();

    try {
      const resp = await provider.connect();
      setconnectedWallet(resp.publicKey.toString());
    } catch (e) {
      alert(e);
    }
  };
  
  const handleChangenam = (e: any) => {
    const { value } = e.target;
    setnam(value);
  };
  const handleChangecontact = (e: any) => {
    const { value } = e.target;
    setcontact(value);
  };
  const handleChangesizeb = (e: any) => {
    const { value } = e.target;
    setsizeb(value);
  };
  const handleChangequanb = (e: any) => {
    const { value } = e.target;
    setquanb(value);
  };
  const handleChangesizew = (e: any) => {
    const { value } = e.target;
    setsizew(value);
  };
  const handleChangequanw = (e: any) => {
    const { value } = e.target;
    setquanw(value);
  };
  const handleChangequanl = (e: any) => {
    const { value } = e.target;
    setquanl(value);
  };
  const handleChangequanp = (e: any) => {
    const { value } = e.target;
    setquanp(value);
  };

  

  const onCreatePost = async () => {
    const anchorProvider = getAnchorProvider();
    const order = getorder(getAnchorProvider());
    const keypair = web3.Keypair.generate();
    try {
      const signature = await order.methods
        .initialize(nam, contact, sizeb, quanb, sizew, quanw, quanl, quanp)
        .accounts({
          purchase: keypair.publicKey,
          payer: anchorProvider.publicKey,
        })
        .signers([keypair])
        .rpc();
      setnam("");
      setcontact("");
      setsizeb("");
      setquanb("");
      setsizew("");
      setquanw("");
      setquanl("");
      setquanp("");
      alert(signature);
    } catch (e) {
      alert(e);
    }
  };

  const onGetpurchases = async () => {
    const anchorProvider = getAnchorProvider();
    const order = getorder(anchorProvider);
    try {
      const temp = await order.account.purchase.all(); //all the purchases/accounts of the program instance
      setpurchases(temp);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p style={{fontSize:35}}> <b> <u> Order Form </u> </b> </p> 
      <br></br>
      <p> Some Reminders: </p>
      <p> 1. Please connect your account before you start filling out the form. </p>
      <p> 2. Please make sure that your contact number is valid and working. This contact number will be used to confirm your order. </p>
      <p> 3. Please make sure that your orders, sizes, and quantities are all correct. We will not accept any changes.</p>
      <p> 4. Cancellations will not be allowed. </p>

      <br></br><br></br>
      <p style={{fontSize:20}}> Account: </p> 
      <button onClick={onConnectWallet} className="text" style={{padding: 5 | 10, backgroundColor: "white", color: "black"}}> 
        {connectedWallet ? connectedWallet : "Connect Account"}
      </button> <br></br> <br></br>
      <h2 style={{fontSize:20}}> Name: </h2> 
      <input type="text" style={{color:"black"}} onChange={handleChangenam} value={nam} /> 
      <br></br>
      <p style={{fontSize:20}}> Contact Number: </p>
      <input type="text" style={{color:"black"}} onChange={handleChangecontact} value={contact} /> 
      
      <br></br><br></br>
      <img src="https://drive.google.com/thumbnail?id=1Zbi643T8LOtooodmUuUOHSf51ss0kpJ9&sz=w1000" width={500}></img> 
      
      <br></br>
      <p style={{fontSize:20}}> Black T-shirt Size: </p>
      <select style={{color:"black"}} onChange={handleChangesizeb} value={sizeb}>
        <option> </option> 
        <option value={"N/A"}> N/A </option>
        <option value={"XS"}> XS </option>
        <option value={"S"}> S </option>
        <option value={"M"}> M </option>
        <option value={"L"}> L </option>
        <option value={"XL"}> XL </option>
        <option value={"XXL"}> XXL </option>
      </select> <br></br><br></br>
      <p style={{fontSize:20}}> Black T-shirt Quantity: </p>
      <input type="text" style={{color:"black"}} onChange={handleChangequanb} value={quanb} /> <br></br><br></br>

      
      <br></br>
      <img src="https://drive.google.com/thumbnail?id=1pwaqWQBLasuMRaTE_uDanhQz0OjChVY7&sz=w1000" width={500}></img>
      <br></br>

      <p style={{fontSize:20}}> White T-shirt Size: </p> 
      <select style={{color:"black"}} onChange={handleChangesizew} value={sizew}>
        <option> </option> 
        <option value={"N/A"}> N/A </option>
        <option value={"XS"}> XS </option>
        <option value={"S"}> S </option>
        <option value={"M"}> M </option>
        <option value={"L"}> L </option>
        <option value={"XL"}> XL </option>
        <option value={"XXL"}> XXL </option>
      </select> <br></br><br></br> 
      <p style={{fontSize:20}}> White T-shirt Quantity: </p>
      <input type="text" style={{color:"black"}} onChange={handleChangequanw} value={quanw} /> <br></br><br></br>

      <br></br>
      <img src="https://drive.google.com/thumbnail?id=1DKg2MaQGWUgVPoyYB-wTvSyN6lJ2lDOh&sz=w1000" width={500}></img>
      <br></br>

      <p style={{fontSize:20}}> Reversible Lanyard Quantity: </p>
      <input type="text" style={{color:"black"}} onChange={handleChangequanl} value={quanl} /> <br></br><br></br>

      <br></br>
      <img src="https://drive.google.com/thumbnail?id=1FfywK22tDsJlYFswOG0XeAAzQh0OWzgL&sz=w1000" width={500}></img>
      <br></br>
      <p style={{fontSize:20}}> Enamel Pin Quantity: </p>
      <input type="text" style={{color:"black"}} onChange={handleChangequanp} value={quanp} /> <br></br><br></br>
      <button onClick={onCreatePost} style={{padding: 5 | 10, backgroundColor: "white", color: "black"}}>Place Order</button>


      <br></br><br></br><br></br>
      <p style={{fontSize:35}}> <b> Did you already place your order? </b> </p>
      <p> You may check all of your orders by clicking the button below! </p>
      <p> Make sure to connect your account first! </p>
      <br></br><br></br>
      {connectedWallet && <button onClick={onGetpurchases} style={{padding: 5 | 10, backgroundColor: "white", color: "black"}}>View Orders</button>} <br></br><br></br>
      {purchases.map((e: any) => {
        return (
          <div
            key={e.publicKey.toString()}
            className="bg-stone-800 p-5 rounded-lg gap-3"
          >
            <p className="text-xs">Order Code: {e.publicKey.toString()}</p>
            <p>Name: {e.account.nam} </p>
            <p>Contact Number: {e.account.contact} </p>
            <p>Black Shirt Size (if applicable): {e.account.sizeb} </p>
            <p>Black Shirt Quantity (if applicable):{e.account.quanb} </p>
            <p>White Shirt Size (if applicable):{e.account.sizew} </p>
            <p>White Shirt Quantity Shirt Size (if applicable):{e.account.quanw} </p>
            <p>Reversible Lanyard Quantity: {e.account.quanl} </p>
            <p>Enamel Pin Quantity: {e.account.quanp} </p>
          </div>
        );
      })}
    </main>
  );
}

export type order = {
  "address": "35WSnRPLrqKeZWcXmq65vfiJ4ns1CAAEtSiC91vYhApr",
  "metadata": {
    "name": "order",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "purchase",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nam",
          "type": "string"
        },
        {
          "name": "contact",
          "type": "string"
        },
        {
          "name": "sizeb",
          "type": "string"
        },
        {
          "name": "quanb",
          "type": "string"
        },
        {
          "name": "sizew",
          "type": "string"
        },
        {
          "name": "quanw",
          "type": "string"
        },
        {
          "name": "quanl",
          "type": "string"
        },
        {
          "name": "quanp",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "purchase",
      "discriminator": [
        55,
        82,
        172,
        133,
        27,
        115,
        112,
        27
      ]
    }
  ],
  "types": [
    {
      "name": "purchase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nam",
            "type": "string"
          },
          {
            "name": "contact",
            "type": "string"
          },
          {
            "name": "sizeb",
            "type": "string"
          },
          {
            "name": "quanb",
            "type": "string"
          },
          {
            "name": "sizew",
            "type": "string"
          },
          {
            "name": "quanw",
            "type": "string"
          },
          {
            "name": "quanl",
            "type": "string"
          },
          {
            "name": "quanp",
            "type": "string"
          }
        ]
      }
    }
  ]
};