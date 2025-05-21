const Expense=require('../models/Expense');
exports.getExpenses= (req,res,next)=>{
    Expense.find({user:req.used._id}).sort({createdAt:-1}).then((result)=>{
        res.status(200).json({
            message:'Fetched Expenses successfully',
            success:true,
            count:result.length,
            expenses:result
        })
    }).catch(err=>{
        res.status(500).json({
            message:'Fetching expenses failed',
            success:false,
            error:err
        })
    })
}
exports.addExpense=(req,res,next)=>{
    const { title, amount, category, date } = req.body;
     if (!title || !amount || !category) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  const expense = new Expense({
    title,
    amount,
    category,
    date:date||Date.now(),
  });
  post.save();
}
exports.updateExpense=async (req,res,next)=>{
    const expenseId=req.params.id
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Expense not found or unauthorized' });
  }
    const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
    res.json(updated);

}
exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense || expense.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Expense not found or unauthorized' });
  }

  await expense.remove();
  res.json({ message: 'Expense deleted' });
};