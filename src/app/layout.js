import './global.css';

export const metadata = {
  title: 'Movies App',
  description: 'Netflix-style movies demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}