import {React, useState} from 'react'
const [updatedRecipe, setupdatedRecipe] = useState({name: "", description: "",image : "",ingredients: []  })
function handleOnChange(e){
    setupdatedRecipe({ ...updatedRecipe, [e.target.name] : e.target.value} )
    console.log({ ...updatedRecipe, [e.target.name] : e.target.value} )

}
const Modal = () => {
  return (
    <div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Update Ypur Recipe</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input  onChange={handleOnChange}  value={recipeDetail.name}   type="text" id="name" name="name" required/>
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea onChange={handleOnChange}  value={recipeDetail.description}   id="description" name="description" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="image">Image</label>
                    <input onChange={handleOnChange}  value={recipeDetail.image}   type="file" id="image" name="image" accept="image/*" required/>
                </div>
                
                <div class="form-group">
                    <label for="ingredients">Ingredients</label>
                    <textarea  onChange={handleOnChange} value={recipeDetail.ingredients}   id="ingredients" name="ingredients" required></textarea>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default Modal
