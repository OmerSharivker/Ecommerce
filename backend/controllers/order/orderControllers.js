const authOrderModel = require('../../models/authOrder')
const customerOrder = require('../../models/customerOrder')
const cardModel = require('../../models/cartModel')
const moment = require("moment")
const { responseReturn } = require('../../utiles/response') 
const {mongo : {ObjectId}} =require('mongoose')
const customerModel = require('../../models/customerModel')

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
    get_admin_orders = async (req,res) => {
        let {page,searchValue,parPage}=req.query
        page=parseInt(page)
        parPage=parseInt(parPage)
        const skipPage =parPage * (page-1)
        try {
        const orders= await customerOrder.aggregate([{
            $lookup:{
                from:'auth_orders',
                localField: '_id',
                foreignField:'orderId',
                as: 'suborder'
            }
        }]).skip(skipPage).limit(parPage).sort({createdAt: -1})

        const totalOrder=await customerOrder.aggregate([{
            $lookup:{
                from:'auth_orders',
                localField: '_id',
                foreignField:'orderId',
                as: 'suborder'
            }
        }]) 
        responseReturn(res,200,{orders, totalOrders: totalOrder.length})
        } catch (error) {
            console.log(error)
        }
    }

  // end method 
  get_admin_order = async (req,res) => {
    const {orderId}=req.params

    try {
    const order =await customerOrder.aggregate([
        {
            $match:{_id: new ObjectId(orderId)}
        },
            {
                $lookup:{
                    from:'auth_orders',
                    localField: '_id',
                    foreignField:'orderId',
                    as: 'suborder'
                }
            }
       
    ])
    responseReturn(res,200,{order:order[0]})
    } catch (error) {
        console.log(error)
    }
}

// end method 
admin_order_status_update = async (req,res) => {
    const {orderId}=req.params
   const {status}=req.body
    try {
     await customerOrder.findByIdAndUpdate(orderId,{
        delivery_status: status
     })
     responseReturn(res,200,{message: 'Order Status change Success'})
    } catch (error) {
        responseReturn(res,500,{message: 'Internal Server Error'})
    }
}

// end method 

get_seller_orders = async (req,res) => {
    let {page,searchValue,parPage}=req.query
    page=parseInt(page)
    parPage=parseInt(parPage)
    const skipPage =parPage * (page-1)
    const {sellerId}=req.params
    try {
    if (searchValue) {
        // const orders= await authOrderModel.find({
        //     sellerId,
        // }).skip(skipPage).limit(parPage).sort({createdAt: -1})
        // const totalOrders= await authOrderModel.find({
        //     sellerId,
        // }).countDocuments()
        // responseReturn(res,200,{orders,totalOrders})
    } else {
        const orders= await authOrderModel.find({
            sellerId,
        }).skip(skipPage).limit(parPage).sort({createdAt: -1})
        const totalOrders= await authOrderModel.find({
            sellerId,
        }).countDocuments()
        responseReturn(res,200,{orders,totalOrders})
    }
    } catch (error) {
        console.log(error)
    }
}

// end method 


get_seller_order = async (req,res) => {
    const {orderId}  = req.params
    const {sellerId}  = req.query
    try {
        const order = await authOrderModel.findOne({ orderId: orderId, sellerId: sellerId });
        
        responseReturn(res, 200, { order })
    } catch (error) {
        console.log('get seller details error' + error.message)
    }
  }
  //end method
  seller_order_status_update = async (req,res) => {
    const {orderId}=req.params
    const {status}=req.body
    const {sellerId}=req.body
    
    try {

        const order = await authOrderModel.findOne({ orderId: orderId, sellerId: sellerId });
        order.delivery_status=status
        await order.save()
        console.log(order.delivery_status)
     responseReturn(res,200,{message: 'Order Status change Success'})
    } catch (error) {
        responseReturn(res,500,{message: 'Internal Server Error'})
    }
}

// end method 
}

module.exports = new orderController()