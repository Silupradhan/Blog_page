import config from "../config/config";

import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndPoint)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                //  call another method
                return this.login(email,password) // it redirect the login page after sign up
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
      try {
        return await this.account.createEmailPasswordSession(email,password)
        
      } catch (error) {
        throw error
        
      }
    }

    async getCurrentUser(){   // after login it will check authentication state
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);            
        }
        return null
    }


    async logOut(){
        try {
           return await this.account.deleteSessions() 
        } catch (error) {
            throw error
            
        }
    }
}

const authService = new AuthService

export default authService