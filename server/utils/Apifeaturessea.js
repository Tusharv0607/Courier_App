

const Apifeaturessea = (query) => {
    let que = {}
   
    if (query.origin.length == 0)
        throw new ErrorHandler("Origin name can't empty", 400);

    const origin = {
        $in: JSON.parse(query.origin.trim())
      
    }
    que = { ...que, origin };


    if (query.destination.length == 0)
        throw new ErrorHandler("Destination name can't empty", 400);
    const destination = {
        $in: JSON.parse(query.destination.trim())
     
    }
    que = { ...que, destination };

    //console.log(query);
 //console.log(query)
    if (query.container_type.trim().length == 0)
        throw new ErrorHandler("container-type can't empty", 400);
    const container_type = {
        $in: JSON.parse(query.container_type.trim())
      
    }

    que = { ...que, container_type };
   
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

     let date = new Date((query.valid_till_date))
     // console.log(date)
       const valid_till_date={
      
        $gte:date
       }
       que = { ...que, valid_till_date };
    return que;
}

module.exports = Apifeaturessea;