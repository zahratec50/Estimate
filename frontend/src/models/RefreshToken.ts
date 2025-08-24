import { Schema, model, models, Types } from "mongoose";

export interface IRefreshToken {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  tokenHash: string; // bcrypt hash of refresh token
  expiresAt: Date;
  revokedAt?: Date | null;
  userAgent?: string;
  ip?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: { type: Date, default: null, index: true },
    userAgent: String,
    ip: String,
  },
  { timestamps: true }
);

// Optional: background index to purge expired docs automatically via TTL
// NOTE: TTL works only on a field with { expireAfterSeconds: 0 } and the value must be a Date.
// We keep a normal index above for queries; if you want TTL cleanup, add another field or convert expiresAt to TTL index.

export const RefreshToken =
  models.RefreshToken ||
  model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
