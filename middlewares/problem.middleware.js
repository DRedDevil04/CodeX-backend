const validateProblem = async (req, res, next) => {
  try {
    const { title, description, difficulty, timeLimit, memoryLimit , points} = req.body;

    // Check if all required fields are present
    if (!title || !description || !difficulty || !timeLimit || !memoryLimit || !points) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if difficulty is a number
    if (typeof difficulty !== "number") {
      return res.status(400).json({ error: "Difficulty must be a number" });
    }

    // Check if timeLimit and memoryLimit are positive numbers
    if (timeLimit <= 0 || memoryLimit <= 0) {
      return res
        .status(400)
        .json({
          error: "Time limit and memory limit must be positive numbers",
        });
    }
    // If all validation passed, move to the next middleware
    next();
  } catch (error) {
    console.log(error);
  }
};
export { validateProblem };
