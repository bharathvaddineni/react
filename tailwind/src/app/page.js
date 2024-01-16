import Image from 'next/image'

export default function Home() {
  return (
    <div className="sm:columns-3 columns-1 ">
      {/* Column 1 */}
      <div className="p-2">
        <img
          src="https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 1"
        />
        <img
          src="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 2"
        />
        <img
          src="https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 3"
        />
      </div>

      <div className="p-2">
      <img
          src="https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 1"
        />
        <img
          src="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 2"
        />
        <img
          src="https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 3"
        />
      </div>

      <div className="p-2">
      <img
          src="https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 1"
        />
          <img
          src="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 2"
        />
        <img
          src="https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full aspect-auto"
          alt="Image 3"
        />
      </div>
    </div>
  )
}
