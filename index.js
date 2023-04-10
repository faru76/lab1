const express = require('express')
const app = express()
const port = 3000

const bcrypt = require('bcrypt')
const saltRounds = 13

let dbUsers = [
    {
        username: "faru",
        password: "011018",
        name: "Fairuz",
        email: "faru@mail.com"
    },
    
    {
        username: "polobon",
        password: "010831",
        name: "Bon",
        email: "polobon@mail.com"
    },
    
    {
        username: "lengzaii",
        password: "011120",
        name: "Cheok",
        email: "lengzaii@mail.com"
    },
]

function login(username, password){
    console.log("someone tried to login with", username, password)
    
    let matched = dbUsers.find(element=>element.username == username)

    if(matched) {
        const isMatch = bcrypt.compareSync(password, matched.password)

        if(isMatch){
            return matched
        }         
        else {
            return "Password not matched"
        }
    }
    else {
        return "Username not found"
    }
}

function register(newusername, newpassword, newname, newemail){
    //Check if username exists
    let matched = dbUsers.find(element=>element.username == newusername)

    if(matched) {
        return "This user already exists"
    }

    else {
        const hashedpassword = bcrypt.hashSync(newpassword, saltRounds)

        dbUsers.push({
            username: newusername,
            password: hashedpassword,
            name : newname,
            email: newemail
        })

        return "new user is added"
    }
}

app.use(express.json()); //decode the json included in request

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
    let data = req.body
    res.send('Post request ' + JSON.stringify(data))
})

app.post('/bye', (req, res) => {
    res.send('Bye Bye World!')
}) //this will not work as anything typed in the address bar will use GET method.

app.post('/login',(req,res)=>{
    let data = req.body
    res.send(login(data.username, data.password))
})

app.post('/register',(req,res)=>{
    let data = req.body
    res.send(register(data.username, data.password, data.name, data.email))
})

//start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})