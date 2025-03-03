import mongoose from 'mongoose';
import VerificationCodeTypes from '../constants/verificationCodeTypes';

export interface VerificationCodeDocument extends mongoose.Document {
  userId: string;
  type: VerificationCodeTypes;
  createdAt: Date;
  expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  'VerificationCode',
  verificationCodeSchema,
  'verification_codes'
);
export default VerificationCodeModel;
