const mongoose = require('mongoose')
const crypto = require('crypto')
const User = require('./models/users')
const UserProfile = require('./models/users-profile')

const databaseUrl = "mongodb://localhost/test"
const users = [
    {
        firstName: "Nitin",
        lastName: "Goyal",
        email: "nitin@gmail.com",
        password: "somepassword",
        dob: "1996-03-19",
        mobileNumber: "8447645068"
    },
    {
        firstName: "rohit",
        lastName: "Goyal",
        email: "rohit@gmail.com",
        password: "somepasswordforrohit",
        dob: "1995-08-19",
        mobileNumber: "8568645068"
    },
    {
        firstName: "rahul",
        lastName: "Goyal",
        email: "rahul@gmail.com",
        password: "somepasswordforrahul",
         dob: "1992-01-04",
        mobileNumber: "8447534068"
    },
    {
        firstName: "avinash",
        lastName: "Goyal",
        email: "avinash@gmail.com",
        password: "somepasswordforavinash",
        dob: "1989-10-17",
        mobileNumber: "8447644753"
    },
    {
        firstName: "karan",
        lastName: "Goyal",
        email: "karan@gmail.com",
        password: "somepasswordforkaran",
        dob: "1988-03-15",
        mobileNumber: "8447145068"
    }
]

mongoose.connect(databaseUrl, {useNewUrlParser: true})

async function createUser(user) {
    try{
        const u = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: crypto.createHash('md5',user.password).digest('hex')
        }

        const profile = {
            dob: new Date(user.dob),
            mobileNumber: Number(user.mobileNumber)
        }

        let us = new User(u)
        let result = await us.save()

        console.log(result)
        profile.user_id = result._id

        let userProfile = new UserProfile(profile)
        result = await userProfile.save()
        console.log(result)
    } catch(err) {
        console.log(err)
    }
}

async function insertData() {
    for(user of users) {
        await createUser(user)
        console.log("user created")
    }
    mongoose.connection.close()
}

async function deleteData(){
    if(!mongoose.connection) {
        mongoose.connect(databaseUrl, {useNewUrlParser: true})
    }
    
    let d = new Date()
    d.setFullYear(d.getFullYear() - 25)
    console.log(`date: ${d}`)
    try{
        let usersOlder = await UserProfile.find({dob: {$lte: d}})
        let result

       for(user of usersOlder ) {
            result = await User.deleteOne({_id: user.user_id})
            result = await UserProfile.deleteOne({_id: user._id})
        }

    } catch(err){
        console.log(err)
    }
    mongoose.connection.close()
}
