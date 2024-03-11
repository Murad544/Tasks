import PostNavigator from '@/components/PostNavigator';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      {children}
      <PostNavigator />
    </div>
  );
}
