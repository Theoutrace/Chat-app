exports.postMessage = async (req, res, next) => {
  const { message } = req.body;
  const user = req.user;
  try {
    if (!message) {
      return res.status(400).json({ message: "No message sent!" });
    } else {
      const data = await req.user.createChat({
        message,
      });

      return res.status(200).json({ message: "Message added to DB!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
