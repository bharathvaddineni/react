import {Client, ID, Databases,Query } from 'appwrite'
import authService from './auth';

export class Service{
    client = new Client();
    database
    constructor(){
        this.client.setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite End
        .setProject('65ab2d9e658e5447a80a')
        this.database = new Databases(this.client)
    }
    async addItem({title,desc,price,quantity,itemId,image}){
        const user = await authService.getCurrentUser()
        const userId = user.$id
        console.log('Current user in additem:',userId)
        try{
            const respone = await this.database.listDocuments(
                "65ab2dfc4e2bf76db499",
                "65ab2e03e5dc48bd63b0",
                [Query.equal('userId',userId),
                Query.equal('itemId',itemId)]
            )
            if (respone.total > 0){
                const docid = respone.documents[0].$id
                return await this.database.updateDocument(
                    "65ab2dfc4e2bf76db499",
                    "65ab2e03e5dc48bd63b0",
                    docid,
                    {quantity: respone.documents[0].quantity + 1,
                        price: respone.documents[0].price + Number(price)}
                )
            }
                return await this.database.createDocument(
                    "65ab2dfc4e2bf76db499",
                    "65ab2e03e5dc48bd63b0",
                    ID.unique(),
                    {
                        "title":String(title),
                        "desc":String(desc),
                        "price": Number(price),
                        "quantity":Number(quantity),
                        "itemId":String(itemId),
                        "userId":String(userId),
                        "image":String(image)
                    }
                )
        }catch(error){
            console.log("error adding item to the cart: ",error)
        }
    }
    async removeItem({itemId,price}){
        try{
            const user = await authService.getCurrentUser()
        const userId = user.$id
            const response = await this.database.listDocuments(
                "65ab2dfc4e2bf76db499",
                "65ab2e03e5dc48bd63b0",
                [Query.equal('userId',userId),
                Query.equal('itemId',itemId)]
            )
            console.log("Total items: ",response.total)
            if (response.total === 0){
                return
            }else if(response.documents[0].$id === 1){
                const docid = response.documents[0].$id
                return await this.database.deleteDocument(
                    "65ab2dfc4e2bf76db499",
                    "65ab2e03e5dc48bd63b0",
                    docid
                )
            }else{
                const docid = response.documents[0].$id
                return await this.database.updateDocument(
                    "65ab2dfc4e2bf76db499",
                    "65ab2e03e5dc48bd63b0",
                    docid,
                    {quantity: response.documents[0].quantity - 1,
                    price: response.documents[0].price - Number(price)}
                )
            }
        }catch(error){
            console.log("Error Removing Item from Cart")
        }
    }
    async getUserDocument(){
        const user = await authService.getCurrentUser()
        const userId = user.$id
        try{
            const res = await this.database.listDocuments(
                "65ab2dfc4e2bf76db499",
                "65ab2e03e5dc48bd63b0",
                [Query.equal('userId',userId)]
            )
            console.log('response: ',res)
            return res
        }catch(error){
            console.log("Error retrieving data")
        }
    }
}
const service = new Service()
export default service