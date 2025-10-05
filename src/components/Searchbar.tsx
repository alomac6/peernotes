export default function Searchbar({ onSearchChange }: { onSearchChange: (text: string) => void }) {
    return(
        <div className='w-full'>
            <input 
                placeholder='ex: CSE-2320 or class name...'
                className='w-full p-3 rounded-md border-2 border-gray-300 text-black focus:outline-none focus:border-blue-500'
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}
