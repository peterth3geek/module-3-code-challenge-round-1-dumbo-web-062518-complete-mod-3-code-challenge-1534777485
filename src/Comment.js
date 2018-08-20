class Comment {
  static sendComment(commentsURL, commentOBJ){
      return fetch(commentsURL,{
      method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(commentOBJ)
    })
  }

  static deleteComment(commId){
    const commentsURL = `https://randopic.herokuapp.com/comments/`
    return fetch(`${commentsURL}/${commId}`, {
      method: 'DELETE'
    })
  }

}
