const cartModel = require("../../models/cartModel")
const customerModel = require("../../models/customerModel")
const { responseReturn } = require("../../utiles/response")
const {mongo :{ObjectId}} =require('mongoose')


class cartControllers {
    add_to_cart =  async(req, res) => {
        
        const { userId, productId, quantity } = req.body
        try {
            const product = await cartModel.findOne({
                $and: [{
                    productId : {
                        $eq: productId
                    }
                },
                {
                    userId: {
                        $eq: userId
                    }
                }
            ]
            })
            if (product) {
                responseReturn(res,404,{error: "Product Already Added To Cart" })
            } else {
                const product = await cartModel.create({
                    userId,
                    productId,
                    quantity
                })
                responseReturn(res,201,{message: "Added To Cart Successfully" , product})
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }
    //end method
    
    get_cart_product =  async(req, res) => {
        const {userId}=req.params;
        const commission=5;
       
        try {
             const cart_products=await cartModel.aggregate([{
                $match: {
                    userId:{
                        $eq: new  ObjectId(userId)
                    }
                }
             },
             {
                $lookup :{
                    from: 'products',
                    localField:'productId',
                    foreignField:"_id",
                    as: 'products'
                }
             }])
            let buy_product_item =0;
            let calc_price=0;
            let cart_product_count=0;
            const out_of_stock_product= cart_products.filter(p=>p.products[0].stock< p.quantity)
            for (let i = 0; i < out_of_stock_product.length; i++) {
               cart_product_count=cart_product_count+out_of_stock_product[i].quantity    
            }//end for loop
            const stock_product= cart_products.filter(p=>p.products[0].stock>= p.quantity)
            for (let i = 0; i < stock_product.length; i++) {
                const {quantity} = stock_product[i]    
                cart_product_count= buy_product_item+quantity;
                buy_product_item=buy_product_item +quantity;
                const {price,discount}=stock_product[i].products[0]
                if (discount !== 0) {
                    calc_price=calc_price + quantity *(price- Math.floor((price*discount)/100))
                } else {
                    calc_price =calc_price+quantity*price
                }
             }//end for loop
             let p=[]
             let unique=[...new Set(stock_product.map(p=>p.products[0].sellerId.toString()))]
             for (let i = 0; i < unique.length; i++) {
               let price=0;
               for (let j = 0; j < stock_product.length; j++) {
                const temp_product=stock_product[j].products[0]
                if (unique[i]===temp_product.sellerId.toString()) {
                    let cost=0;
                    if (temp_product.discount !== 0) {
                        cost =temp_product.price -Math.floor((temp_product.price*temp_product.discount)/100)
                    } else {
                        cost=temp_product.price
                    }
                cost =cost -Math.floor((cost*commission)/100)
                price= price +cost*stock_product[j].quantity
                p[i]={
                    sellerId: unique[i],
                    shopName: temp_product.shopName,
                    price,
                    products: p[i] ?[
                        ...p[i].products,
                        {
                            _id :stock_product[j]._id,
                            quantity: stock_product[j].quantity,
                            productInfo: temp_product
                        }
                    ] : [{
                        _id :stock_product[j]._id,
                        quantity: stock_product[j].quantity,
                        productInfo: temp_product
                    }]
                }
                }

               }
                 
             }
             responseReturn(res,200,{cart_products: p, price : calc_price ,cart_product_count ,shipping_fee: 20 * p.length,out_of_stock_product,buy_product_item })
            }
           
            
       catch (error) {
            console.log(error.message)
        }
    }
    //end method

  

    delete_cart_product =  async(req, res) => {
   
    const {cart_id}=req.params
        try {
          await cartModel.findByIdAndDelete(cart_id)
          responseReturn(res,200,{message: "Product Deleted Successfully" })
        } catch (error) {
            console.log(error.message)
        }
    }
    //end method
  
    quantity_inc =  async(req, res) => {
   
        const {cart_id}=req.params
            try {
                const product=await cartModel.findById(cart_id);
                const{quantity}=product
              await cartModel.findByIdAndUpdate(cart_id,{quantity: quantity +1})
              responseReturn(res,200,{message: "Quantity Updated" })
            } catch (error) {
                console.log(error.message)
            }
        }
     //end method
     quantity_dec =  async(req, res) => {
   
        const {cart_id}=req.params
            try {
                const product=await cartModel.findById(cart_id);
                const{quantity}=product
              await cartModel.findByIdAndUpdate(cart_id,{quantity: quantity -1})
              responseReturn(res,200,{message: "Quantity Updated" })
            } catch (error) {
                console.log(error.message)
            }
        }
     //end method

}
module.exports=new cartControllers()