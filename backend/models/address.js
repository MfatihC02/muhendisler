import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true }, // Açık adres
    neighborhood: { type: String, required: true }, // Mahalle
    street: { type: String, required: true }, // Sokak
    doorNumber: { type: String, required: true }, // Kapı No
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'Türkiye', required: true },
    phoneNumber: { type: String, required: true },
    tcNumber: { type: String },
    companyName: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
