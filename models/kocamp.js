const mongoose = require("mongoose");

const options = { toJSON: { virtuals: true } };

const KocampSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  options
);

KocampSchema.virtual("properties.popUpMarkup").get(function () {
  return `<a href="/kocamps/${this._id}"><h3>${this.title}</h3></a>`;
});

KocampSchema.post("findOneAndRemove", async function (doc) {
  if (doc) {
    await Review.remove({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Kocamp", KocampSchema);
