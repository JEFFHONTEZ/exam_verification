import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exam Verification',
  description: 'Certificate verification portal',
  icons: {
    icon: 'https://res.cloudinary.com/dekilw4yx/image/upload/v1779906356/Free_Online_Entrepreneurship_Courses___Alison_oyl76h.jpg',
    shortcut: 'https://res.cloudinary.com/dekilw4yx/image/upload/v1779906356/Free_Online_Entrepreneurship_Courses___Alison_oyl76h.jpg',
    apple: 'https://res.cloudinary.com/dekilw4yx/image/upload/v1779906356/Free_Online_Entrepreneurship_Courses___Alison_oyl76h.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}