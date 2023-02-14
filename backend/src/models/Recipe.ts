import mongoose, { Schema, Types, model, Document } from "mongoose";

interface IRecipe extends Document {
    name: string,
    shortDescription: string,
    description: string,
    ingredients: [{ name: string, quantity: number }]
    directions: [{ title: string, description: string, imageUrl: string }],
    author: Types.ObjectId
}

const directionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    textContent: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String, 
    }
});

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
})

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    ingredients: [ingredientSchema],
    directions: [directionSchema],
    author: {
        type: Schema.Types.ObjectId,
        required: true
    },
    recipeCreated: {
        type: Date,
        default: Date.now
    }
});

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);