import { useState, useEffect } from 'react'

export default function TransactionBox({
    setTransactions,
    currentTransactionID,
    setcurrentTransactionID,
    accountNumberList,
    accountBalances,
}) {
    const [easyMode, setEasymode] = useState(false)
    const [transactionType, setTransactionType] = useState('debit')
    const [currentTransaction, setCurrentTransaction] = useState({
        transactionID: currentTransactionID,
        day: -1,
        item: '',
        debit: [],
        credit: [],
    })
    const { day, item, debit, credit } = currentTransaction
    const [currentAccount, setCurrentAccount] = useState({
        accountNumber: '101',
        amount: 0,
    })
    const { accountNumber, amount } = currentAccount
    const onTransactionChange = (e) => {
        if (e.target.name === 'day') {
            setCurrentTransaction((prevState) => ({
                ...prevState,
                day: Number(e.target.value),
            }))
        } else {
            setCurrentTransaction((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
    }
    const onClearInputs = () => {
        setCurrentTransaction({
            transactionID: currentTransactionID,
            day: -1,
            item: '',
            debit: [],
            credit: [],
        })
    }
    const onAccountChange = (e) => {
        if (e.target.name === 'amount') {
            setCurrentAccount((prevState) => ({
                ...prevState,
                amount: Number(e.target.value),
            }))
        } else {
            setCurrentAccount((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
    }
    const onAccountSubmit = () => {
        if (amount !== 0 && day > 0) {
            try {
                transactionType === 'debit'
                    ? setCurrentTransaction((prevState) => ({
                          ...prevState,
                          debit: [...prevState.debit, currentAccount],
                      }))
                    : setCurrentTransaction((prevState) => ({
                          ...prevState,
                          credit: [...prevState.credit, currentAccount],
                      }))
            } catch (error) {
                console.error(error)
            }
        } else {
            alert('Invalid Account Details')
        }
    }
    const transactionBalanced = () => {
        let dbtSum = 0
        let cdtSum = 0
        debit.forEach((i) => (dbtSum += i.amount))
        credit.forEach((i) => (cdtSum += i.amount))
        return dbtSum === cdtSum
    }
    const onTransactionSubmit = () => {
        if (
            transactionBalanced() &&
            day > 0 &&
            debit.length !== 0 &&
            credit.length !== 0
        ) {
            try {
                setTransactions((prevState) => [
                    ...prevState,
                    currentTransaction,
                ])
                setcurrentTransactionID((currentTransactionID += 1))
            } catch (error) {
                console.error(error)
            } finally {
                setCurrentTransaction({
                    transactionID: currentTransactionID,
                    day: -1,
                    item: '',
                    debit: [],
                    credit: [],
                })
            }
        } else {
            alert('Invalid/Unbalanced Transaction')
        }
    }

    return (
        <main className="input-panel">
            <h2>Input</h2>
            <br />
            <form>
                <label htmlFor="easymode">Easy Mode </label>
                <input
                    onChange={(e) => setEasymode(e.target.checked)}
                    type="checkbox"
                    checked={easyMode}
                    name="easymode"
                    id="easymode"
                />
                <br />
                <br />
                <br />
                <label htmlFor="day">Day: </label>
                <input
                    value={day > 0 ? day : ''}
                    onChange={onTransactionChange}
                    type="number"
                    name="day"
                    id="day"
                />
                <br />
                <br />
                <label htmlFor="item">{'Item/Description:'} </label>
                <input
                    value={item}
                    onChange={onTransactionChange}
                    type="text"
                    name="item"
                    id="item"
                />
                <br />
                <br />
                <label htmlFor="accountNumber">Account Title: </label>
                <select
                    className="input-select"
                    value={accountNumber}
                    onChange={onAccountChange}
                    name="accountNumber"
                    id="accountNumber"
                >
                    <option value="101">Cash</option>
                    <option value="105">Accounts Receivable</option>
                    <option value="115">Merchandise Inventory</option>
                    <option value="120">Supplies</option>
                    <option value="150">Equipment</option>
                    <option value="201">Accounts Payable</option>
                    <option value="202">Notes Payable</option>
                    <option value="301">Capital</option>
                    <option value="302">Drawing</option>
                    <option value="401">Sales</option>
                    <option value="402">Sales Return and Allowances</option>
                    <option value="410">Sales Discount</option>
                    <option value="501">Purchases</option>
                    <option value="502">Purchase Return and Allowances</option>
                    <option value="503">Purchase Discount</option>
                    <option value="504">Freight In</option>
                    <option value="505">Advertising</option>
                    <option value="506">Freight Out</option>
                    <option value="510">Rent</option>
                    <option value="530">Salaries</option>
                    <option value="540">Utilities</option>
                </select>
                <br />
                <br />
                <label htmlFor="type">{easyMode ? '' : 'Type:'}</label>

                {!easyMode ? (
                    <select
                        className="input-select"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        type="text"
                        name="type"
                        id="type"
                    >
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
                    </select>
                ) : (
                    <div>
                        <select
                            className="input-select"
                            value={
                                accountBalances['n' + accountNumber].normalDebit
                                    ? transactionType === 'debit'
                                        ? 'increase'
                                        : 'decrease'
                                    : transactionType !== 'debit'
                                    ? 'increase'
                                    : 'decrease'
                            }
                            onChange={(e) =>
                                setTransactionType(
                                    accountBalances['n' + accountNumber]
                                        .normalDebit
                                        ? e.target.value === 'increase'
                                            ? 'debit'
                                            : 'credit'
                                        : e.target.value !== 'increase'
                                        ? 'debit'
                                        : 'credit'
                                )
                            }
                            type="text"
                            name="type"
                            id="type"
                        >
                            <option value="increase">Increase</option>
                            <option value="decrease">Decrease</option>
                        </select>
                    </div>
                )}

                <br />
                <br />
                <label htmlFor="amount">Amount: </label>
                <input
                    value={amount}
                    onChange={onAccountChange}
                    type="number"
                    name="amount"
                    id="amount"
                />
            </form>
            <br />
            <br />
            <button
                disabled={!(amount !== 0 && day > 0)}
                className="default-button"
                onClick={onAccountSubmit}
            >
                Add Entry
            </button>
            <br />
            <br />

            <div className="dflexrow width100p justifycontentsb aligncontentc">
                <h2>Current Entry</h2>

                {transactionBalanced() ? (
                    <p style={{ color: 'green' }}>
                        <strong>Balanced</strong>
                    </p>
                ) : (
                    <p style={{ color: 'red' }}>
                        <strong>Not Balanced</strong>
                    </p>
                )}

                <button className="default-button" onClick={onClearInputs}>
                    Clear Transaction
                </button>
            </div>
            <table className="ledger-table width100p">
                <tbody>
                    <tr>
                        <td className="bold-text accent1-bg white-fg">Day</td>
                        <td className="bold-text accent1-bg white-fg">Debit</td>
                        <td className="bold-text accent1-bg white-fg">
                            Credit
                        </td>
                        <td className="bold-text accent1-bg white-fg">Info</td>
                        <td className="bold-text accent1-bg white-fg">Debit</td>
                        <td className="bold-text accent1-bg white-fg">
                            Credit
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={debit.length + credit.length + 2}>
                            {day}
                        </td>
                    </tr>
                    {debit.map((i) => (
                        <tr key={'b' + i.accountNumber}>
                            <td>{accountNumberList['n' + i.accountNumber]}</td>
                            <td></td>
                            <td></td>
                            <td>{i.amount}</td>
                            <td></td>
                        </tr>
                    ))}
                    {credit.map((i) => (
                        <tr key={'a' + i.accountNumber}>
                            <td></td>
                            <td>{accountNumberList['n' + i.accountNumber]}</td>
                            <td></td>
                            <td></td>
                            <td>{i.amount}</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>To record {item}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            {/* <p>{JSON.stringify(currentTransaction)}</p> */}
            <br />
            <br />
            <button
                className="default-button"
                disabled={
                    !(
                        transactionBalanced() &&
                        day > 0 &&
                        debit.length !== 0 &&
                        credit.length !== 0
                    )
                }
                onClick={onTransactionSubmit}
            >
                Submit to Journal Entry
            </button>

            <br />
            <br />
        </main>
    )
}
