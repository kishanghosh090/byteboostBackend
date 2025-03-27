import express from "express";
import cores from "cors";

import sendEmail from "./mailSend.js";
import { API_VERSION } from "./constant.js";

const app = express();

// cors configuration
app.use(
  cores({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.post(`/api/v1/clientData`, async (req, res) => {
  try {
    const { description, email, projectType: type, phoneNumber } = req.body;

    if ([description, email, type, phoneNumber].some((data) => data === "")) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const clientData = {
      description: description,
      email: email,
      type: type,
      phoneNumber: phoneNumber,
    };

    const emailSend = await sendEmail(clientData);

    if (!emailSend) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    res.status(200).json({
      message: "Thanks for contacting us. We will get back to you soon",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
});

export default app;
