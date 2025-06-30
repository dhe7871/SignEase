const statusMessage = document.getElementById('statusMessage');
const initialMessage = document.getElementById('initialMessage');
const tbox = document.getElementById('chattext');
const videoPlayer = document.getElementById('videoPlayer');
const videoSource = document.getElementById('videoSource');
const video = document.getElementById('bodyvdo');

const var1=document.querySelector("#chattext");
const var2=document.querySelector("#chatdiv");

var1.addEventListener("keyup",e=>{
    var1.style.height="25px";
    let height1=e.target.scrollHeight;
    var1.style.height=`${height1}px`;
    var2.style.height=`${height1+20}px`;
});

var1.addEventListener("keydown",(event)=>{
    if(event.key == "Enter"){
        event.preventDefault();
        btnclick();
    }
})


function btnclick(){
    console.log(tbox.value);
    if(tbox.value){
        video.style.display = 'block';
        initialMessage.style.display = 'none';
        console.log("API call initiated...");
        if(videoPlayer.style.display == 'block'){
            videoPlayer.style.display = 'none';
        }
        statusMessage.innerHTML = "Status Message: Processing request...";
        statusMessage.style.color = "rgb(23, 158, 237)";
        statusMessage.style.display = 'block';

        const apiUrl = `https://signeaseapiagain-gudcfqe3cbbnhkea.centralindia-01.azurewebsites.net/text/${encodeURIComponent(tbox.value)}`;

        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    videoSource.src = apiUrl;
                    videoPlayer.load();
                    videoPlayer.style.display = 'block';
                    statusMessage.innerHTML = 'Status Message: Video is loading....';
                    statusMessage.style.color = "rgb(70, 207, 70)";
                    statusMessage.style.display = 'block';
                }else{
                    statusMessage.innerHTML = "Status Message: No Video found for the input."
                    statusMessage.style.color = "rgb(255, 0, 0)";
                    statusMessage.style.display = 'block';
                }
            
            })
            .catch(error => {
                statusMessage.innerHTML = `Error: ${error.message}`;
                statusMessage.style.color = "rgb(255, 0, 0)";
                statusMessage.style.display = 'block';
                console.error('Error:', error);
            });

        }    

}


document.getElementById('chatrfs').onclick = function() {
    tbox.value = "";
    var1.style.height = `28px`;
    var2.style.height = `48px`;
    // d1 = 0; // Ensure d1 is reset
    videoSource.src = '';
    videoPlayer.load();
    statusMessage.innerHTML = "Status Message: Processing request...";
    statusMessage.style.color = "rgb(23, 158, 237)";
    statusMessage.style.display = 'none';
    video.style.display = 'none';
    videoPlayer.style.display = 'none';
};




// login js


const signupform = document.getElementById('signupform');
const OTPform = document.getElementById('OTPform');
const loginform = document.getElementById('loginform');
const forgotpasswordform = document.getElementById('forgotpasswordform');
const newpasswordform = document.getElementById('newpasswordform');

const logoutbtn = document.getElementById('logoutbtn');
const signupbtn = document.getElementById('signupbtn');
const validateOTPbtn = document.getElementById('validateOTPbtn');
const resendOTPbtn = document.getElementById('resendOTPbtn');
const loginbtn = document.getElementById('loginbtn');
const fpbtn = document.getElementById('fpbtn');
const fpesbtn = document.getElementById('fpesbtn');
const npsbtn = document.getElementById('npsbtn');

const baseurl = 'https://signeaseloginapi-gvhganfcfnb5aqg6.centralindia-01.azurewebsites.net';
// const baseurl = 'http://127.0.0.1:8000'

logoutbtn.onclick=function(){
    data = {
        'cuid': (localStorage.getItem('cuid') == null)?'':localStorage.getItem('cuid')
    }
    fetch(`${baseurl}/logOut/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>{
        if(!response.ok){
            console.log('Something Fucked up!');
        }
        return response.json()
    }).then(message=>{
        localStorage.removeItem('cuid');
        console.log(message);
    }).catch(error=>{
        console.error(error);
    })

}

signupbtn.addEventListener('click',()=>{
    OTPform.style.display='block';
    const formdata = new FormData(signupform)
    data = {}
    isblank = false;
    console.log('coming here')
    console.log(formdata.entries())
    for(let [key, value] of formdata.entries()) {
        console.log(key, value)
        if (formdata.get(key)){
            data[key] = formdata.get(key)
        }else{
            console.log(`${key} field is blank!`)
            isblank = true;
        }
    }
    if(!isblank){
        fetch(`${baseurl}/signUp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>{
            if(!response.ok){
                console.log('something fucked up!')
            }
            return response.json()
        }).then(message =>{
            console.log(message)
        }).catch(error=>{
            console.log(error)
        })
    }
})

loginbtn.onclick=function(){
    const formdata = new FormData(loginform);
    isblank = false;
    if(!formdata.get('id') || !formdata.get('password')){
        console.log('Fields must not be blank!');
        isblank = true;
    }
    data = {
        'id': formdata.get('id'),
        'password': formdata.get('password'),
        'cuid': (localStorage.getItem('cuid') == null)?'':localStorage.getItem('cuid')
    }

    if(!isblank){
        fetch(`${baseurl}/logIn/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>{
            if(!response.ok){
                console.log('something fucked up!')
            }
            return response.json()
        }).then(message =>{
            localStorage.setItem('cuid', message.uid);
            location.href = "/index.html";
            console.log(message)
        }).catch(error=>{
            console.log(error)
        })
    }
}

validateOTPbtn.onclick=function(){
    const formdata = new FormData(OTPform);
    if(formdata.get('OTP')){
        data = {'OTP': parseInt(formdata.get('OTP'))}
        fetch(`${baseurl}/validateOTP/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>{
            if(!response.ok){
                console.log('something fucked up!')
            }
            return response.json()
        }).then(message =>{
            if(message.valid && message.otpvalidationfor == 'forgotpassword'){
                console.log('come here')
                newpasswordform.style.display = 'block';
            }
            console.log(message,message.valid, message.otpvalidationfor);
        }).catch(error=>{
            console.log(error)
        })
    }
}

resendOTPbtn.onclick=function(){
    fetch(`${baseurl}/resendOTP/`
    ).then(response=>{
        if(!response.ok){
            console.log('something fucked up!')
        }
        return response.json()
    }).then(message =>{
        console.log(message)
    }).catch(error=>{
        console.log(error)
    })
}

fpbtn.onclick=function(){
    forgotpasswordform.style.display = (forgotpasswordform.style.display == 'none') ? 'block':'none';
}

fpesbtn.onclick=function(){
    const formdata = new FormData(forgotpasswordform);
    if(formdata.get('email')){
        data = {'email': formdata.get('email')}
        fetch(`${baseurl}/forgotPassword/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>{
            if(!response.ok){
                console.log('something fucked up!')
            }
            return response.json()
        }).then(message =>{
            console.log(message)
        }).catch(error=>{
            console.log(error)
        })
    }
}

npsbtn.onclick=function(){
    const formdata = new FormData(newpasswordform);
    if(formdata.get('password')){
        data = {'password': formdata.get('password')}
        fetch(`${baseurl}/changePassword/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>{
            if(!response.ok){
                console.log('something fucked up!')
            }
            return response.json()
        }).then(message =>{
            console.log(message)
        }).catch(error=>{
            console.log(error)
        })
    }
}