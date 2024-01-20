import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account
    constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite End
        .setProject('65ab2d9e658e5447a80a')
        this.account = new Account(this.client);
    }

    async createAccount({email,password}) {
        try{
            const newUser = await this.account.create(ID.unique(),email,password)
            if(newUser){
                return this.login({email,password})
            }else{
                return newUser
            }
        }catch(error){
            console.log(error)
            alert(error.message)
        }
    }
    async login({email,password}){
        try{
           const user = await this.account.createEmailSession(email,password)
           console.log('user data:',user)
           return user
        }catch(error){
            console.log(error)
            alert(error.message)
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log(error)
        }
        return null
    }
    async logout(){
        try{
            await this.account.deleteSessions()
            console.log('User logged successfully')
        }catch(error){
            console.log("Logout failed")
        }
    }

}

const authService = new AuthService()
export default authService