import mongoose from "mongoose";

const { Schema, model } = mongoose;

function banSchema() {
const schema = new Schema(
    {
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    idAdmin: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    reason: {
        type: String,
        required: true,
        trim: true,
        },
    },
    { timestamps: true }
    );

    return model("Ban", schema);
}

export const Ban = banSchema();

export async function saveBan(banData) {
    const newBan = await Ban.create(banData);
    return newBan;
}

export async function findBanByUser(idUser) {
    const ban = await Ban.findOne({ idUser });
    return ban;
}