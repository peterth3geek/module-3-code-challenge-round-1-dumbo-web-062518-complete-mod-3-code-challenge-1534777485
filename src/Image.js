class Image {

  static getTheImage(imageURL){
    return fetch(imageURL)
      .then(resp => resp.json())
  }

  // static getAllLikes(likeURL, imageId){
  //   return fetch(likeURL)
  //     .then(resp => resp.json())
  //     .then(console.log)
  // }

  static createLike(imgID, likeURL){
    return fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imgID})
    })
  }

  // static updateImage(likes, imageURL){
  //   return fetch(imageURL, {
  //     method: 'PATCH',
  //     headers: {
  //       'Accept': 'application/json',
  //       // 'Access-Control-Allow-Origin':'application/json',
  //       'Content-Type': 'application/json'},
  //     body: JSON.stringify({like_count: likes})
  //   })
  // }

}
