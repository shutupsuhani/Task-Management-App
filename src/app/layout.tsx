import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,

} from '@clerk/nextjs'
import './globals.css'
import { Outfit } from 'next/font/google'

const inter = Outfit({ subsets: ['latin'] });
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Efficio - Task Management Made Simple',
  description:
    "Streamline your workflow, collaborate seamlessly, and achieve more with Efficio's intelligent task management platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* SignedOut - Show SignIn button */}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          
          {/* SignedIn - Show UserButton when user is logged in */}
          <SignedIn>
            
          </SignedIn>
          
          {/* Render children (rest of the app) */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
