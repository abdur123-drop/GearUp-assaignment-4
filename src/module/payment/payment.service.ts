import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createPaymentIntoDB = async(
    userId:string,
    rentalOrderId:string
)=>{
const rentalOrder = await prisma.rentalOrder.findUnique({
where:{
    id:rentalOrderId
},
include:{
    gearItem:true,
    customer: true
}
});

if(!rentalOrder){
    throw new Error(
        "Rental order not found"
    );
}

if(rentalOrder.customerId !== userId){
    throw new Error(
        "Unauthorized payment"
    );
}

const transactionSession = await prisma.$transaction(async(tx)=>{
    const session = await stripe.checkout.sessions.create({
payment_method_types:[
    "card"
],
mode:"payment",
customer_email: rentalOrder.customer.email,
line_items:[
{
price_data:{
currency:"usd",
product_data:{
name:rentalOrder.gearItem.name
},
unit_amount:
Math.round(
rentalOrder.totalAmount * 100
)
},
quantity:1
}
],
success_url:
`${config.app_url}/payment-success`,
cancel_url:
`${config.app_url}/payment-cancel`,
metadata:{
rentalOrderId:rentalOrder.id
}
});

const paymentDetails = await tx.payment.create({
data:{
rentalOrderId,
customerId:userId,
sessionId:session.id,
amount:rentalOrder.totalAmount,
provider:"STRIPE",
status:"PENDING"
}
});

return {
    paymentDetails,
    paymentUrl: session.url,
    sessionId: session.id
}
})


return {
    paymentDetails: transactionSession.paymentDetails,
paymentUrl: transactionSession.paymentUrl,
sessionId: transactionSession.sessionId
};


}


const confirmPaymentIntoDB = async(sessionId: string) =>{
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if(session.payment_status !== "paid"){
        throw new Error("Payment not completed")
    }

    const payment = await prisma.payment.findUnique({
        where:{
            sessionId
        }
    })

    if(!payment){
        throw new Error("Payment record not found")
    }

    await prisma.payment.update({
        where:{
            sessionId
        }, 
        data:{
            status: "COMPLETED",
            paidAt: new Date()
        }
    })

    await prisma.rentalOrder.update({
        where:{
            id: payment.rentalOrderId
        },
        data:{
            paymentStatus: "COMPLETED",
            status: "PAID"
        }
    });

    return {
        message:"Payment completed"
    }
}

const usersPaymentHistoryFromDB = async(userId: string) =>{
    const user = await prisma.user.findFirstOrThrow({
        where:{
            id: userId
        }
    })

    const payments = await prisma.payment.findMany({
        where:{
            customerId: user.id,
            status: "COMPLETED"
        }
    })

    return payments
}

const paymentDetailsFromDB = async(userId : string, paymentId : string)=>{
    const user = await prisma.user.findFirstOrThrow({
        where:{
            id: userId
        }
    })

    const payment = await prisma.payment.findUnique({
        where:{
            id: paymentId
        }
    })

    if(!payment){
        throw new Error("There is no Payment History for this ID")
    }

    const paymentAuthorCheck = await prisma.payment.findUnique({
        where:{
            id: paymentId,
            customerId: user.id
        }
    })

    if(!paymentAuthorCheck){
        throw new Error("You are not Author of this ID")
    }

    return payment
}

export const paymentService = {
    createPaymentIntoDB,
    confirmPaymentIntoDB,
    usersPaymentHistoryFromDB,
    paymentDetailsFromDB
}