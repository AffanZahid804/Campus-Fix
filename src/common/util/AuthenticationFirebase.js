import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function postSignUpHandler(signUpData, callBack, ErrorMessage) {
  try {
    console.log('Sign up Data ::: ', signUpData.Email, signUpData.Password);
    const isUserCreated = await auth()
      .createUserWithEmailAndPassword(signUpData.Email, signUpData.Password)
      .then(res => {
        res.user.updateProfile({
          FirstName: signUpData.FirstName,
          LastName: signUpData.LastName,
        });
        firestore()
          .collection('Signup')
          .add({
            FirstName: `${signUpData.firstName}`,
            LastName: `${signUpData.lastName}`,
            Email: `${signUpData.Email}`,
            Password: `${signUpData.Password}`,
            ConfirmPassword: `${signUpData.confirmPassword}`,
            Department: `${signUpData.Department}`,
            Token: [`${signUpData.Token}`],
          })
          .then(() => {
            console.log('User added!');

            callBack(); // Invoke the callback function if it is provided
          });

        return true; // Return true if the user is successfully created
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email is already in use.');
          ErrorMessage();

          return false; // Return false if the email is already in use
        } else {
          console.error('Error creating user:', error.message);
          return false; // Return false for any other errors
        }
      });
  } catch (error) {
    console.log('Response post : ', error);
  }
}

export async function fetchLoginHandler() {
  try {
    const response = await firestore().collection('Signup').get();
    // console.log("getdata: ", response._docs);

    const login = [];

    response._docs.forEach(doc => {
      const loginObj = {
        id: doc.id,
        Email: doc._data.Email,
        Password: doc._data.Password,
        FirstName: doc._data.FirstName,
        LastName: doc._data.LastName,
        Token: doc._data.Token,
      };
      login.push(loginObj);
    });

    // console.log("Login data fetch: ", login);
    return login;
  } catch (error) {
    console.log('fetchLoginHandler Error :', error);
  }
}
