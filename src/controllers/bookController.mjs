import BookDbModel from "../models/bookModel.mjs";

const createBook = async (req, res) => {
  const data = req.body;
  const createdField = await BookDbModel.create(data).catch(err=>console.log(err));
  return res.send({
    status: 201,
    message: "Book added successfully",
    msg: createdField,
  });
};

const findBook = async (req,res)=>{

  try{
    const queriedData = req.query;

    const searchData = await BookDbModel.find(queriedData).
    catch((err)=>{
      return res.status(400).send({
      status:"Failure",
      message:err
    })});

    if(searchData.length === 0){
      return res.send({
        Status : 200, 
        alertMsg : "No books found according to the search criteria"
      })
    }
    else{
      return res.send({
          Status : 200,
          alertMsg : "Array of books matching the search criteria",
          message : searchData
      })
    }
  } catch(e){
      return res.status(500).send({
        status: "Failure",
        message: err.message || "An error occurred while searching for books"
      });
  }
    
}

const deleteBook = async (req,res)=>{
  
  try{
    const deleteThisID = req.params.id;

    const deletedData = await BookDbModel.findByIdAndDelete({_id:`${deleteThisID}`})
    .then(() => res.status(200).send({
      status: "Success",
      message: "Book Deleted Successfully",
    }));
  
  } catch(e) {
      res.status(500).send({
        status: "Failure",
        message : e.message || "An error occurred  while deleting the book."
      })
  }
}

const updateBook = async (req, res)=>{

  try{
    const updateThisData = req.params.id;
    const updateWithThisData = req.body;

    const updateReturnObj = await BookDbModel.updateOne(
      {_id: updateThisData},
      {$set:updateWithThisData})
      
      const updatedData = await BookDbModel.find({_id:`${updateThisData}`})
      return res.send({
        status:200,
        message:"Book Updated Successfully",
        updatedQuery : updatedData,
      })
    } catch(e) {
        res.status(500).send({
          status:"Failure",
          message: e.message || "An error occurred while processing the request."
        })
    }
}

export { createBook, findBook, deleteBook, updateBook };