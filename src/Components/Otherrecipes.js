import React from 'react'
import '../postrecipe.css'

const OtherRecipes = () => {
  return (
    <>
    <div className='a' >
      <h1> Tell the World About Your recipes  </h1>
      <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required/>
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" id="image" name="image" accept="image/*" required/>
      </div>
      
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <textarea id="ingredients" name="ingredients" required></textarea>
      </div>
      
      <button type="submit">Submit</button>
    </form>

    </div>
    </>
  )
}

export default OtherRecipes
