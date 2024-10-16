const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  shippingAddress: {
    fullName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    suburb: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.plugin(autoIncrement, { inc_field: 'orderNumber' });
const Order = mongoose.model("Order",orderSchema);

module.exports = Order;