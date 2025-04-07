import { Request,Response,NextFunction } from "express";
import { catchAsyncerror } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorhandler";
import orderModel,{Order} from "../models/order.model";
import usermodel from "../models/user.model";
import courseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/send.mails";
import notificationModel from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../sevices/order.service";



//create Order
export const createOrder = catchAsyncerror(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {courseId,paymentInfo} =req.body as Order;

        const user=await usermodel.findById(req.user?._id);

        const courseExistInUser=user?.courses.some((course:any)=> course._id.toString()===courseId.toString());

        if(courseExistInUser){
            return next(new ErrorHandler("you have already purchased this course",400));
        }

        const course=await courseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("course not found",404));
        }

        const data:any={
            courseId:course?._id,
            userId:user?._id,
            paymentInfo,
        };

        const courseid = (course?._id as string)?.toString().slice(0, 6);

        
        const mailData={
            order:{
                _id:courseid,
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString('en-IN',{year:'numeric',month:'long',day:'numeric'}),
            }
        }
        const html=await ejs.renderFile(path.join(__dirname,'../mails/confirmation-mail.ejs'),{order:mailData});
        
        try {
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"Order Confirmation",
                    template:"confirmation-mail",
                    data:mailData,
                });
            }            
        } catch (error:any) {
            next(new ErrorHandler(error.message,400));
        }
        
        (user as { courses: any[] })?.courses.push((course as { _id: any })?._id);
        
        await user?.save();
        
        await notificationModel.create({
            userId:user?._id,
            title:"New Order",
            message:`You have a new Order from ${course.name}`,
        });

        if (typeof course.purchased === 'number') {
            course.purchased += 1;
        } else {
            course.purchased = 1; // Initialize if it doesn't exist
        }
        await course.save();
        console.log(data);
        
        newOrder(data,res,next);
        
    } catch (error:any) {
        next(new ErrorHandler(error.message,400));
    }
});

//Get All Orders ----Only for Admin
export const getAllOrders=catchAsyncerror(async(req:Request,res:Response,next:NextFunction)=>{
    try {
       getAllOrdersService(res);
    } catch (error:any) {
        next(new ErrorHandler(error.message,400));
    }
});

