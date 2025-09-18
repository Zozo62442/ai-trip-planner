import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async(ctx, args) => {
        // If User already exists?
        const user=await ctx.db.query('UserTable')
        .filter(q=>q.eq(q.field('email'), args.email))
        .collect();

        if(user?.length===0){
            const userData = {
                name: args.name,
                email: args.email,
                imageUrl: args.imageUrl,
            };
            
            //If Not create New User
            // Insert and capture the ID
            const id = await ctx.db.insert('UserTable', userData);
            return userData;
        }
         // Existing users already have _id
        return user[0];
    },
});