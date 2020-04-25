var keepBtn = document.getElementsByClassName("keep")
var discardBtn = document.getElementsByClassName("discard")
var submitBtn = document.getElementsByClassName("approvePending")
var resultsKeep = []
var resultsDiscard = []
Array.from(keepBtn).forEach(function(element) {
    element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
      const lat = this.parentNode.childNodes[5].innerText
      const lng = this.parentNode.childNodes[9].innerText
      const id = this.parentNode.childNodes[15].innerHTML
    //   console.log("the name", name)
    //   console.log("the lng", lng)
         console.log("approving: ", id)   
    //     console.log("the lat", lat)
      fetch('/keepPark', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id
        })
      })
      .then(response => {
          console.log("about to relos pg:")
        window.location.reload(true)
        if (response.ok) return response.json()
        
      })
      .then(data => {
        console.log(data)
        
      })
    });
});


// Array.from(thumbUp).forEach(function(element) {
//     element.addEventListener('click', function(){
//       const name = this.parentNode.parentNode.childNodes[1].innerText
//       const msg = this.parentNode.parentNode.childNodes[3].innerText
//       const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
//       fetch('messages', {
//         method: 'put',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'name': name,
//           'msg': msg,
//           'thumbUp':thumbUp
//         })
//       })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//       .then(data => {
//         console.log(data)
//         window.location.reload(true)
//       })
//     });
// });