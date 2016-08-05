import Firebase from "firebase";

const firebase = new Firebase(process.env.FIREBASE_URL);

const usersDao = firebase.child("users");

export async function getUsers() {
  const children = await usersDao.once("value");
  const users = [];

  children.forEach((child) => {
    users.push({id: child.key(), ...child.val()});
  });

  return users.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getUser(id) {
  const snapshot = await usersDao.child(id).once("value");
  return {id, ...snapshot.val()};
}

export async function createUser(user) {
  const {email, password, name, role} = user;

  const data = await firebase.createUser({email, password});
  const userId = data.uid;

  return usersDao.child(userId).set({email, name, role});
}

export async function updateUser(id, user, withRole = false) {
  const {name, role} = user;
  return usersDao.child(id).update(withRole ? {name, role} : {name});
}
