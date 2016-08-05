import Firebase from "firebase";

const firebase = new Firebase(process.env.FIREBASE_URL);

export async function getProfile(uid) {
  const snapshot = await firebase.child("users").child(uid).once("value");
  return {uid, ...snapshot.val()};
}

export async function authenticate() {
  return new Promise(function(resolve, reject) {
    const onComplete = data => {
      if (data) {
        resolve(getProfile(data.uid));
      } else {
        firebase.offAuth(onComplete);
        reject({error: {message: "The client is unauthenticated"}});
      }
    };

    firebase.onAuth(onComplete);
  });
}

export async function signIn(email, password, remember, withProfile = true) {
  const data = await firebase.authWithPassword({email, password}, {remember: remember ? "default" : "sessionOnly"});
  return withProfile ? getProfile(data.uid) : data;
}

export async function signUp(email, password, name) {
  const data = await firebase.createUser({email, password});
  const uid = data.uid;

  await signIn(email, password, false, false);
  await firebase.child("users").child(uid).update({email, name});

  return getProfile(uid);
}

export async function signOut() {
  return new Promise(function(resolve) {
    const onComplete = data => {
      if (data) {
        firebase.unauth();
      } else {
        firebase.offAuth(onComplete);
        resolve();
      }
    };

    firebase.onAuth(onComplete);
  });
}

export async function changePassword(credentials) {
  return firebase.changePassword(credentials);
}
