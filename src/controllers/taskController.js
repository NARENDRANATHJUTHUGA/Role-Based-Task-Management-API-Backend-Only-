const supabase = require('../configs/supabaseClient');

const createTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  const { id: userId, role } = req.user;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, due_date, created_by: userId, assigned_to: userId, status: 'pending' }])
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'Task created successfully.', task: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

const getTasks = async (req, res) => {
  const { id: userId, role } = req.user;

  try {
    let query = supabase.from('tasks').select('*');

    if (role === 'user') {
      query = query.eq('assigned_to', userId);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    if (role === 'user' && data.assigned_to !== userId) {
        return res.status(403).json({ message: 'You are not authorized to view this task.' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  const { id: userId, role } = req.user;

  try {
    const { data: task, error: findError } = await supabase
      .from('tasks')
      .select('assigned_to')
      .eq('id', id)
      .single();

    if (findError) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    if (role === 'user' && task.assigned_to !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this task.' });
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({ title, description, status, due_date })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: 'Task updated successfully.', task: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

const assignTask = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body; // The ID of the user to assign the task to

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required for assignment.' });
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ assigned_to: user_id })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: 'Task assigned successfully.', task: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'An unexpected error occurred.', error });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
};
