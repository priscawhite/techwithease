AWS.config.region = 'us-west-2';

const config = {
    clientId: '3jcc9j0fovusjqqpvjm76oo5at',
    postLoginRedirect: 'parent.html'
};

const cognito = new AWS.CognitoIdentityServiceProvider();

let currentSession = null;
let currentEmail = null;

function displayError(msg) {
    document.getElementById('error-message').textContent = msg;
}

function initiateEmailOtp(email) {
    return cognito.initiateAuth({
        AuthFlow: 'USER_AUTH',
        ClientId: config.clientId,
        AuthParameters: {
            USERNAME: email,
            PREFERRED_CHALLENGE: 'EMAIL_OTP'
        }
    }).promise()
    .then(function(response) {
        currentSession = response.Session;
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('otp-form').style.display = 'block';
    });
}

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    currentEmail = document.getElementById('signup-email').value;

    // Attempt auth directly — works if user already exists and is confirmed
    initiateEmailOtp(currentEmail)
    .catch(function(error) {
        // User does not exist — sign them up first
        if (error.code === 'UserNotFoundException') {
            return cognito.signUp({
                ClientId: config.clientId,
                Username: currentEmail,
                Password: crypto.randomUUID() + 'Aa1!',
                UserAttributes: [
                    { Name: 'email', Value: currentEmail }
                ]
            }).promise()
            .then(function() {
                return initiateEmailOtp(currentEmail);
            });
        }
        displayError(error.message);
    });
});

document.getElementById('otp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var code = document.getElementById('otp-code').value;

    cognito.respondToAuthChallenge({
        ClientId: config.clientId,
        ChallengeName: 'EMAIL_OTP',
        Session: currentSession,
        ChallengeResponses: {
            USERNAME: currentEmail,
            EMAIL_OTP_CODE: code
        }
    }).promise()
    .then(function(response) {
        if (response.AuthenticationResult) {
            sessionStorage.setItem('tokens', JSON.stringify(response.AuthenticationResult));
            window.location.href = config.postLoginRedirect;
        }
    })
    .catch(function(error) {
        displayError(error.message);
    });
});
