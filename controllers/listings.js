const Listing = require("../models/listing");

module.exports.AllListings = async (req, res) => {
  const allListings = await Listing.find({});

  res.render("listings/index", { allListings });
};
module.exports.NewListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.CreateListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = req.body.listing;
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await new Listing(newListing).save();
  req.flash("success", "new listing Created !");
  res.redirect("/listings");
};

module.exports.ShowListing = async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listings) {
    req.flash("error", " listing you requested For does not exist");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listings });
};

module.exports.EditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " listing you requested For does not exist");
    return res.redirect("/listings");
  }
  let orignalImageUrl = listing.image.url;
  orignalImageUrl.replace("/upload", "/upload/q_auto:good/");
  res.render("listings/edit.ejs", { listing, orignalImageUrl });
};

module.exports.UpdateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Inavalid Data ! Please enter valid data");
  }

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Edit listing Successfull !");
  res.redirect(`/listings/${id}`);
};

module.exports.DestroyListing = async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
