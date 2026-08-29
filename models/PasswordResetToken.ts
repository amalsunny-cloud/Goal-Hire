import { model, models, Schema } from "mongoose";

const PasswordResetTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }
);

PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const PasswordResetToken = models.PasswordResetToken || model("PasswordResetToken", PasswordResetTokenSchema);
