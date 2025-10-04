export default function Header() {
  return (
    <header className='flex flex-col justify-center items-center h-[15vh] bg-blue-500 text-center text-white p-4'>
      <h1 className='text-3xl font-bold'>
        Welcome to the Peernotes!
      </h1>
      <p className='mt-2 text-lg max-w-2xl'>
        Peernotes is a webapp for you to share and find notes for your classes.
      </p>
    </header>
  );
}