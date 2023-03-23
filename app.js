// Some DataSets are massive and will bring any web browser to its knees if you
// try to load the entire thing. To keep your app performing optimally, take
// advantage of filtering, aggregations, and group by's to bring down just the
// data your app needs. Do not include all columns in your data mapping file,
// just the ones you need.
//
// For additional documentation on how you can query your data, please refer to
// https://developer.domo.com/docs/dev-studio/dev-studio-data

async function loadData() {
  const returns = await domo.get("/data/v1/returns?limit=100");

  const returnsElement = document.querySelector("#returns");
  returns.forEach((item, index) => {
    const row = document.createElement("li");
    row.setAttribute("class", "list-group-item"); // bootstrap class name
    row.innerHTML = generateRow(item, index);
    returnsElement.appendChild(row);
  });
}

function generateRow(item, index) {
  return `
      <!-- Row of Return Data -->
      <div class="itemContainer">
          <div>${item.storeNumber}</div>
          <div>${item.customerName}</div>
          <div>${item.itemReturned}<div class="sku">#${item.SKU}</div></div>
          <div>${item.reasonForReturn}</div>
          <div>
            <span class="badge badge-light">0</span>
            <button class="btn btn-link" onClick="modifyCommentsContainer(${index}, 'commentsContainer')">Add Comment</button>
          </div>
      </div>   

      <!-- Comments for each return  -->
      <div class="commentsContainer hidden" id="commentsContainer-${index}">
        <div class="commentHeader">
          <label>Comments</label>
          <button class="btn btn-link" onClick="modifyCommentsContainer(${index}, 'commentsContainer hidden')">Close</button>
        </div>
        <div class="addCommentContainer">
          <textarea id="comment-${index}" placeholder="Add comment"></textarea>
          <button class="btn btn-info">Submit</button>
        </div>
      </div> 
     `;
}

function modifyCommentsContainer(index, className) {
  const commentContainer = document.querySelector(
    `#commentsContainer-${index}`
  );
  commentContainer.setAttribute("class", className);
}
