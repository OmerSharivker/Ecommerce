
const stripeModel =require('../../models/stripeModel')
const {v4: uuidv4}= require('uuid');
const { responseReturn } = require('../../utiles/response');
const sellerModel = require('../../models/sellerModel');
const sellerShopWallet = require('../../models/sellerShopWallet');
const withdrawRequest = require('../../models/withdrawRequest');
const stripe= require('stripe')(process.env.api_stripe)
class paymentController{
    create_stripe_connect_account =async (req,res)=>{
     const {id}=req;
     const uid=uuidv4()
       try {
        const stripeInfo = await stripeModel.findOne({sellerId: id})
        if (stripeInfo) {
            await stripeModel.deleteOne({sellerId:id})
            const account = await stripe.accounts.create({type: 'express'})

            const accountLink= await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'http://localhost:3001/refresh',
                return_url: `http://localhost:3001/success?activeCode=${uid}`,
                type: 'account_onboarding'
            })
            await stripeModel.create({
                sellerId:id,
                stripeId: account.id,
                code: uid
            })
            responseReturn(res,201,{url:accountLink.url})
        }else{
            const account = await stripe.accounts.create({type: 'express'})

            const accountLink= await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'http://localhost:3001/refresh',
                return_url: `http://localhost:3001/success?activeCode=${uid}`,
                type: 'account_onboarding'
            })
            await stripeModel.create({
                sellerId:id,
                stripeId: account.id,
                code: uid
            })
            responseReturn(res,201,{url:accountLink.url})
        }
       } catch (error) {
        console.log(error.message)
       }
    }
    // end method
    active_stripe_connect_account = async (req, res) => {
        const {activeCode} = req.params 
        const {id} = req

        try {
             const userStripeInfo = await stripeModel.findOne({ code: activeCode })
           
             if (userStripeInfo) {
                 await sellerModel.findByIdAndUpdate(id,{  
                   payment: 'active'
                 })
                 responseReturn(res, 200, {message: 'payment Active'})
             } else {
                 responseReturn(res, 404, {message: 'payment Active Fails'})
             } 
        } catch (error) {
         responseReturn(res, 500, {message: 'Internal Server Error'})
        } 
     }
       // end Method 
       sumAmount = (data) => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum = sum + data[i].amount;            
        }
        return sum
    }  
    //end handler function 

       get_seller_payment_details = async (req, res) => {
        const {sellerId} = req.params 
    
        try {
            const payments = await sellerShopWallet.find({ sellerId }) 
            const pendingWithdraws = await withdrawRequest.find({
                $and: [
                    {
                        sellerId: {
                            $eq: sellerId
                        }
                    },
                    {
                        status: {
                            $eq: 'pending'
                        }
                    }
                ]
            })
            const successWithdraws = await withdrawRequest.find({
                $and: [
                    {
                        sellerId: {
                            $eq: sellerId
                        }
                    },
                    {
                        status: {
                            $eq: 'success'
                        }
                    }
                ]
            })
            const pendingAmount = this.sumAmount(pendingWithdraws)
            const withdrawAmount = this.sumAmount(successWithdraws)
            const totalAmount = this.sumAmount(payments)
            let availableAmount = 0;
            if (totalAmount > 0) {
                availableAmount = totalAmount - (pendingAmount + withdrawAmount)
            }
    
            responseReturn(res, 200,{
                totalAmount,
                pendingAmount,
                withdrawAmount,
                availableAmount,
                pendingWithdraws,
                successWithdraws 
            })
            
        } catch (error) {
            console.log(error.message)
        } 
     }
       // end Method
       withdrawal_request = async (req, res) => {
        const {amount,sellerId} = req.body
        try {
            const withdrawal = await withdrawRequest.create({
                sellerId,
                amount: parseInt(amount)
            })
            responseReturn(res, 200,{ withdrawal, message: 'Withdrawal Request Send'})
        } catch (error) {
            responseReturn(res, 500,{ message: 'Internal Server Error'})
        }
    }
  // End Method 
}

module.exports=new paymentController();