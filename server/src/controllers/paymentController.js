const Razorpay = require("../config/razorpay");
const crypto = require("crypto");

class PaymentController {
  async createOrder(req, res) {
    try {
      const options = {
        amount: 50000,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await Razorpay.orders.create(options);

      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Create Order Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verifyPayment(req, res) {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature === razorpay_signature) {
        return res.status(200).json({
          success: true,
          message: "Payment Verified Successfully",
          premium: true,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });

    } catch (error) {
      console.error("Verify Payment Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new PaymentController();