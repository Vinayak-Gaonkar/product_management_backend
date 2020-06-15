const  {google} = require('googleapis');
path = require('path'),
config = require(path.resolve('.') + '/config');



let googleAuth=function(){

  /**
   * Create the google auth object which gives us access to talk to google's apis.
   */
   let createConnection=() =>{

    console.log(config.environment.googleConfig.clientId,'\n',
      config.environment.googleConfig.clientSecret,'\n',
      config.environment.googleConfig.redirect);
    
    return new google.auth.OAuth2(
      config.environment.googleConfig.clientId,
      config.environment.googleConfig.clientSecret,
      config.environment.googleConfig.redirect
    );
  }
  
  /**
   * This scope tells google what information we want to request.
   */
  const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  
  /**
   * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
   */
  let getConnectionUrl=(auth)=> {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }
  
  /**
   * Create the google url to be sent to the client.
   */
  this.urlGoogle=()=> {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
  }
/**
 * Helper function to get the library with access to the google plus api.
 */
let getGooglePlusApi=(auth)=> {
  return google.plus({ version: 'v1', auth });
}

/**
 * Extract the email and id of the google account from the "code" parameter.
 */

  this.getGoogleAccountFromCode=async (code)=> {
    

    // add the tokens to the google api so we have access to the account
    const auth = createConnection();
    
    // get the auth "tokens" from the request
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    
    auth.setCredentials(tokens);
    // connect to google plus - need this to get the user's email
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    
    // get the google id and email
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  
    // return so we can login or sign up the user
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
    };
  }
  
}

module.exports=new googleAuth();