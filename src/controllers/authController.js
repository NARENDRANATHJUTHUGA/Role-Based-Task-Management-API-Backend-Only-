const supabase = require('../configs/supabaseClient');

const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ user_id: user.id, name, role }]);

    if (profileError) {
      return res.status(400).json({ message: profileError.message });
    }

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: 'Login successful.', ...data });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

module.exports = {
  register,
  login,
};
