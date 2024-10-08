const { responseReturn } = require("../../utiles/response");
const categoryModel=require('../../models/categotyModel');
const productModel = require("../../models/productModel");

class homeControllers{


    formateProduct = (products) =>{
        const productArray = [] ;
        let i=0;
        while (i <products.length) {
            let temp =[];
            let j=i;
            while (j< i +3) {
                if (products[j]) {
                    temp.push(products[j])
                }
                j++;
            }
            productArray.push([...temp])
            i=j
        }
        return productArray;
    }



get_categories =async(req,res) =>{
  try {
    const categories= await categoryModel.find({})
    responseReturn(res,200,{categories})

  } catch (error) {
    console.log(error.message)
  }

    
}
//end method

get_products =async(req,res) =>{
    try {
      const products= await productModel.find({}).limit(12).sort({
        createdAt: -1
      })
      const allproducts1= await productModel.find({}).limit(12).sort({
        createdAt: -1
      })
      const allproducts2= await productModel.find({}).limit(12).sort({
        rating: -1
      })
      const allproducts3= await productModel.find({}).limit(12).sort({
        discount: -1
      })
      const latest_product= this.formateProduct(allproducts1);
      const topRated_product= this.formateProduct(allproducts2);
      const discount_product= this.formateProduct(allproducts3);


      responseReturn(res,200,{products,latest_product,topRated_product,discount_product})
  
    } catch (error) {
      console.log(error.message)
    }
  
      
  }
  //end method

  price_range_product=async(req,res) =>{
    try {
      const priceRange= {
        low: 0,
        high: 0 ,
      }
      const products= await productModel.find({}).limit(9).sort({
        createdAt: -1
      })
      const latest_product= this.formateProduct(products);
      const getForPrice= await productModel.find({}).limit(9).sort({
        price : 1
      })
      console.log(getForPrice);
     if(getForPrice.length >0 ){
        priceRange.high=getForPrice[getForPrice.length -1].price
        priceRange.low=getForPrice[0].price
        responseReturn(res,200,{latest_product,priceRange})
     }

    } catch (error) {
      console.log(error.message)
    }
  
      
  }
  //end method
}
module.exports=new homeControllers();