const asyncHandler = require("express-async-handler");
const { upload } = require("../controllers/imgController");
const formidable = require("formidable");
const TransList = require("../models/transListModel");
const Building = require("../models/buildingModel");
// @desc Get TransList
// @router GET /api/translists
// @access Private
const getMyTransList = asyncHandler(async (req, res) => {
  // const transLists = await TransList.find({
  //   $or: [{ tenant_id: req.user.id }, { landlord_id: req.user.id }],
  // });
  const transLists = await TransList.find({
    $or: [{ tenant_id: req.user.id }, { landlord_id: req.user.id }],
  })
    .populate("bd_id")
    .populate({
      path: "tenant_id",
      select: "u_username u_email u_name u_phonenum u_surname",
    });

  if (!transLists) {
    res.status(400);
    throw new Error("No translist in this user.");
  }
  // res.status(200).json({ room_name: room_name });
  res.status(200).json(transLists);
});

// @desc Set TransList
// @router POST /api/translists
// @access Private
const setTransList = asyncHandler(async (req, res) => {
  const transList = await TransList.create({
    tr_state: req.body.tr_state ? req.body.tr_state : "",
    tr_contract: req.body.tr_contract ? req.body.tr_contract : "",
    tr_start_date: req.body.tr_start_date,
    tr_cancel_date: req.body.tr_cancel_date ? req.body.tr_cancel_date : "",
    tenant_id: req.body.tenant_id,
    landlord_id: req.body.landlord_id,
    room_name: req.body.room_name,
    room_price: req.body.room_price,
    insurance_price: req.body.insurance_price,
    bd_id: req.body.bd_id,
  });

  res.status(200).json(transList);
});

// @desc Update TransList
// @router PUT /api/translists
// @access Private
const updateTransList = asyncHandler(async (req, res) => {
  const imgs = upload.any("room_state_pic", "tr_slip_img", "room_insur_pic");

  imgs(req, res, async (err) => {
    if (req.files !== undefined) {
      if (req.files.length !== 0) {
        if (req.files[0].fieldname === "tr_slip_img[0]") {
          req.body.tr_slip_img = req.files[0].location;
        }
        if (req.files[0].fieldname === "room_insur_pic[0]") {
          req.body.room_insur_pic = req.files[0].location;
        } else {
          req.body.room_state_pic = req.files;
        }
      }
    }

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
    )
      .populate("bd_id")
      .populate({
        path: "tenant_id",
        select: "u_username u_email u_name u_phonenum u_surname",
      });

    res.status(200).json(updatedTransList);
  });
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
  getMyTransList,
  setTransList,
  updateTransList,
  deleteTransList,
};
