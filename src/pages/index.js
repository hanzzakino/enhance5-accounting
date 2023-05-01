import Head from 'next/head'
import { useState, useEffect } from 'react'
import TransactionBox from '../../components/transactionBox'

const accountNumberList = {
    n101: 'Cash',
    n105: 'Accounts Receivable',
    n115: 'Merchandise Inventory',
    n120: 'Supplies',
    n150: 'Equipment',
    n201: 'Accounts Payable',
    n202: 'Notes Payable',
    n301: 'Capital',
    n302: 'Drawing',
    n401: 'Sales',
    n402: 'Sales Return and Allowances',
    n410: 'Sales Discount',
    n501: 'Purchases',
    n502: 'Purchase Return and Allowances',
    n503: 'Purchase Discount',
    n504: 'Freight In',
    n505: 'Advertising',
    n506: 'Freight Out',
    n510: 'Rent',
    n530: 'Salaries',
    n540: 'Utilities',
}

export default function Home() {
    const [currentTransactionID, setcurrentTransactionID] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [trialBalances, setTrialBalances] = useState({
        debitTotal: 0,
        creditTotal: 0,
    })
    const [accountBalances, setAccountBalances] = useState({
        n101: {
            name: 'Cash',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n105: {
            name: 'Accounts Receivable',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n115: {
            name: 'Merchandise Inventory',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n120: {
            name: 'Supplies',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n150: {
            name: 'Equipment',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n201: {
            name: 'Accounts Payable',
            normalDebit: false,
            totalBalance: 0,
            allBalances: [],
        },
        n202: {
            name: 'Notes Payable',
            normalDebit: false,
            totalBalance: 0,
            allBalances: [],
        },
        n301: {
            name: 'Capital',
            normalDebit: false,
            totalBalance: 0,
            allBalances: [],
        },
        n302: {
            name: 'Drawing',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n401: {
            name: 'Sales',
            normalDebit: false,
            totalBalance: 0,
            allBalances: [],
        },
        n402: {
            name: 'Sales Return and Allowances',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n410: {
            name: 'Sales Discount',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n501: {
            name: 'Purchases',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n502: {
            name: 'Purchase Return and Allowances',
            normalDebit: false,
            totalBalance: 0,
            allBalances: [],
        },
        n503: {
            name: 'Purchase Discount',
            normalDebit: false,
            totalBalance: 0,
            allBalances: [],
        },
        n504: {
            name: 'Freight In',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n505: {
            name: 'Advertising',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n506: {
            name: 'Freight Out',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n510: {
            name: 'Rent',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n530: {
            name: 'Salaries',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
        n540: {
            name: 'Utilities',
            normalDebit: true,
            totalBalance: 0,
            allBalances: [],
        },
    })

    const onClearLedger = () => {
        setAccountBalances({
            n101: {
                name: 'Cash',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n105: {
                name: 'Accounts Receivable',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n115: {
                name: 'Merchandise Inventory',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n120: {
                name: 'Supplies',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n150: {
                name: 'Equipment',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n201: {
                name: 'Accounts Payable',
                normalDebit: false,
                totalBalance: 0,
                allBalances: [],
            },
            n202: {
                name: 'Notes Payable',
                normalDebit: false,
                totalBalance: 0,
                allBalances: [],
            },
            n301: {
                name: 'Capital',
                normalDebit: false,
                totalBalance: 0,
                allBalances: [],
            },
            n302: {
                name: 'Drawing',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n401: {
                name: 'Sales',
                normalDebit: false,
                totalBalance: 0,
                allBalances: [],
            },
            n402: {
                name: 'Sales Return and Allowances',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n410: {
                name: 'Sales Discount',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n501: {
                name: 'Purchases',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n502: {
                name: 'Purchase Return and Allowances',
                normalDebit: false,
                totalBalance: 0,
                allBalances: [],
            },
            n503: {
                name: 'Purchase Discount',
                normalDebit: false,
                totalBalance: 0,
                allBalances: [],
            },
            n504: {
                name: 'Freight In',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n505: {
                name: 'Advertising',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n506: {
                name: 'Freight Out',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n510: {
                name: 'Rent',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n530: {
                name: 'Salaries',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
            n540: {
                name: 'Utilities',
                normalDebit: true,
                totalBalance: 0,
                allBalances: [],
            },
        })
        setTrialBalances({
            debitTotal: 0,
            creditTotal: 0,
        })
        setTransactions([])
        setcurrentTransactionID(0)
    }

    // const onRemoveLastEntry = () => {
    //     const newTr = transactions.splice(0, -1)
    //     setTransactions(newTr)
    // }

    useEffect(() => {
        if (transactions.length > 0) {
            const transactionsToRecord = transactions.filter(
                (item) => item.transactionID === currentTransactionID - 1
            )
            transactionsToRecord.forEach((transactionItem) => {
                transactionItem.debit.forEach((accountItem) => {
                    setAccountBalances((prevState) => ({
                        ...prevState,
                        ['n' + accountItem.accountNumber]: {
                            ...prevState['n' + accountItem.accountNumber],
                            totalBalance: prevState[
                                'n' + accountItem.accountNumber
                            ].normalDebit
                                ? prevState['n' + accountItem.accountNumber]
                                      .totalBalance + accountItem.amount
                                : prevState['n' + accountItem.accountNumber]
                                      .totalBalance - accountItem.amount,
                            allBalances: [
                                ...prevState['n' + accountItem.accountNumber]
                                    .allBalances,
                                {
                                    item: transactionItem.item,
                                    balType: 'debit',
                                    day: transactionItem.day,
                                    ammount: accountItem.amount,
                                    runningBalance: prevState[
                                        'n' + accountItem.accountNumber
                                    ].normalDebit
                                        ? prevState[
                                              'n' + accountItem.accountNumber
                                          ].totalBalance + accountItem.amount
                                        : prevState[
                                              'n' + accountItem.accountNumber
                                          ].totalBalance - accountItem.amount,
                                },
                            ],
                        },
                    }))
                })
                transactionItem.credit.forEach((accountItem) => {
                    setAccountBalances((prevState) => ({
                        ...prevState,
                        ['n' + accountItem.accountNumber]: {
                            ...prevState['n' + accountItem.accountNumber],
                            totalBalance: !prevState[
                                'n' + accountItem.accountNumber
                            ].normalDebit
                                ? prevState['n' + accountItem.accountNumber]
                                      .totalBalance + accountItem.amount
                                : prevState['n' + accountItem.accountNumber]
                                      .totalBalance - accountItem.amount,
                            allBalances: [
                                ...prevState['n' + accountItem.accountNumber]
                                    .allBalances,
                                {
                                    item: transactionItem.item,
                                    balType: 'credit',
                                    day: transactionItem.day,
                                    ammount: accountItem.amount,
                                    runningBalance: !prevState[
                                        'n' + accountItem.accountNumber
                                    ].normalDebit
                                        ? prevState[
                                              'n' + accountItem.accountNumber
                                          ].totalBalance + accountItem.amount
                                        : prevState[
                                              'n' + accountItem.accountNumber
                                          ].totalBalance - accountItem.amount,
                                },
                            ],
                        },
                    }))
                })
            })
        }
    }, [transactions])

    useEffect(() => {
        setTrialBalances({
            debitTotal: 0,
            creditTotal: 0,
        })
        Object.keys(accountBalances).forEach((ky) => {
            if (accountBalances[ky].normalDebit) {
                setTrialBalances((prevState) => ({
                    ...prevState,
                    debitTotal:
                        prevState.debitTotal + accountBalances[ky].totalBalance,
                }))
            } else {
                setTrialBalances((prevState) => ({
                    ...prevState,
                    creditTotal:
                        prevState.creditTotal +
                        accountBalances[ky].totalBalance,
                }))
            }
        })
    }, [accountBalances, transactions])

    return (
        <>
            <Head>
                <title>Accounting</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="dflexcolumn aligncontentc justifycontentc">
                    <h1>Automated Accounting</h1>
                </div>
                <br />
                <div className="dflexrow">
                    <div className="margin10px c1">
                        <TransactionBox
                            setTransactions={setTransactions}
                            currentTransactionID={currentTransactionID}
                            setcurrentTransactionID={setcurrentTransactionID}
                            accountNumberList={accountNumberList}
                        />
                        <br />
                        <div className="journal-panel">
                            <h2>Journal Entry</h2>
                            <table className="ledger-table width100p">
                                <tbody>
                                    <tr>
                                        <td>Day</td>
                                        <td>Debit</td>
                                        <td>Credit</td>
                                        <td>Info</td>
                                        <td>Debit</td>
                                        <td>Credit</td>
                                    </tr>

                                    {transactions.map((trs) => (
                                        <>
                                            <tr>
                                                <td
                                                    rowSpan={
                                                        trs.debit.length +
                                                        trs.credit.length +
                                                        2
                                                    }
                                                >
                                                    {trs.day}
                                                </td>
                                            </tr>
                                            {trs.debit.map((i) => (
                                                <tr
                                                    key={
                                                        'f' +
                                                        i.transactionID.toString()
                                                    }
                                                >
                                                    {/* <td>{trs.day}</td> */}
                                                    <td>
                                                        {
                                                            accountNumberList[
                                                                'n' +
                                                                    i.accountNumber
                                                            ]
                                                        }
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{i.amount}</td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                            {trs.credit.map((i) => (
                                                <tr key={'g' + i.accountNumber}>
                                                    {/* <td>{trs.day}</td> */}
                                                    <td></td>
                                                    <td>
                                                        {
                                                            accountNumberList[
                                                                'n' +
                                                                    i.accountNumber
                                                            ]
                                                        }
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{i.amount}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                {/* <td>{trs.day}</td> */}
                                                <td></td>
                                                <td></td>
                                                <td>To record {trs.item}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            {/* <button
                                className="default-button"
                                onClick={onRemoveLastEntry}
                            >
                                Remove Last Entry
                            </button> */}
                        </div>
                    </div>
                    <div className="margin10px c2 ledger-panel">
                        <div className="dflexrow width100p justifycontentsb aligncontentc">
                            <h1>General Ledger</h1>
                            <button
                                className="default-button"
                                onClick={onClearLedger}
                            >
                                Clear Ledger
                            </button>
                        </div>
                        {Object.keys(accountBalances).map((k) => (
                            <div key={k + 'a'}>
                                <table
                                    key={k + 'b'}
                                    className="ledger-table width100p"
                                >
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>Account Number</td>
                                            <td>
                                                {k.substring(
                                                    1,
                                                    accountBalances[k].name
                                                        .lengt
                                                )}
                                            </td>
                                            <td colSpan={2}>Account Title</td>
                                            <td colSpan={3}>
                                                {accountBalances[k].name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={2} colSpan={2}>
                                                Date
                                            </td>
                                            <td rowSpan={2}>Item</td>
                                            <td rowSpan={2}>PR</td>
                                            <td rowSpan={2}>Debit</td>
                                            <td rowSpan={2}>Credit</td>
                                            <td colSpan={2}>Running Balance</td>
                                        </tr>
                                        <tr>
                                            <td>Debit</td>
                                            <td>Credit</td>
                                        </tr>
                                        {accountBalances[k].allBalances.map(
                                            (itm) => (
                                                <tr
                                                    key={
                                                        itm.day.toString() +
                                                        itm.item
                                                    }
                                                >
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'a'
                                                        }
                                                    ></td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'b'
                                                        }
                                                    >
                                                        {itm.day}
                                                    </td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'c'
                                                        }
                                                    >
                                                        GJ-1
                                                    </td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'h'
                                                        }
                                                    >
                                                        {itm.item}
                                                    </td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'd'
                                                        }
                                                    >
                                                        {itm.balType === 'debit'
                                                            ? itm.ammount
                                                            : ''}
                                                    </td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'e'
                                                        }
                                                    >
                                                        {itm.balType ===
                                                        'credit'
                                                            ? itm.ammount
                                                            : ''}
                                                    </td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'f'
                                                        }
                                                    >
                                                        {accountBalances[k]
                                                            .normalDebit
                                                            ? itm.runningBalance
                                                            : ''}
                                                    </td>
                                                    <td
                                                        key={
                                                            itm.day.toString() +
                                                            itm.item +
                                                            'g'
                                                        }
                                                    >
                                                        {!accountBalances[k]
                                                            .normalDebit
                                                            ? itm.runningBalance
                                                            : ''}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        <tr>
                                            <td>
                                                <br />
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <br />
                                <br />
                            </div>
                        ))}
                        <div>
                            <h1>Trial Balance</h1>
                            <table className="ledger-table">
                                <tbody>
                                    <tr>
                                        <td>Account Number</td>
                                        <td>Account Title</td>
                                        <td>Debit</td>
                                        <td>Credit</td>
                                    </tr>
                                    {Object.keys(accountBalances).map((k) => (
                                        <tr key={'j' + k}>
                                            <td>
                                                {k.substring(
                                                    1,
                                                    accountBalances[k].name
                                                        .length
                                                )}
                                            </td>

                                            <td>{accountBalances[k].name}</td>
                                            <td>
                                                {accountBalances[k].normalDebit
                                                    ? accountBalances[k]
                                                          .totalBalance
                                                    : ''}
                                            </td>
                                            <td>
                                                {!accountBalances[k].normalDebit
                                                    ? accountBalances[k]
                                                          .totalBalance
                                                    : ''}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td>TOTAL</td>
                                        <td>{trialBalances.debitTotal}</td>
                                        <td>{trialBalances.creditTotal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* <div>{JSON.stringify(accountBalances, null, '\t')}</div> */}

                <br />
            </main>
            {/* <p>{JSON.stringify(transactions)}</p> */}

            <footer>
                <div className="dflexrow margin10px aligncontentc justifycontentsb">
                    <div>
                        <p>Automated Accounting</p>
                    </div>
                    <div>
                        <p>Hanz Aquino | 2023</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
