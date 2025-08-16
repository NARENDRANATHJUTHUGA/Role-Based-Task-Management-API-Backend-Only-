const supabase = require('../configs/supabaseClient');

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required.' });
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile) {
        return res.status(403).json({ message: 'User profile not found.' });
      }

      req.user = { ...user, role: profile.role };

      if (roles.length > 0 && !roles.includes(profile.role)) {
        return res.status(403).json({ message: 'You do not have permission to perform this action.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'An unexpected error occurred.', error });
    }
  };
};

module.exports = authMiddleware;
