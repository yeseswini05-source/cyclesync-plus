const registerCycle = async (req, res) => {
  try {
    const { cycleNumber, location } = req.body;

    if (!cycleNumber || !location) {
      return res.status(400).json({ message: "All fields required" });
    }

    res.status(201).json({ message: "Cycle registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCycles = async (req, res) => {
  try {
    res.json([{ cycleNumber: 1, status: "available" }]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCycleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    res.json({ message: `Cycle ${id} status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerCycle,
  getCycles,
  updateCycleStatus,
};
