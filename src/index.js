document.addEventListener('DOMContentLoaded', function() {

  const imageId = 16 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  renderImage()

  function renderImage(){
    const nameDiv = document.getElementById('name')
    const likesDiv = document.getElementById('likes')
    const imgDiv = document.getElementById('image')
    const likeBtn = document.getElementById('like_button')
    const commentForm = document.getElementById('comment_form')
    const commentList = document.getElementById('comments')
    // commentList.innerText = ''
    return Image.getTheImage(imageURL)
      .then(image => {
        renderComments(image.comments)
        nameDiv.innerText = image.name
        likesDiv.innerText = image.like_count
        imgDiv.src = image.url
        likeBtn.dataset.id = image.id
        likeBtn.addEventListener('click', increaseLikes)
        commentForm.dataset.id = image.id
        commentForm.addEventListener('submit', createComment)
      })
  }

  function increaseLikes(e){
    const imgID = e.target.dataset.id
    const likesDiv = document.getElementById('likes')
    let totalLikes = likesDiv.innerText
    likesDiv.innerText = ++totalLikes
    Image.createLike(imgID, likeURL)

  }

  function createComment(e){
    const commentForm = document.getElementById('comment_form')
    e.preventDefault()
    const imgID = e.target.dataset.id
    const commContent = commentForm.comment.value
    const commentOBJ = {image_id: imgID, content: commContent}
    const commentList = document.getElementById('comments')
    const commentLI = document.createElement('li')
    commentLI.innerText = commContent
    commentList.append(commentLI)
    Comment.sendComment(commentsURL, commentOBJ)
    commentForm.comment.value = ''
    console.log(commentLI);
    // renderImage()
  }

  function renderComments(comments){
    const commentList = document.getElementById('comments')
    return comments.forEach(comment => {
      const commentLI = document.createElement('li')
      const deleteButton = document.createElement('button')
      commentLI.id = `comment-${comment.id}`
      deleteButton.dataset.id = comment.id
      deleteButton.innerText = 'DELETE'
      deleteButton.addEventListener('click', removeComment)
      commentLI.innerText = comment.content
      commentLI.append(deleteButton)
      commentList.append(commentLI)
    })
  }

  function removeComment(e){
    const commID = e.target.dataset.id
    const linItem = document.getElementById(`comment-${commID}`)

    linItem.hidden = true
    return Comment.deleteComment(commID)
  }



})
