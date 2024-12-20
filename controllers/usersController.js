import User from "../models/USer";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const list = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
export default{
  getUserProfile,
  update,
  destroy,
  list,
}
