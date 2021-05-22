const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/presentations'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Slides API.
  authorize(JSON.parse(content), showSlides);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
 

// ------------------------------------------------------------------------
// Code to create Slides
 
async function newPresentation(auth) {
  // creates a new blank presentation

  const slides = google.slides({version: 'v1', auth});
  let res =  await slides.presentations.create({
      title: "test",
      presentationId: "PRES0001",
      'slides': [
        {
          'objectId': "SLIDE0001",
          'pageType': "SLIDE",
          'pageElements': [
            {
              'objectId': "ELEM0001",
              'shape': {
                'shapeType': "ELLIPSE",
              }
            }
          ],
        }
      ],   
    });
  return res.data;
}

async function addSlide(auth, presData, slideId) {
  // adds a blank slide to a presentation

  const slides = google.slides({version: 'v1', auth});
  const presentationId = presData.presentationId;

  let requests = [{
    createSlide: {
        objectId: slideId,
        slideLayoutReference: {
          predefinedLayout: 'BLANK',
        },
      }
  }];

  await slides.presentations.batchUpdate({
    presentationId,
    resource: {
      requests,
    },
  });

  return slideId;
}

async function updatePresentation(auth, presData, requests) {
  // given a set of requests, updates presentation

  const presentationId = presData.presentationId
  const slides = google.slides({version: 'v1', auth});

  await slides.presentations.batchUpdate({
    presentationId,
    resource: {
      requests,
    },
  });
}

async function showSlides(auth) { 
  // creates and displays a presentation

  let presId = await newPresentation(auth)

  // // adds blank slide
  // await addSlide(auth, presId, "12345");

  // let elementId = 'MyTextBox_01';
  // let pt350 = {
  //   magnitude: 350,
  //   unit: 'PT',
  // };

  // let firstSlideId = "00001";
  // let secondSlideId = "00002";
  // let thirdSlideId = "00003";
  // let fourthSlideId = "00004";

  // let requests = [{
  //   createSlide: {
  //       objectId: firstSlideId,
  //       slideLayoutReference: {
  //         predefinedLayout: 'BLANK',
  //       },
  //     }
  //   },
  //   {
  //     createShape: {
  //       objectId: elementId,
  //       shapeType: 'TEXT_BOX',
  //       elementProperties: {
  //       pageObjectId: firstSlideId,
  //         size: {
  //           height: pt350,
  //           width: pt350,
  //         },
  //         transform: {
  //           scaleX: 1,
  //           scaleY: 1,
  //           translateX: 50,
  //           translateY: 75,
  //           unit: 'PT',
  //           },
  //         },
  //       },
  //     },
  //   {
  //     createShape: {
  //       objectId: "star1",
  //       shapeType: 'STAR_32',
  //       elementProperties: {
  //         pageObjectId: firstSlideId,
  //           size: {
  //             height: pt350,
  //             width: pt350,
  //           },
  //           transform: {
  //             scaleX: 1,
  //             scaleY: 1,
  //             translateX: 300,
  //             translateY: 25,
  //             unit: 'PT',
  //             },
  //           },
  //       },
  //     },
  //   {
  //     insertText: {
  //       objectId: elementId,
  //       insertionIndex: 0,
  //       text: 'New Box Text Inserted!',
  //       },
  //   },
  //   {
  //     insertText: {
  //       objectId: presId.slides[0].pageElements[0].objectId,
  //       insertionIndex: 0,
  //       text: 'Test Presentation',
  //       },
  //   }];

  //   // adds presentation title, and new slide with text and shapes
  //   await updatePresentation(auth, presId, requests);

  //   let imageId = 'MyImage_01';
  //   let imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png";
  //   let emu4M = {
  //     magnitude: 4000000,
  //     unit: 'EMU',
  //   };

  //   let requests2 = [{
  //     createImage: {
  //       objectId: imageId,
  //       url: imageUrl,
  //       elementProperties: {
  //         pageObjectId: secondSlideId,
  //         size: {
  //           height: emu4M,
  //           width: emu4M,
  //         },
  //         transform: {
  //           scaleX: 1,
  //           scaleY: 1,
  //           translateX: 100000,
  //           translateY: 100000,
  //           unit: 'EMU',
  //         },
  //       },
  //     },
  //   }];

  //   // adds slide with an image
  //   await addSlide(auth, presId, secondSlideId);
  //   await updatePresentation(auth, presId, requests2);

  //   let requests3 = [{
  //       createShape: {
  //         objectId: "TEXT_BOX0001",
  //         shapeType: 'TEXT_BOX',
  //         elementProperties: {
  //         pageObjectId: thirdSlideId,
  //           size: {
  //             height: pt350,
  //             width: pt350,
  //           },
  //           transform: {
  //             scaleX: 1,
  //             scaleY: 1,
  //             translateX: 50,
  //             translateY: 75,
  //             unit: 'PT',
  //           },
  //         },
  //       },
  //     },
  //     {
  //       updateShapeProperties: {
  //         objectId: "TEXT_BOX0001",
  //         shapeProperties: {
  //           shapeBackgroundFill: {
  //             solidFill: {
  //               color: {
  //                 rgbColor: {
  //                   red: 0.5,
  //                   blue: 0.5,
  //                   green: 0
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         fields: "shapeBackgroundFill.solidFill.color"
  //       }
  //     },
  //     {
  //       insertText: {
  //         objectId: "TEXT_BOX0001",
  //         insertionIndex: 0,
  //         text: 'New Box Text Inserted!',
  //       },
  //     }];

  //   // adds slide with a purple text box
  //   await addSlide(auth, presId, thirdSlideId);
  //   await updatePresentation(auth, presId, requests3);

  //   let requests4 = [
  //     {
  //       createShape: {
  //         objectId: "cloud1",
  //         shapeType: 'CLOUD',
  //         elementProperties: {
  //           pageObjectId: fourthSlideId,
  //             size: {
  //               height: pt350,
  //               width: pt350,
  //             },
  //             transform: {
  //               scaleX: 1,
  //               scaleY: 1,
  //               translateX: 200,
  //               translateY: 50,
  //               unit: 'PT',
  //               },
  //             },
  //         },
  //       },
  //     {
  //       createShape: {
  //         objectId: "TEXT_BOX0002",
  //         shapeType: 'TEXT_BOX',
  //         elementProperties: {
  //         pageObjectId: fourthSlideId,
  //           size: {
  //             height: pt350,
  //             width: pt350,
  //           },
  //           transform: {
  //             scaleX: 1,
  //             scaleY: 1,
  //             translateX: 350,
  //             translateY: 100,
  //             unit: 'PT',
  //           },
  //         },
  //       },
  //     },
  //   {
  //     insertText: {
  //       objectId: "TEXT_BOX0002",
  //       insertionIndex: 0,
  //       text: 'Cloud',
  //     },
  //   },
  //   {
  //     updateTextStyle: {
  //       objectId: "TEXT_BOX0002",
  //       style: {
  //         fontFamily: 'Times New Roman',
  //         fontSize: {
  //           magnitude: 25,
  //           unit: 'PT'
  //         },
  //         foregroundColor: {
  //           opaqueColor: {
  //             rgbColor: {
  //               blue: 1.0,
  //               green: 0.0,
  //               red: 0.0
  //             }
  //           }
  //         }
  //       },
  //       fields: 'foregroundColor,fontFamily,fontSize'
  //     }
  //   },
  //   ];


  //   // adds new slide
  //   await addSlide(auth, presId, fourthSlideId);
  //   await updatePresentation(auth, presId, requests4);
}
