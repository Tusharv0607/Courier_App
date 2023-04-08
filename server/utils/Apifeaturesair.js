const Apifeaturesair = (query) => {
    let que = {};

    //console.log(query.cmb)
    

    if (query.origin.trim().length == 0)
        throw new ErrorHandler("Origin name can't empty", 400);

    const origin = {
        $in: JSON.parse(query.origin.trim())
      
    }
    que = { ...que, origin };


    if (query.destination.trim().length == 0)
        throw new ErrorHandler("Destination name can't empty", 400);
    const destination = {
        $in: JSON.parse(query.destination.trim()),
        
    }
    que = { ...que, destination };

    //console.log(query);
    if (query.cmb.trim().length == 0)
        throw new ErrorHandler("cmb can't empty", 400);
    const cmb = {
        $gte: JSON.parse(query.cmb.trim()) - '0',

    }

    que = { ...que, cmb };

    if (query.gross_weight.trim().length == 0)
        throw new ErrorHandler("gross-weight can't empty", 400);
    const gross_weight = {
        $gte: JSON.parse(query.gross_weight.trim()) - '0'
    }
    que = { ...que, gross_weight };

    //cargo-type
    if (query.cargo_type.trim().length == 0)
        throw new ErrorHandler("cargo-type can't empty", 400);
    const cargo_type = {
        $regex: JSON.parse(query.cargo_type.trim()),
        $options: "i",
    }
    que = { ...que, cargo_type };

    // let date = new Date(query.date)
   
    //    const valid_till_date={
    //     $gt:  Date(date),
    //     $lt: Date(date)
    //    }
    //    que = { ...que, valid_till_date };
    return que;
}

module.exports = Apifeaturesair