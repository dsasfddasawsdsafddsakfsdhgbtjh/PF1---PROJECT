using WishlistBackend.Services;
using WishlistBackend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var storagePath = Path.Combine(builder.Environment.ContentRootPath, "wishlist-store.json");
builder.Services.AddSingleton(new WishlistStore(storagePath));

var app = builder.Build();

app.UseCors("AllowLocalhost");

app.MapGet("/api/wishlist", (WishlistStore store) => Results.Ok(store.GetAll()));

app.MapPost("/api/wishlist", async (WishlistStore store, HttpRequest request) =>
{
    var payload = await request.ReadFromJsonAsync<WishlistItem>();
    if (payload is null || string.IsNullOrWhiteSpace(payload.Name))
    {
        return Results.BadRequest(new { error = "Request body must include a non-empty name." });
    }

    var item = store.Add(payload.Name);
    return item is null ? Results.BadRequest(new { error = "Could not add item." }) : Results.Created($"/api/wishlist/{item.Id}", item);
});

app.MapDelete("/api/wishlist/{id}", (WishlistStore store, Guid id) =>
{
    var removed = store.Remove(id);
    return removed ? Results.NoContent() : Results.NotFound();
});

app.MapGet("/", () => Results.Ok(new { message = "Wishlist API is running." }));

app.Run();
