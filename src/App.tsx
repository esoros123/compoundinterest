import { useState } from 'react'
import './App.css'

function App() {
  const [err, setErr] = useState("")
  const [amount, setAmount] = useState("")
  const [interestAmount, setInterestAmount] = useState("")
  const [tradeDays, setTradeDays] = useState("")
  const [amounts, setAmounts] = useState<Array<number>>()

  function calculate() {
    let amount_num = parseInt(amount)
    if(Number.isNaN(amount_num)) {
      setErr("please input starting amount")
      return
    }
    
    let interest_amount = parseFloat(interestAmount) * 0.01
    if(Number.isNaN(interest_amount)) {
      setErr("please input interest amount")
      return
    }

    let tradeDays_num = parseInt(tradeDays)
    if(Number.isNaN(tradeDays_num)) {
      setErr("please input trade days")
      return
    }

    let result = [amount_num]
    for(let i = 0; i < tradeDays_num; ++i) {
      result.push((result[result.length - 1] + (result[result.length - 1] * interest_amount)));
    }
    setAmounts(result)
  }

  return <div style={{display: "flex", flexDirection: "column", width: "50vw"}}>
    <span className="material-symbols-outlined hover-animated" style={{fontSize: "10rem", color: "green", cursor: "default"}}>
      universal_currency_alt
    </span>

    <label>Trade Days</label>
    <input value={tradeDays} onChange={(e) => setTradeDays(e.currentTarget.value)}></input>
    
    <label>Amount</label>
    <input value={amount} onChange={(e) => setAmount(e.currentTarget.value)}></input>

    <label>Interest (Percent)</label>
    <input value={interestAmount} onChange={(e) => setInterestAmount(e.currentTarget.value)}></input>

    <button onClick={calculate}>Calculate</button>
    {
      err ? <p>{err}</p> : <></>
    }
    
    {
      amounts == undefined ? <></> : 
      <div style={{display: "flex", flexDirection: "column", height: "50vh", overflowY: "scroll"}}>
        {
          amounts.map((amount, num) => {
            return <p style={{margin: 0}}>{num + ":   " + amount}</p>
          })
        }
      </div>
    }
  </div>
}

export default App
