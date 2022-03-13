const asyncHandler = require("express-async-handler");

const TransList = require("../models/transListModel");

// @desc Get TransList
// @router GET /api/translists
// @access Private
const getTransList = asyncHandler(async (req, res) => {
  const transLists = await TransList.find();

  res.status(200).json(transLists);
});

// @desc Set TransList
// @router POST /api/translists
// @access Private
const setTransList = asyncHandler(async (req, res) => {
  const transList = await TransList.create({
    tr_state: req.body.tr_state,
    tr_contract: req.body.tr_contract,
    tr_start_date: req.body.tr_start_date,
    tr_cancel_date: req.body.tr_cancel_date,
    bd_id: req.body.bd_id,
  });

  res.status(200).json(transList);
});

// @desc Update TransList
// @router PUT /api/translists
// @access Private
const updateTransList = asyncHandler(async (req, res) => {
  const transList = await TransList.findById(req.params.id);

  if (!transList) {
    res.status(400);
    throw new Error("Transaction list not found");
  }

  const updatedTransList = await TransList.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTransList);
});

// @desc Delete TransList
// @router DELETE /api/translists
// @access Private
const deleteTransList = asyncHandler(async (req, res) => {
  const transList = await TransList.findById(req.params.id);

  if (!transList) {
    res.status(400);
    throw new Error("Transaction list not found");
  }

  await transList.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTransList,
  setTransList,
  updateTransList,
  deleteTransList,
};
