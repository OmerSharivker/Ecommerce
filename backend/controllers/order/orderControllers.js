const authOrderModel = require('../../models/authOrder')
const customerOrder = require('../../models/customerOrder')
const cardModel = require('../../models/cartModel')
const moment = require("moment")
const { responseReturn } = require('../../utiles/response') 
const {mongo : {ObjectId}} =require('mongoose')
class orderController{

    paymentCheck = async (id) => {
        try {
            const order = await customerOrder.findById(id)
            if (order.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, {
                    delivery_status: 'canceled'
                })
                await authOrderModel.updateMany({
                    orderId: id
                },{
                    delivery_status: 'canceled'
                })
            }
            return true
        } catch (error) {
            console.log(error)
        }
    }

    // end method 
      
    place_order = async (req,res) => {
        const {price,products,shipping_fee,shippingInfo,userId } = req.body
        let authorOrderData = []
        let cardId = []
        const tempDate = moment(Date.now()).format('LLL')

        let customerOrderProduct = []

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products
            for (let j = 0; j < pro.length; j++) {
                const tempCusPro = pro[j].productInfo;
                tempCusPro.quantity = pro[j].quantity
                customerOrderProduct.push(tempCusPro)
                if (pro[j]._id) {
                    cardId.push(pro[j]._id)
                } 
            } 
        }

        try {
            const order = await customerOrder.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProduct,
                price: price + shipping_fee,
                payment_status: 'unpaid',
                delivery_status: 'pending',
                date: tempDate
            })
            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products
                const pri = products[i].price
                const sellerId = products[i].sellerId
                let storePor = []
                for (let j = 0; j < pro.length; j++) {
                    const tempPro = pro[j].productInfo
                    tempPro.quantity = pro[j].quantity
                    storePor.push(tempPro)                    
                }
                console.log(storePor)
                authorOrderData.push({
                    orderId: order.id,
                    sellerId,
                    products: storePor,
                    price:pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'Easy Main Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                }) 
            }
            console.log(authorOrderData)
            await authOrderModel.insertMany(authorOrderData)
            for (let k = 0; k < cardId.length; k++) {
                await cardModel.findByIdAndDelete(cardId[k]) 
            }
   
            setTimeout(() => {
                this.paymentCheck(order.id)
            }, 15000)

            responseReturn(res,200,{message: "Order Placed Success" , orderId: order.id })

            
        } catch (error) {
            console.log(error.message) 
        }
 
    }

    // End Method 
    get_customer_dashboard_data = async (req,res) => {
        const {userId} =req.params
        try {
          const recentOrders = await customerOrder.find({
            customerId: new ObjectId(userId)
          }).limit(5)
          const pendingOrders = await customerOrder.find({
            customerId: new ObjectId(userId),
            delivery_status: 'pending'
          }).countDocuments()
          const totalOrders = await customerOrder.find({
            customerId: new ObjectId(userId)
          }).countDocuments()
          const canceledOrders = await customerOrder.find({
            customerId: new ObjectId(userId),
            delivery_status: 'canceled'
          }).countDocuments()

          responseReturn(res,200,{recentOrders,pendingOrders,totalOrders,canceledOrders})
        } catch (error) {
            console.log(error)
        }
    }

    // end method 
    get_orders = async (req,res) => {
        const {customerId,status} =req.params
 
        try {
            let orders=[]
            if (status !== 'all') {
                orders =await customerOrder.find({
                    customerId: new ObjectId(customerId),
                    delivery_status: status
                })
                
            } else {
                orders =await customerOrder.find({
                    customerId: new ObjectId(customerId)
                })
            }
            
            responseReturn(res,200,{orders})
        } catch (error) {
            console.log(error)
        }
    }

    // end method 
    get_order_details = async (req,res) => {
        const {orderId} =req.params
        try {
         const order = await customerOrder.findById(orderId)
         responseReturn(res,200,{order})
        } catch (error) {
            console.log(error)
        }
    }

    // end method 
  

}

module.exports = new orderController()