
const formidable = require("formidable");
const { responseReturn } = require("../../utiles/response");
const cloudinary =require('cloudinary').v2
const sellerModel = require("../../models/sellerModel");



class sellerController{

    get_seller_request= async(req,res)=>{
        const{page,searchValue,parPage}=req.query
        const skipPage=parseInt(parPage)*(parseInt(page)-1)

        try {
            if (searchValue) {
                
            } else {
                const sellers=await sellerModel.find({status :
                    'pending'}).skip(skipPage).limit(parPage).sort({createdAt :-1})
                const totalSellers= await sellerModel.find({status :
                    'pending'}).countDocuments()
                    
                responseReturn(res, 200,{sellers,totalSellers})
            }
        } catch (error) {
            responseReturn(res, 500,{error :error.message})
        }
     
    }
    // end method

    get_seller= async(req,res)=>{
        const{sellerId}=req.params
        try {    
                const seller=await sellerModel.findById(sellerId)
                responseReturn(res, 200,{seller})    
        } catch (error) {
            responseReturn(res, 500,{error :error.message})
        }
     
    }


    // end method

    seller_status_update= async(req,res)=>{
        const{sellerId,status}=req.body
        try {
               await sellerModel.findByIdAndUpdate(sellerId, {status})
               const seller=await sellerModel.findById(sellerId)
                responseReturn(res, 200,{seller,message :'Seller Status Update Successfully'})
           
        } catch (error) {
            responseReturn(res, 500,{error :error.message})
        }
    
    }
    get_active_sellers= async(req,res)=>{
      let {page,searchValue,parPage}=req.query
      page=parseInt(page)
      parPage=parseInt(parPage)
      const skipPage =parPage * (page-1)
        try {
            if (searchValue) {
                const sellers= await sellerModel.find({
                    $text:{$search: searchValue},
                   status:'active'
                }).skip(skipPage).limit(parPage).sort({createdAt: -1})
                const totalSellers = await sellerModel.find({
                       $text:{$search: searchValue},
                   status:'active'
                }).countDocuments()
                responseReturn(res, 200,{sellers,totalSellers})
            } else {
                const sellers= await sellerModel.find({
                   status:'active'
                }).skip(skipPage).limit(parPage).sort({createdAt: -1})
                const totalSellers = await sellerModel.find({
                   status:'active'
                }).countDocuments()
                responseReturn(res, 200,{sellers,totalSellers})
            }
           
        } catch (error) {
            responseReturn(res, 500,{error :error.message})
        }
     
    }

    get_deactivate_sellers= async(req,res)=>{
        let {page,searchValue,parPage}=req.query
        page=parseInt(page)
        parPage=parseInt(parPage)
        const skipPage =parPage * (page-1)
          try {
              if (searchValue) {
                  const sellers= await sellerModel.find({
                      $text:{$search: searchValue},
                      status:'deactivate'
                  }).skip(skipPage).limit(parPage).sort({createdAt: -1})
                  const totalSellers = await sellerModel.find({
                         $text:{$search: searchValue},
                         status:'deactivate'
                  }).countDocuments()
                  responseReturn(res, 200,{sellers,totalSellers})
              } else {
                  const sellers= await sellerModel.find({
                      status:'deactivate'
                  }).skip(skipPage).limit(parPage).sort({createdAt: -1})
                  const totalSellers = await sellerModel.find({
                     status:'deactivate'
                  }).countDocuments()
                  responseReturn(res, 200,{sellers,totalSellers})
              }
             
          } catch (error) {
              responseReturn(res, 500,{error :error.message})
          }
       
      }
  
}
module.exports=new sellerController();