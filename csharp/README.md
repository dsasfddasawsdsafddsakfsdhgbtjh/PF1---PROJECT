# SampleCSharpApp

This folder contains two C# projects:

- `SampleCSharpApp.csproj` — a minimal console app located in `Program.cs`.
- `WishlistBackend/WishlistBackend.csproj` — a minimal ASP.NET Core backend API for the wishlist feature.

## Run the sample console app

```powershell
# verify .NET SDK is installed
dotnet --version

# build and run from the csharp folder
dotnet run --project SampleCSharpApp.csproj
```

## Run the wishlist backend

```powershell
# build and run the backend project
dotnet run --project WishlistBackend/WishlistBackend.csproj
```

The backend exposes the following endpoints:

- `GET /api/wishlist` — return all wishlist items
- `POST /api/wishlist` — create a new wishlist item with JSON body `{ "name": "Item name" }`
- `DELETE /api/wishlist/{id}` — remove an item by id

The backend stores wishlist items in `WishlistBackend/wishlist-store.json`.

If you prefer, you can open the `csharp` folder in Visual Studio or Visual Studio Code and run/debug the projects there.
