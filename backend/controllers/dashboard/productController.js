const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary =require('cloudinary').v2
const productModel=require('../../models/productModel')

class  productController{
    add_product=async(req,res)=>{
        const {id}=req;
       const form=formidable({multiples :true })

       form.parse(req, async(err,field,files)=>{
        let {name,category,stock,brand,shopName,price,discount,description}=field;
        const {images}=files;
        name=name.trim().toLowerCase()
        const slug=name.split(' ').join('-')
        
        
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })

        try {
            let allImageUrl=[]
            if (Array.isArray(images)) {
                for (let i = 0; i < images.length; i++) {
                    const res = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' });
                    allImageUrl.push(res.url);
                }
            } else if (images) {
                
                const res = await cloudinary.uploader.upload(images.filepath, { folder: 'products' });
                allImageUrl.push(res.url);
            }
            await productModel.create({
                sellerId: id,
                name,
                slug,
                shopName,
                discount: parseInt(discount),
                description: description.trim(),
                category: category.trim(),
                stock: parseInt(stock),
                brand: brand.trim(),
                price: parseInt(price),
                images:allImageUrl

            })
            responseReturn(res, 201,{message : 'Product Added Successfully'})
        } catch (error ) {
            responseReturn(res, 500,{ error : error.message})
        }

        

       })
    }

    //end method

    products_get = async (req, res) => {
        const {page,searchValue, parPage} = req.query 
        const {id} = req;

       const skipPage = parseInt(parPage) * (parseInt(page) - 1)

        try {

            if (searchValue) {
                const products = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1})
                const totalProduct = await productModel.find({
                    $text: { $search: searchValue },
                    sellerId: id
                }).countDocuments()
                responseReturn(res, 200,{products,totalProduct})
            } else {
                const products = await productModel.find({ sellerId:id }).skip(skipPage).limit(parPage).sort({ createdAt: -1})
            const totalProduct = await productModel.find({ sellerId:id }).countDocuments()
            responseReturn(res, 200,{products,totalProduct}) 
            }

        } catch (error) {
            console.log(error.message)

        } 

    }
    //end method

    product_get = async (req, res) => {
        const {productId} = req.params;
        try {
               const product =await productModel.findById(productId)
               responseReturn(res, 200,{product}) 
        } catch (error) {
            console.log(error.message)
        } 

    }
    //end method

   product_update = async (req,res) =>{
     let {name,description,stock,brand,price,discount,productId}=req.body;
     name=name.trim().toLowerCase()
     const slug=name.split(' ').join('-')

     try {
        await productModel.findByIdAndUpdate(productId,{
            name,description,stock,brand,price,discount,productId,slug
        })
        const product =await productModel.findById(productId)
        responseReturn(res, 201,{product,message : 'Product Updated Successfully'})
     } catch (error) {
        responseReturn(res, 500,{error : error.message})
     }
}

}
module.exports=new productController();