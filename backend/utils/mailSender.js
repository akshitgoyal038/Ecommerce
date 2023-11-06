const nodemailer = require("nodemailer");


const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                secure:true,
                auth:{
                    user: "haryanachinu@gmail.com",
                    pass: "dphdlwzwmlqabtet"
                } 
            })
            


            let info = await transporter.sendMail({
                from: 'Akshit Electronics',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;