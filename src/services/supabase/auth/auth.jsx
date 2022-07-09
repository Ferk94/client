// import React, { useContext, useState, useEffect, createContext } from 'react';
// import { useDispatch } from 'react-redux';
// import supabaseClient from '../client';
// import { getUserInfo, signOut } from '../../../actions/userActions';
// import { sessionApi } from '../../api';

// const AuthContext = createContext(null);
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const session = supabaseClient.auth.session();
//     setUser(session?.user ?? null);
//     setLoading(false);

//     const { data: listener } = supabaseClient.auth.onAuthStateChange(
//       (event, session) => {
//         sessionApi({ event, session }).then(() => dispatch(getUserInfo));
//         setUser(session?.user ?? null);
//         setLoading(false);
//       }
//     );

//     return () => {
//       listener?.unsubscribe();
//     };
//   }, [dispatch]);

//   const value = {
//     googleSignIn: () =>
//       supabaseClient.auth.signIn(
//         { provider: 'google' },
//         { redirectTo: `${window.location.origin}/auth` }
//       ),
//     facebookSignIn: () =>
//       supabaseClient.auth.signIn(
//         { provider: 'facebook' },
//         { redirectTo: `${window.location.origin}/auth` }
//       ),
//     signOut: () => supabaseClient.auth.signOut().then(() => dispatch(signOut)),
//     user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };