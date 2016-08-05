import Firebase from "firebase";

const firebase = new Firebase(process.env.FIREBASE_URL);

const usersDao = firebase.child("users");
const lessonsDao = firebase.child("lessons");
const lessonsAndAttendantsDao = firebase.child("lessons_attendants");

export async function getStatus(id, attendantId) {
  const snapshot = await lessonsAndAttendantsDao.child(id).child(attendantId).once("value");
  return snapshot.val();
}

export async function getAttendantsWithStatuses(id) {
  const attendants = [], resolvers = [];

  const children = await lessonsAndAttendantsDao.child(id).once("value");

  children.forEach(child => {
    const attendant = {id: child.key(), status: child.val()};

    resolvers.push(
      usersDao.child(attendant.id).child("name").once("value")
        .then((snapshot) => {
          attendant.name = snapshot.val();
        })
        .then(() => {
          attendants.push(attendant);
        })
    );
  });

  await Promise.all(resolvers);

  return attendants;
}

export async function createLesson(lesson) {
  return lessonsDao.push(lesson);
}

export async function updateLesson(id, lesson) {
  return lessonsDao.child(id).set(lesson);
}

export async function updateStatus(id, attendantId, userId, status, withAttendants = false) {
  await lessonsAndAttendantsDao.child(id).child(attendantId).set(status);
  return getLesson(id, userId, withAttendants);
}

export async function getLesson(id, userId, withAttendants = false) {
  const snapshot = await lessonsDao.child(id).once("value");

  const lesson = {id: snapshot.key(), ...snapshot.val()};

  lesson.status = await getStatus(id, userId);

  if (!withAttendants) {
    return lesson;
  }

  lesson.attendants = await getAttendantsWithStatuses(id);

  return lesson;
}

export async function getLessonsWithStatuses(userId) {
  const lessonsItems = [], resolvers = [];
  const children = await lessonsDao.once("value");

  children.forEach(child => {
    const lesson = {id: child.key(), ...child.val()};

    resolvers.push(
      getStatus(lesson.id, userId)
        .then((status) => {
          lesson.status = status;
        })
        .then(() => {
          lessonsItems.push(lesson);
        })
    );
  });

  await Promise.all(resolvers);

  return lessonsItems.sort((a, b) => {
    return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
  });
}

export async function removeLesson(id) {
  await Promise.all([
    lessonsDao.child(id).remove(),
    lessonsAndAttendantsDao.child(id).remove()
  ]);
}
