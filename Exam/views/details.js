import { html } from "../node_modules/lit-html/lit-html.js";
import { dataService } from "../src/dataServices.js";
import { userHelper } from "../src/userHelper.js";

const detailsTemp = (data, isOwner, notGuest, likes, userLikes) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="..${data.imageUrl}" alt="example1" />
      <div>
        <p id="details-category">${data.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${data.description}</p>
            <p id="more-info">${data.moreInfo}</p>
          </div>
        </div>
        <h3>Is This Useful:<span id="likes">${likes}</span></h3>
        ${
          isOwner
            ? html` <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                  <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                  <a
                    @click=${delCharacter}
                    href="javascript:void(0)"
                    id="delete-btn"
                    >Delete</a
                  >
                </div>`
            : ""
        }
        
          <!--Bonus - Only for logged-in users ( not authors )-->
          ${
            notGuest || isOwner || userLikes
              ? ""
              : html`<a @click=${likeCharacter} href="" id="like-btn">Like</a>`
          }
        </div>
      </div>
    </div>
  </section>
`;

let id = "";
let context = "";
export async function detailsView(ctx) {
  id = ctx.params.id;
  context = ctx;
  const data = await dataService.getSingleCharacter(id);
  const isOwner = userHelper.getUserID() === data._ownerId;
  const notGuest = userHelper.getUserData() === null;
  const likes = await dataService.getCharacterLikes(id);
  const userLikes = await dataService.getCharacterLikes(
    id,
    userHelper.getUserData()._id
  );
  debugger;
  console.log(userLikes);
  ctx.render(detailsTemp(data, isOwner, notGuest, likes, userLikes));
}

async function delCharacter() {
  if (confirm("Are you sure you want to delete the Character?") === true) {
    await dataService.delCharacter(id);
    context.goTo("/dashboard");
  }
}

async function likeCharacter() {
  const characterId = id;
  let data = await dataService.likeCharacter({ characterId });
  console.log("like", data);
}
