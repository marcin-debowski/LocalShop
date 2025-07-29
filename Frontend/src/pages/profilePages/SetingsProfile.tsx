function SettingsProfile() {
  return (
    <div className="p-4 w-full max-w-3xl mx-auto flex flex-col items-center">
      <h1>Hello, there User!</h1>
      <p>Manage your account settings here.</p>
        <label htmlFor="name" className="block mb-2">Name:</label>
        <input type="text" id="name" className="border rounded p-2 mb-4" />

        <label htmlFor="email" className="block mb-2">Email:</label>
        <input type="email" id="email" className="border rounded p-2 mb-4" />

        <label htmlFor="password" className="block mb-2">Password:</label>
        <input type="password" id="password" className="border rounded p-2 mb-4" />
        <div className="flex gap-4">
            <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">Update Settings</button>
            <button className="bg-red-500 text-white rounded p-2 hover:bg-red-600">Delete Account</button>
        </div>
    </div>
  );
}
export default SettingsProfile;