import Users from "../models/users.models.js";

const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName) return res.status(400).json({ message: "Full Name is Required" });
        if (!email) return res.status(400).json({ message: "Email is Required" });
        if (!password) return res.status(400).json({ message: "Password is Required" });

        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already Exists" });

        const newUser = await Users.create({ fullName, email, password });
        res.status(201).json({ message: "User Successfully Created", data: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
}

export { signUp };