let id = 1;

$("#add-btn").click(function () {
  const $li = `
                <li class="list-group-item d-flex justify-content-between lh-sm mb-2 rounded-2" id="item-${id}">
                    <input name="ingredient" type="text" class="form-control border-none border-bottom rounded-0"  
                        placeholder="Ingredient" 
                        style="border-top:none !important; border-left: none !important; border-right: none !important;" required>
                    <div class="invalid-feedback"> Please enter an Ingredient.</div>
                    <div>
                        <button type="button" class="remove btn btn-danger rounded-2" id="btn-${id}">-</button>
                    </div>
                </li>
            `;
  $("#ingredients").append($li);
  id++;
});

$("#ingredients").on("click", ".remove", function () {
  const currentId = this.id.split("-")[1];
  $("#item-" + currentId).remove();
});

function getIngredients() {
  const ingredients = [];
  $('input[name="ingredient"]').each(function () {
    const ingredientValue = $(this).val().trim();
    if (ingredientValue) {
      ingredients.push(ingredientValue);
    }
  });
  return ingredients;
}

async function submitRecipe() {
  let formData = new FormData();

  const image = $("#image")[0].files[0];
  formData.append("image", image);

  const ingredients = getIngredients();
  formData.append("ingredients", ingredients);

  formData.append("name", $("#name").val());
  formData.append("category", $("#category").val());
  formData.append("intro", $("#intro").val());
  formData.append("comment", $("#comment").val());

  formData.append("dishId", $("#dish-id").val());

  fetch("/add", {
    method: "POST",
    body: formData,
  }).then((response) => {
    response.json().then((body) => {
      if (body.redirectPath) {
        window.location.href = body.redirectPath;
      }
    });
  });
}

$("form").on("submit", function (e) {
  e.preventDefault();
  submitRecipe();
});

$(".edit").on("click", function () {
  let elemet = $(this).attr("id").split("-")[1];
  let elementId = parseInt(elemet);
  window.location.href = `/edit/${elementId}`;
});

$(".view").on("click", function () {
  let elemet = $(this).attr("id").split("-")[1];
  let elementId = parseInt(elemet);
  window.location.href = `/view/${elementId}`;
});

$(".delete").on("click", function (e) {
  let elemet = $(this).attr("id").split("-")[1];
  let elementId = parseInt(elemet);

  fetch(`/delete/${elementId}`, {
    method: "DELETE",
  }).then((response) => {
    response.json().then((body) => {
      if (body.redirectPath) {
        window.location.href = body.redirectPath;
      }
    });
  });
});
