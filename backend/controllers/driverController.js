const registerDriver = async (req, res) => {
    try {
        const { firstName, lastName, vehicleType, licenseNumber } = req.body;
        const userId = req.user?.userId; // Extract userId from middleware

        if (!userId || !firstName || !lastName || !vehicleType || !licenseNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!validator.isNumeric(userId.toString())) return res.status(400).json({ message: 'User ID must be a number' });
        if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) return res.status(400).json({ message: 'Names must contain only letters' });
        if (validator.isEmpty(vehicleType)) return res.status(400).json({ message: 'Vehicle type is required' });
        if (!validator.isAlphanumeric(licenseNumber)) return res.status(400).json({ message: 'License number must be alphanumeric' });

        const existingDriver = await Driver.findOne({ where: { userId } });
        if (existingDriver) return res.status(400).json({ message: 'User is already registered as a driver' });

        const newDriver = await Driver.create({ userId, firstName, lastName, vehicleType, licenseNumber });
        const token = jwt.sign({ userId: newDriver.userId, driverId: newDriver.id }, JWT_SECRET, { expiresIn: '7d' });

        res.cookie('auth_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(201).json({ message: 'Driver registered successfully', driver: newDriver });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerDriver };
