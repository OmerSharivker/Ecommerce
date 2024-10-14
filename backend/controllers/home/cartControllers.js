const cartModel = require("../../models/cartModel")
const customerModel = require("../../models/customerModel")
const { responseReturn } = require("../../utiles/response")

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

}
module.exports=new cartControllers()