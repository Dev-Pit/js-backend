// promise based
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;

// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

// export { asyncHandler };

// const asyncHandler =()=>{}
// const asyncHandler =(func)=>{()=>{}} can be
// written as const asyncHandler=(func)=()=>{}
// const asyncHandler=(func) => async()=>{}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res
//       .status(error.code || 500)
//       .json({ success: false, message: error.message });
//   }
// };


// // Sample route using asyncHandler
// app.get("/user/:id", asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404).json({ message: "User not found" });
//     return;
//   }
//   res.json(user);
// }));