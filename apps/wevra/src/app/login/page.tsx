/**
 * Login Page
 * Credentials (Email/Password) and Google OAuth Sign In
 */

import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Button } from '@eventure/eventured';

// export default async function LoginPage() {
//   // Check if already logged in
//   let session = null;
//   try {
//     // session = await auth();
//      <main style={{ padding: 24 }}>
//       <h1>Login disabled</h1>
//     </main>
//   );
//   } catch {
//     // Invalid JWT - clear the session cookie
//     const cookieStore = await cookies();
//     cookieStore.delete('authjs.session-token');
//     cookieStore.delete('__Secure-authjs.session-token');
//   }

//   // If already logged in, redirect to journey
//   if (session) {
//     redirect('/journey');
//   }

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         padding: '2rem',
//       }}
//     >
//       <div
//         style={{
//           maxWidth: '400px',
//           width: '100%',
//         }}
//       >
//         <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Welcome to Wevra</h1>
//         <p style={{ marginBottom: '2rem', opacity: 0.7, textAlign: 'center' }}>
//           Sign in to start your financial journey
//         </p>

//         {/* Credentials Login Form */}
//         <form
//           action={async (formData: FormData) => {
//             'use server';
//             await signIn('credentials', {
//               email: formData.get('email'),
//               password: formData.get('password'),
//               redirectTo: '/journey',
//             });
//           }}
//           style={{ marginBottom: '1.5rem' }}
//         >
//           <div style={{ marginBottom: '1rem' }}>
//             <label
//               htmlFor="email"
//               style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               placeholder="test@wevra.com"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 borderRadius: '8px',
//                 border: '1px solid #ddd',
//                 fontSize: '1rem',
//                 backgroundColor: '#ffffff',
//                 color: '#000000',
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label
//               htmlFor="password"
//               style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               placeholder="password"
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 borderRadius: '8px',
//                 border: '1px solid #ddd',
//                 fontSize: '1rem',
//                 backgroundColor: '#ffffff',
//                 color: '#000000',
//               }}
//             />
//           </div>
//           <Button type="submit" variant="primary" style={{ width: '100%' }}>
//             Sign In with Email
//           </Button>
//         </form>

//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '1rem',
//             marginBottom: '1.5rem',
//           }}
//         >
//           <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }} />
//           <span style={{ color: '#999', fontSize: '0.875rem' }}>OR</span>
//           <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }} />
//         </div>

//         {/* Google OAuth */}
//         <form
//           action={async () => {
//             'use server';
//             await signIn('google', { redirectTo: '/journey' });
//           }}
//         >
//           <Button type="submit" variant="secondary" style={{ width: '100%' }}>
//             Sign in with Google
//           </Button>
//         </form>

//         {/* Dev Hint */}
//         <div
//           style={{
//             marginTop: '2rem',
//             padding: '1rem',
//             backgroundColor: '#f0f9ff',
//             borderRadius: '8px',
//             fontSize: '0.875rem',
//             color: '#0369a1',
//           }}
//         >
//           <strong>Dev Credentials:</strong>
//           <br />
//           Email: test@wevra.com
//           <br />
//           Password: password
//         </div>
//       </div>
//     </div>
//   );
// }

export default function LoginPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Login disabled</h1>
    </main>
  );
}
