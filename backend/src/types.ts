import zod from "zod";

const signupSchema = zod.object({
    FirstName: zod.string(),
    LastName: zod.string(),
    Email: zod.string().email(),
    Password: zod.string()
});

const signinSchema = zod.object({
    Email: zod.string().email(),
    Password: zod.string()
})

export { signupSchema, signinSchema };