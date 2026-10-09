const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory mock database for users
const users = [];

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists.' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User registered successfully',
    user: { id: newUser.id, username: newUser.username, email: newUser.email }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET || 'super_secret_jwt_key_here',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user.id, username: user.username, email: user.email }
  });
};

exports.profile = (req, res) => {
  res.status(200).json({
    message: 'Protected profile retrieved',
    user: req.user
  });
};
