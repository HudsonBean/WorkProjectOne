/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**========================================================================
 *                           USER SCHEMA
 *========================================================================**/
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/default-profile-pic.png",
    },
    role: {
      type: String,
      enum: ["user", "admin", "developer"],
      default: "user",
    },
    company: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    /**=======================
     * todo      Set up billing stuff and managing owned assets
     *========================**/
    websiteRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WebsiteRequest",
      },
    ],
    hostedWebsites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HostedWebsite",
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);

export default User;
