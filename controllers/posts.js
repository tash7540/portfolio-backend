import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import nodemailer from 'nodemailer';
const router = express.Router();

export const createPost = async (req, res) => {
    const {name,email,subject,message} = req.body;
    const contactEmail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "tamer.shahwan.jobs@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
    contactEmail.verify((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Ready to Send");
      }
    });
    const mail = {
      from: name,
      to: "tamer.shahwan.jobs@gmail.com",
      subject: subject,
      html: `<p>Name: ${name}</p>
          <p>Subject: ${subject}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>`,
      };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
      });

}



export default router;
