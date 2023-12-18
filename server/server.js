const express = require('express');
const app = express();
const pool = require('./utils/db')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/show', async (req, res) => {

    try {
        pool.query(`select * from accounts`, (err, result, fields) => {
            if (err) {
                return console.log(err)
            }
            res.status(200).json(result)
        });
    } catch (error) {
        console.log(error)
    }
})

app.post('/showBalance', async (req, res) => {

    try {

        const { accNo, Pin } = req.body;

        pool.query(`select balance, Pin from account where accountNo = ?`, [accNo], (err, result, fields) => {
            if (err) {
                return console.log(err)
            }
            if (result[0].Pin != Pin) {
                return res.status(403).json({ msg: "Wrong Pin" });
            }
            return res.status(200).json({ result })
        });
    } catch (error) {
        console.log(error)
    }
})

app.post('/insert', async (req, res) => {
    try {
        const { name, accNo } = req.body;

        pool.query(`INSERT INTO ACCOUNT VALUES(?, ?, 0, 5555)`, [name, accNo], (err, result, fields) => {
            if (err) {
                return console.log(err, "inside try");
            }
            res.status(200).json(result);
        })
    } catch (error) {
        console.log(error, "inside catch");
    }
})

app.post('/transfer', async (req, res) => {
    try {
        const { senAcc, recAcc, amount, Pin } = req.body;

        const senderQuery = `SELECT name, Balance, Pin FROM account WHERE AccountNo = ?`

        pool.query(senderQuery, [senAcc], (err, sender) => {

            if (err) {
                return console.log(err, ' Inside pool')
                // return res.status(401).send('Sender Not Found');
            }

            else {
                // if(sender[0].Balance < amount) {
                //     return res.status(400).json({msg: "Sender have insufficient balance"})
                // }

                if (sender[0].Pin != Pin) {
                    return res.status(401).send('Pin Incorrect');
                }

                console.log('-Sender Found Successfully')

                const receiverQuery = `SELECT name FROM account WHERE AccountNo = ?`

                pool.query(receiverQuery, [recAcc], (err, receiver) => {

                    const senUpdateQuery = 'UPDATE Account SET Balance = Balance - ? WHERE AccountNo = ?'

                    pool.query(senUpdateQuery, [amount, senAcc], (err, senResult) => {
                        if (err) {
                            return console.log(err, " inside pool")
                        }
                        console.log('-sender money deducted')

                        const recUpdateQuery = 'UPDATE Account SET Balance = Balance + ? WHERE AccountNo = ?'

                        pool.query(recUpdateQuery, [amount, recAcc], (err, recResult) => {
                            if (err) {
                                return console.log(err, " inside pool")
                            }
                            console.log('-receiver money Added')

                            const saveHistoryQuery = 'INSERT INTO history VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'

                            pool.query(saveHistoryQuery, [sender[0].name, senAcc, receiver[0].name, recAcc, amount], (err, historyResult) => {
                                if (err) {
                                    return console.log(err, ' in save History')
                                }
                                else {
                                    console.log('-Transaction added successfully')
                                    console.log('-Amount transferred successfully')
                                    return res.status(200).json({ msg: "Amount successfully transferred" })
                                }
                            })
                        })
                    })
                })
            }
        })


    } catch (error) {
        console.log(error, ' inside catch')
    }
})

app.post('/display', (req, res) => {
    const { accNo } = req.body;

    const reqQuery = `SELECT * FROM history WHERE senderAcc = ? OR receiverAcc = ?`

    pool.query(reqQuery, [accNo, accNo], (err, result) => {
        return res.status(200).json({ result })
    })
})

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Test" });
})

app.listen(3001, (req, res) => {
    console.log('Server started at port 3001');
});