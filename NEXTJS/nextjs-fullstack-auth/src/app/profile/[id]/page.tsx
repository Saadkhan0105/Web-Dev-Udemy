export default function UserProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <p className="font-bold text-4xl">Welcome  
        <span className="p-1 ml-2 rounded bg-orange-500 text-black">
        {params.id} !
        </span>
        </p>
      <p>Here you can view and edit your profile information.</p>
    </div>
  );
}
